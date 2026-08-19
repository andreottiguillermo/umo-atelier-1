import Link from "next/link"
import Image from "next/image"

const NAV = [
  { label: "Colección", href: "/#coleccion" },
  { label: "Lumenis", href: "/#lumenis" },
  { label: "Arcae", href: "/#arcae" },
  { label: "Nébula", href: "/#nebula" },
  { label: "Cotizador", href: "/cotizador" },
  { label: "Contacto", href: "/#contacto" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="leading-none" aria-label="UMO Lamps — inicio">
          <Image
            src="/img/umo-logo.png"
            alt="UMO Lamps"
            width={132}
            height={44}
            priority
            className="h-9 w-auto mix-blend-multiply md:h-11"
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.label === "Cotizador"
                  ? "text-xs font-semibold uppercase tracking-[0.14em] text-foreground underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent"
                  : "text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-foreground"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/cotizador"
          className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground underline decoration-accent decoration-2 underline-offset-8 md:hidden"
        >
          Cotizar
        </Link>
      </div>
    </header>
  )
}
