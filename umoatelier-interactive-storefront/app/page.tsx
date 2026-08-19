import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { CollectionModel } from "@/components/collection-model"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section id="inicio" className="mx-auto max-w-[1400px] px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Catálogo de luminarias · 2026
            </p>
            <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-tight text-foreground text-balance md:text-7xl">
              Luz que toma forma en el espacio.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              Luminarias de líneas orgánicas, creadas para transformar la atmósfera cotidiana con una
              presencia serena.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                href="#coleccion"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent"
              >
                Explorar la colección ↓
              </Link>
              <Link
                href="/cotizador"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent"
              >
                Cotizar mi lámpara →
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 border border-border" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden bg-clay">
              <Image
                src="/img/hero-nebula.jpg"
                alt="Luminaria Nébula colgante iluminada sobre fondo taupe"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 right-4 rounded-sm bg-black/25 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                Nébula
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO COLECCIÓN */}
      <section id="coleccion" className="scroll-mt-24 bg-clay">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-clay-foreground/70">
            La colección
          </p>
          <p className="max-w-3xl font-display text-3xl font-medium leading-snug text-clay-foreground text-balance md:text-5xl">
            Tres modelos, un mismo lenguaje: la luz difusa, el gesto artesanal y los materiales nobles.
          </p>
        </div>
      </section>

      {/* MODELOS */}
      <CollectionModel
        id="lumenis"
        index="01"
        name="Lumenis"
        imageAlt="Luminaria Lumenis"
        mainImage="/img/lumenis-main.jpg"
        secImage="/img/lumenis-sec.jpg"
        specs={[
          { label: "Diámetro", value: "Ø 38 cm" },
          { label: "Altura", value: "22 cm" },
          { label: "Portalámparas", value: "E27" },
        ]}
      />

      <CollectionModel
        id="arcae"
        index="02"
        name="Arcae"
        imageAlt="Luminaria Arcae"
        mainImage="/img/arcae-main.jpg"
        secImage="/img/arcae-sec.jpg"
        specs={[
          { label: "Diámetro", value: "Ø 34 cm" },
          { label: "Altura", value: "26 cm" },
          { label: "Formato", value: "Adaptable a tamaños menores" },
        ]}
      />

      <CollectionModel
        id="nebula"
        index="03"
        name="Nébula"
        imageAlt="Luminaria Nébula"
        mainImage="/img/nebula-main.jpg"
        secImage="/img/nebula-sec.jpg"
        specs={[
          { label: "Diámetro", value: "Ø 42 cm" },
          { label: "Altura", value: "30 cm" },
          { label: "Difusión", value: "Luz envolvente" },
        ]}
      />

      {/* CONTACTO */}
      <section id="contacto" className="scroll-mt-24 bg-clay">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.22em] text-clay-foreground/70">
            Hablemos
          </p>
          <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <h2 className="font-display text-5xl font-medium leading-[1.05] text-clay-foreground text-balance md:text-7xl">
              Encuentra la luz adecuada para tu espacio.
            </h2>
            <div className="md:pt-3">
              <p className="mb-8 text-sm text-clay-foreground/80">
                Consultas, medidas especiales y pedidos.
              </p>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:somos@umoatelier.com"
                    className="block border-b border-clay-foreground/25 pb-2 text-sm text-clay-foreground transition-colors hover:text-white"
                  >
                    somos@umoatelier.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://umoatelier.com"
                    className="block border-b border-clay-foreground/25 pb-2 text-sm text-clay-foreground transition-colors hover:text-white"
                  >
                    umoatelier.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/umoatelier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b border-clay-foreground/25 pb-2 text-sm text-clay-foreground transition-colors hover:text-white"
                  >
                    Instagram · @umoatelier
                  </a>
                </li>
              </ul>
              <Link
                href="/cotizador"
                className="mt-10 inline-block bg-background px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-opacity hover:opacity-90"
              >
                Armar mi cotización →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-6 text-[0.7rem] uppercase tracking-[0.14em] text-background/70 md:flex-row md:px-10">
          <span>UMO Atelier</span>
          <span className="hidden md:block">Luminarias con diseño y oficio</span>
          <a href="#inicio" className="transition-colors hover:text-background">
            Volver arriba ↑
          </a>
        </div>
      </footer>

      <WhatsAppButton />
    </main>
  )
}
