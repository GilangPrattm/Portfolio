import React, { useEffect, useRef } from 'react'

export type TopoTone = 'ink' | 'cream'

export interface TopoBackgroundProps {
  /**
   * Warna garis kontur:
   * - 'ink': garis abu/ink gelap di atas latar krem
   * - 'cream': garis krem terang di atas latar gelap
   */
  tone?: TopoTone
  /**
   * Opasitas garis kontur (default: 0.70 / 70% sesuai permintaan Gilang).
   */
  opacity?: number
  /**
   * Kecepatan animasi pergerakan kontur z (default: 0.85).
   */
  speed?: number
  /**
   * Skala kerapatan fitur garis (default: 1.0).
   */
  scale?: number
  /**
   * Mengaktifkan interaksi kursor & riak klik (default: true).
   */
  interactive?: boolean
  /**
   * Kelas Tailwind tambahan (misal: 'fixed inset-0 pointer-events-none z-0').
   */
  className?: string
}

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 size;
uniform float dpr;
uniform float feature;
uniform float z;
uniform float step;
uniform float range;
uniform float amount;
uniform float lift;
uniform float hillRadius;
uniform vec2 hill;
uniform vec4 ripples[4];
uniform float reach;
uniform float rippleWidth;
uniform vec3 color;
uniform float lineOpacity;
uniform vec2 scrollOffset;

vec3 mod289v(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

float mod289f(float x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

float perm(float x) {
  return mod289f(((x * 34.0) + 10.0) * x);
}

float grad(float hash, float x, float y, float z) {
  float h = floor(fract(hash * (1.0 / 16.0)) * 16.0);
  float u = h < 8.0 ? x : y;
  float v = h < 4.0 ? y : (h == 12.0 || h == 14.0 ? x : z);
  float s1 = fract(h * 0.5) < 0.25 ? u : -u;
  float s2 = fract(floor(h * 0.5) * 0.5) < 0.25 ? v : -v;
  return s1 + s2;
}

float noise(vec3 p) {
  vec3 cell = mod289v(floor(p));
  vec3 f = fract(p);
  vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float A = perm(cell.x) + cell.y;
  float AA = perm(A) + cell.z;
  float AB = perm(A + 1.0) + cell.z;
  float B = perm(cell.x + 1.0) + cell.y;
  float BA = perm(B) + cell.z;
  float BB = perm(B + 1.0) + cell.z;
  return mix(
    mix(
      mix(grad(perm(AA), f.x, f.y, f.z), grad(perm(BA), f.x - 1.0, f.y, f.z), u.x),
      mix(grad(perm(AB), f.x, f.y - 1.0, f.z), grad(perm(BB), f.x - 1.0, f.y - 1.0, f.z), u.x),
      u.y
    ),
    mix(
      mix(grad(perm(AA + 1.0), f.x, f.y, f.z - 1.0), grad(perm(BA + 1.0), f.x - 1.0, f.y, f.z - 1.0), u.x),
      mix(grad(perm(AB + 1.0), f.x, f.y - 1.0, f.z - 1.0), grad(perm(BB + 1.0), f.x - 1.0, f.y - 1.0, f.z - 1.0), u.x),
      u.y
    ),
    u.z
  );
}

void main() {
  vec2 screenPoint = vec2(gl_FragCoord.x, size.y - gl_FragCoord.y) / dpr;
  vec2 point = screenPoint + scrollOffset;
  vec2 n = point / feature;
  float value = noise(vec3(n, z)) * 1.1 + noise(vec3(n * 2.1, z * 1.7)) * 0.45;

  if (lift > 0.0) {
    value += lift * exp(-length(screenPoint - hill) / hillRadius);
  }

  for (int i = 0; i < 4; i++) {
    vec4 ripple = ripples[i];
    if (ripple.w > 0.5) {
      float d = length(screenPoint - ripple.xy) - ripple.z * reach;
      value += 0.9 * (1.0 - ripple.z) * cos(d / rippleWidth * 1.8) * exp(-(d * d) / (2.0 * rippleWidth * rippleWidth));
    }
  }

  value *= amount;
  float level = (value + range) / step;
  float nearest = floor(level + 0.5);
  float slope = length(vec2(dFdx(level), dFdy(level)));
  float pixels = abs(level - nearest) / max(slope, 1e-6);
  bool major = mod(nearest, 5.0) == 0.0;
  float width = max(1.0, (major ? 1.6 : 1.0) * dpr);
  float alpha = slope > 1e-6 ? clamp(width * 0.5 + 0.5 - pixels, 0.0, 1.0) * (major ? 0.9 : 0.5) * lineOpacity : 0.0;

  gl_FragColor = vec4(color * alpha, alpha);
}
`

interface ActiveRipple {
  x: number
  y: number
  progress: number
  startedAt: number
  duration: number
}

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"]'

export const TopoBackground: React.FC<TopoBackgroundProps> = ({
  tone = 'ink',
  opacity = 0.7, // 70% opacity persis sesuai permintaan Gilang
  speed = 0.75,
  scale = 1.0,
  interactive = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Mencoba inisialisasi WebGL untuk akselerasi GPU 60fps tanpa lag
    const gl =
      canvas.getContext('webgl', { alpha: true, antialias: true }) ||
      (canvas.getContext('experimental-webgl', { alpha: true, antialias: true }) as WebGLRenderingContext | null)

    if (!gl) {
      console.warn('WebGL tidak didukung pada browser ini.')
      return
    }

    // Ekstensi wajib untuk anti-aliasing kontur tajam di GPU
    const ext = gl.getExtension('OES_standard_derivatives')
    if (!ext) {
      console.warn('OES_standard_derivatives tidak didukung.')
      return
    }

    const compileShader = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getShaderInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Full-screen triangle buffer
    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    const posLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // Lokasi uniform GPU
    const u = (name: string) => gl.getUniformLocation(program, name)
    const uniforms = {
      size: u('size'),
      dpr: u('dpr'),
      feature: u('feature'),
      z: u('z'),
      step: u('step'),
      range: u('range'),
      amount: u('amount'),
      lift: u('lift'),
      hillRadius: u('hillRadius'),
      hill: u('hill'),
      ripples: u('ripples'),
      reach: u('reach'),
      rippleWidth: u('rippleWidth'),
      color: u('color'),
      lineOpacity: u('lineOpacity'),
      scrollOffset: u('scrollOffset'),
    }

    gl.uniform1f(uniforms.range, 0.95)
    gl.uniform1f(uniforms.hillRadius, 100)
    gl.uniform1f(uniforms.rippleWidth, 65)

    // Warna garis: tone ink (#18181b) atau cream (#faf7f2)
    const colorRgb: [number, number, number] =
      tone === 'ink'
        ? [24 / 255, 24 / 255, 27 / 255]
        : [250 / 255, 247 / 255, 242 / 255]

    let width = 0
    let height = 0
    let dpr = 1
    let destroyed = false
    let rafId: number | null = null

    let pointerX = 0
    let pointerY = 0
    let targetPointerX = 0
    let targetPointerY = 0
    let pointerActive = 0
    let targetPointerActive = 0

    const ripplesList: ActiveRipple[] = []
    const ripplesBuffer = new Float32Array(16) // 4 vec4

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const resize = () => {
      // Selalu gunakan ukuran window agar koordinat topografi konsisten
      // antara instance fixed (global) dan absolute (lokal per-section).
      // Canvas terbatas secara visual oleh overflow-hidden pada wrapper.
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    window.addEventListener('resize', resize)
    resize()

    // Event listener kursor & klik
    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return
      targetPointerX = e.clientX
      targetPointerY = e.clientY
      targetPointerActive = 0.22 // Amplitudo bukit halus
    }

    const onPointerLeave = () => {
      targetPointerActive = 0
    }

    const onPointerDown = (e: PointerEvent) => {
      if (!interactive) return
      if (e.target instanceof Element && e.target.closest(INTERACTIVE_SELECTOR)) {
        return
      }
      targetPointerX = e.clientX
      targetPointerY = e.clientY
      targetPointerActive = 0.35

      const now = performance.now()
      ripplesList.push({
        x: e.clientX,
        y: e.clientY,
        progress: 0,
        startedAt: now,
        duration: 2200,
      })
      if (ripplesList.length > 4) {
        ripplesList.shift()
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)

    let startTime = performance.now()

    // Render loop 60fps berbasis WebGL
    const render = (time: number) => {
      if (destroyed) return
      rafId = requestAnimationFrame(render)

      if (document.hidden) return

      // Smooth interpolation posisi kursor
      pointerX += (targetPointerX - pointerX) * 0.12
      pointerY += (targetPointerY - pointerY) * 0.12
      pointerActive += (targetPointerActive - pointerActive) * 0.1

      const elapsed = time - startTime
      const isReduced = reduceMotionQuery.matches

      // Evolusi waktu z (dihentikan hanya jika pengguna mengaktifkan prefers-reduced-motion)
      const zVal = isReduced ? 0.0 : elapsed * 0.000045 * speed

      // Update riak klik
      ripplesBuffer.fill(0)
      for (let i = ripplesList.length - 1; i >= 0; i--) {
        const r = ripplesList[i]
        const rElapsed = time - r.startedAt
        r.progress = Math.min(1.0, rElapsed / r.duration)
        if (r.progress >= 1.0) {
          ripplesList.splice(i, 1)
        }
      }

      for (let i = 0; i < Math.min(ripplesList.length, 4); i++) {
        const r = ripplesList[i]
        const idx = i * 4
        ripplesBuffer[idx] = r.x
        ripplesBuffer[idx + 1] = r.y
        ripplesBuffer[idx + 2] = r.progress
        ripplesBuffer[idx + 3] = 1.0 // aktif
      }

      const featureSize = 280 * scale
      const stepVal = (2 * 0.95) / 14
      const reachVal = Math.hypot(width, height) * 0.85

      gl.uniform2f(uniforms.size, canvas.width, canvas.height)
      gl.uniform1f(uniforms.dpr, dpr)
      gl.uniform1f(uniforms.feature, featureSize)
      gl.uniform1f(uniforms.z, zVal)
      gl.uniform1f(uniforms.step, stepVal)
      gl.uniform1f(uniforms.amount, 1.0)
      gl.uniform1f(uniforms.lift, pointerActive)
      gl.uniform2f(uniforms.hill, pointerX, pointerY)
      gl.uniform4fv(uniforms.ripples, ripplesBuffer)
      gl.uniform1f(uniforms.reach, reachVal)
      gl.uniform3f(uniforms.color, colorRgb[0], colorRgb[1], colorRgb[2])
      gl.uniform1f(uniforms.lineOpacity, opacity)
      gl.uniform2f(uniforms.scrollOffset, window.scrollX, window.scrollY)

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      destroyed = true
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointerleave', onPointerLeave)
      gl.deleteBuffer(posBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertShader)
      gl.deleteShader(fragShader)
    }
  }, [tone, opacity, speed, scale, interactive])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className || 'fixed inset-0 z-0'}`}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
    </div>
  )
}

export default TopoBackground
