import Image from "next/image"

type Spec = { label: string; value: string }

export function CollectionModel({
  id,
  index,
  name,
  specs,
  mainImage,
  secImage,
  imageAlt,
  dark = false,
}: {
  id: string
  index: string
  name: string
  specs: Spec[]
  mainImage: string
  secImage: string
  imageAlt: string
  dark?: boolean
}) {
  return (
    <section id={id} className="scroll-mt-24">
      {/* Encabezado del modelo */}
      <div className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Modelo {index}
              </p>
              <h2 className="font-display text-6xl font-medium uppercase tracking-tight text-stone md:text-8xl">
                {name}
              </h2>
            </div>
            <dl className="md:pb-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between border-b border-border py-3.5"
                >
                  <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                  <dd className="text-sm font-medium text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Imágenes sobre fondo taupe */}
      <div className="bg-clay">
        <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={secImage || "/placeholder.svg"}
                alt={`${imageAlt} en contexto`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
