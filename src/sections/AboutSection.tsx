import React from 'react'
import { motion } from 'motion/react'
import { Database, Server, Sparkles, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react'
import { BentoCard } from '../components/BentoCard'
import { staggerContainerVariants, fadeUpVariants } from '../lib/motion'

const CORE_STACK = ['PHP / Laravel', 'Java', 'MySQL', 'PostgreSQL (Dasar)', 'REST API']
const LEARNING_STACK = ['TypeScript', 'React 19', 'Tailwind CSS v4', 'Framer Motion']
const PRINCIPLES = [
  {
    title: 'Desain Skema DB',
    desc: 'Normalisasi tabel, integritas relasi foreign key, dan mitigasi N+1 query.',
  },
  {
    title: 'RESTful Terstruktur',
    desc: 'Format JSON seragam, penanganan HTTP status code, dan validasi ketat.',
  },
  {
    title: 'Git & Modularitas',
    desc: 'Branching rapi, pemisahan service layer, dan kemudahan pengujian unit.',
  },
]

export const AboutSection: React.FC = () => {
  return (
    <section id="about" aria-labelledby="about-title" className="pt-8 pb-12 scroll-mt-24">
      {/* Section Header */}
      <div className="mb-8 max-w-2xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
          Tentang &amp; Filosofi Rekayasa
        </p>
        <h2 id="about-title" className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Membangun Sistem dari Fondasi Logika yang Kokoh
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink/80">
          Mengutamakan keteraturan arsitektur data, kode yang mudah dirawat, dan proses belajar terukur pada ekosistem modern.
        </p>
      </div>

      {/* Bento Grid Layout (1 Kolom Mobile, 3 Kolom Desktop) */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
      >
        {/* 1. Kartu Profil Utama (Indigo - 2 Kolom) */}
        <motion.div variants={fadeUpVariants} className="md:col-span-2">
          <BentoCard variant="indigo" className="flex min-h-[260px] flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-xs font-medium text-white">
                <Server className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Backend Engineering</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
                Struktur, Integritas &amp; Keandalan
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
                Sebagai mahasiswa di Politeknik Negeri Jember dengan minat mendalam pada rekayasa backend, saya percaya bahwa aplikasi yang hebat berakar dari model basis data yang solid, logika bisnis yang terisolasi rapi, dan keamanan akses yang terjamin.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {['Clean Architecture', 'Relational Modeling', 'Maintainable Code'].map((pill) => (
                <span key={pill} className="rounded-lg bg-white/10 px-3 py-1 font-mono text-xs font-medium text-white">
                  {pill}
                </span>
              ))}
            </div>
          </BentoCard>
        </motion.div>

        {/* 2. Kartu Core Skills (Coral - Otomatis text-ink) */}
        <motion.div variants={fadeUpVariants} id="skills" className="scroll-mt-24">
          <BentoCard variant="coral" className="flex min-h-[260px] flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-ink/10 px-3 py-1 font-mono text-xs font-semibold text-ink">
                <Database className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Teknologi Inti</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink md:text-2xl">
                Backend &amp; Database
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                Tumpukan teknologi yang saya gunakan secara produktif untuk membangun alur kerja server dan API.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {CORE_STACK.map((tech) => (
                <span key={tech} className="rounded-md bg-ink/10 px-2.5 py-1 font-mono text-xs font-medium text-ink">
                  {tech}
                </span>
              ))}
            </div>
          </BentoCard>
        </motion.div>

        {/* 3. Kartu Sedang Dipelajari (Mint - Otomatis text-ink) */}
        <motion.div variants={fadeUpVariants}>
          <BentoCard variant="mint" className="flex min-h-[240px] flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ink animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                  Sedang Dipelajari
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink md:text-2xl">
                Modern Frontend
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                Eksplorasi aktif untuk menjembatani logika server dengan antarmuka dinamis dan interaktif.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {LEARNING_STACK.map((tech) => (
                <span key={tech} className="rounded-md bg-ink/10 px-2.5 py-1 font-mono text-xs font-medium text-ink">
                  {tech}
                </span>
              ))}
            </div>
          </BentoCard>
        </motion.div>

        {/* 4. Kartu Pendekatan Rekayasa Netral (White Card - 2 Kolom) */}
        <motion.div variants={fadeUpVariants} className="md:col-span-2">
          <BentoCard variant="white" className="flex min-h-[240px] flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
                <Sparkles className="h-3.5 w-3.5 text-indigo-brand" aria-hidden="true" />
                <span>Prinsip Kerja &amp; Praktik</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-ink md:text-2xl">
                Standar Rekayasa yang Diterapkan
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {PRINCIPLES.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-ink/5 bg-cream/50 p-3">
                    <div className="flex items-center gap-1.5 font-display text-sm font-bold text-ink">
                      <CheckCircle2 className="h-4 w-4 text-mint shrink-0" aria-hidden="true" />
                      <span>{item.title}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink/75 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* 5. Kartu Akademik & Lokasi (White Card - 3 Kolom Full) */}
        <motion.div variants={fadeUpVariants} className="md:col-span-3">
          <BentoCard variant="white" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-brand/10 text-indigo-brand">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-ink">Politeknik Negeri Jember (POLIJE)</h4>
                <p className="text-xs text-ink/70">Fokus pada Rekayasa Perangkat Lunak &amp; Sistem Informasi</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-ink/70">
              <MapPin className="h-4 w-4 text-coral shrink-0" aria-hidden="true" />
              <span>Jember, Jawa Timur, Indonesia</span>
            </div>
          </BentoCard>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AboutSection
