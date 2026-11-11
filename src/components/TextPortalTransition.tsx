import React from 'react'
import { GlyphPortal } from './ui/glyph-portal'

export interface TextPortalTransitionProps {
  /**
   * Kata raksasa yang di-zoom (tetap 'PROJECT' di mode ID maupun EN).
   */
  word?: string
  /**
   * ID untuk anchor navigasi scroll.
   */
  id?: string
}

// Judul raksasa "PROJECT" memakai font utama (Verdana) agar konsisten
// dengan tipografi situs. Tidak ada font eksternal yang diunduh.
const FONT_FAMILY = 'Verdana, Geneva, Arial, sans-serif'

export const TextPortalTransition: React.FC<TextPortalTransitionProps> = ({
  word = 'PROJECT',
  id = 'projects-portal',
}) => {

  return (
    <div
      id={id}
      className="relative w-full overflow-clip select-none"
      style={{
        containerType: 'inline-size',
        fontFamily: FONT_FAMILY,
      }}
    >
      <style>{`
        /* Sembunyikan caption, touch-picker, dan teks ekstra yang tidak diperlukan */
        #${id} [data-gp-caption],
        #${id} [data-gp-touch-picker] {
          display: none !important;
        }
        /* Background animasi WebGL dipanjangkan langsung ke kata PROJECT tanpa potongan garis */
        #${id},
        #${id} section,
        #${id} [data-gp-pin] {
          background: transparent !important;
        }
      `}</style>

      <GlyphPortal
        word={word}
        focusChar="O"
        fontFamily={FONT_FAMILY}
        fontWeight={900}
        scrollLength={2.2}
        interactive={true}
        annotations={false}
        style={
          {
            '--gp-paper': 'transparent',
            '--gp-ink': '#ffffff',
            '--gp-field': '#ffffff',
            '--gp-foreground': '#ffffff',
            fontFamily: FONT_FAMILY,
          } as React.CSSProperties
        }
        background={
          /* Teks kata PROJECT berwarna putih murni (#ffffff) */
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
            }}
          />
        }
      />
    </div>
  )
}

export default TextPortalTransition
