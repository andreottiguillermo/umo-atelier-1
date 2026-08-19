import type { Metadata } from "next"
import Link from "next/link"
import { Quoter } from "@/components/quoter"

export const metadata: Metadata = {
  title: "Cotizador de lámparas | UMO Atelier",
  description:
    "Elegí el modelo y los materiales de tu lámpara UMO Atelier y obtené el costo al instante, con la posibilidad de enviar la cotización por WhatsApp.",
}

export default function CotizadorPage() {
  return (
    <main className="min-h-screen bg-q-bg text-q-paper">
      <div
        className="min-h-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 8%, rgba(198,138,61,0.10), transparent 40%), radial-gradient(circle at 90% 85%, rgba(166,87,43,0.08), transparent 45%)",
        }}
      >
        <div className="mx-auto max-w-[1080px] px-6 pb-24 pt-10">
          {/* Volver */}
          <Link
            href="/"
            className="mb-8 inline-block font-mono text-xs uppercase tracking-[0.14em] text-q-amber-bright transition-opacity hover:opacity-80"
          >
            ← Volver al catálogo
          </Link>

          {/* Header */}
          <header className="mb-11 border-b border-white/10 pb-7">
            <div className="mb-5 leading-none">
              <span className="block font-display text-2xl font-bold tracking-tight text-q-paper">
                UMO
              </span>
              <span className="block text-[0.6rem] font-medium tracking-[0.35em] text-q-muted">
                ATELIER
              </span>
            </div>
            <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.16em] text-q-amber-bright">
              Taller de luminarias
            </p>
            <h1 className="mb-3 font-display text-4xl font-semibold tracking-tight text-q-paper md:text-[46px]">
              Cotizador de lámparas
            </h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-q-muted">
              Elegí el modelo y los materiales de cada lámpara — el ticket de la derecha arma el costo
              al instante, con un margen fijo del 10%. Cuando estés conforme, enviá la cotización por
              WhatsApp con un solo toque.
            </p>
          </header>

          <Quoter />

          <footer className="mt-11 text-center text-xs text-q-muted">
            Precios de referencia · La cotización final puede ajustarse según medidas especiales.
          </footer>
        </div>
      </div>
    </main>
  )
}
