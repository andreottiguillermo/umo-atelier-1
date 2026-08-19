"use client"

import { useMemo, useState } from "react"
import {
  MODELOS,
  CABLES,
  FLORONES,
  FUSTES,
  TULIPAS,
  MARGEN_PCT,
  fmt,
  computeQuote,
  whatsappLink,
  type Option,
  type QuoterState,
} from "@/lib/quoter-data"

export function Quoter() {
  const [state, setState] = useState<QuoterState>({
    modelo: 0,
    cable: 0,
    floron: 0,
    fuste: 0,
    tulipa: 0,
    cantidad: 1,
    metros: 1,
    diametro: "",
    altura: "",
  })

  const q = useMemo(() => computeQuote(state), [state])
  const modelo = MODELOS[state.modelo]

  const set = <K extends keyof QuoterState>(key: K, value: QuoterState[K]) =>
    setState((s) => ({ ...s, [key]: value }))

  const waMessage = useMemo(() => {
    const lines = [
      "¡Hola UMO Atelier! Quiero cotizar / comprar esta lámpara:",
      "",
      `• Modelo: ${modelo.nombre} (${modelo.portalamparas})`,
      `• Cantidad: ${q.cantidad}`,
      `• Cable: ${CABLES[state.cable].nombre} — ${q.metros} m`,
      `• Florón: ${FLORONES[state.floron].nombre}`,
      `• Fuste: ${FUSTES[state.fuste].nombre}`,
      `• Tulipa: ${TULIPAS[state.tulipa].nombre}`,
      state.diametro ? `• Diámetro: ${state.diametro}` : "",
      state.altura ? `• Altura: ${state.altura} cm` : "",
      "",
      `Código: ${q.productCode}`,
      `Total estimado: ${fmt(q.total)}`,
    ].filter(Boolean)
    return lines.join("\n")
  }, [state, q, modelo])

  return (
    <div className="grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      {/* ======= CONFIGURACIÓN ======= */}
      <div className="flex flex-col gap-6">
        {/* Modelo */}
        <FieldGroup title="Modelo">
          <div className="grid gap-2.5 sm:grid-cols-3">
            {MODELOS.map((m, i) => {
              const active = i === state.modelo
              return (
                <button
                  key={m.nombre}
                  type="button"
                  onClick={() => set("modelo", i)}
                  className={`rounded-[10px] border p-3.5 text-left transition-colors ${
                    active
                      ? "border-q-amber bg-q-amber/10"
                      : "border-white/10 bg-white/[0.03] hover:border-q-amber/50"
                  }`}
                >
                  <div className="mb-1 font-display text-[17px] font-semibold text-q-paper">
                    {m.nombre}
                  </div>
                  <div className="text-xs leading-snug text-q-muted">
                    Portalámparas {m.portalamparas}
                  </div>
                  <div className="mt-2 font-mono text-[13px] text-q-amber-bright">
                    {fmt(m.precio)}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
            <NumField
              label="Cantidad"
              type="number"
              min={1}
              step={1}
              value={state.cantidad}
              onChange={(v) => set("cantidad", Number(v))}
            />
            <NumField
              label="Diámetro (referencia)"
              type="text"
              placeholder="Ø34"
              value={state.diametro}
              onChange={(v) => set("diametro", String(v))}
            />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <NumField
              label="Altura en cm (referencia)"
              type="number"
              placeholder="24"
              value={state.altura}
              onChange={(v) => set("altura", String(v))}
            />
            <div>
              <label className="mb-1.5 block text-xs text-q-muted">Portalámparas</label>
              <input
                disabled
                value={modelo.portalamparas}
                className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 font-mono text-sm text-q-paper/60"
              />
            </div>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-q-muted">
            Diámetro, altura y portalámparas quedan como datos de referencia del pedido — no afectan el
            costo, igual que en la planilla original.
          </p>
        </FieldGroup>

        {/* Cable */}
        <FieldGroup title="Cable">
          <Pills options={CABLES} selected={state.cable} onSelect={(i) => set("cable", i)} />
          <div className="mt-3.5">
            <NumField
              label="Largo de cable (metros)"
              type="number"
              min={0}
              step={0.1}
              value={state.metros}
              onChange={(v) => set("metros", Number(v))}
            />
          </div>
        </FieldGroup>

        <FieldGroup title="Florón">
          <Pills options={FLORONES} selected={state.floron} onSelect={(i) => set("floron", i)} />
        </FieldGroup>

        <FieldGroup title="Fuste">
          <Pills options={FUSTES} selected={state.fuste} onSelect={(i) => set("fuste", i)} />
        </FieldGroup>

        <FieldGroup title="Tulipa">
          <Pills options={TULIPAS} selected={state.tulipa} onSelect={(i) => set("tulipa", i)} />
        </FieldGroup>
      </div>

      {/* ======= TICKET ======= */}
      <aside className="lg:sticky lg:top-24">
        <div className="relative rounded-[4px_4px_14px_14px] bg-q-paper px-6 pb-6 pt-8 text-q-ink shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-3.5 h-5 w-5 -translate-x-1/2 rounded-full bg-q-bg shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
          />
          {/* Top */}
          <div className="mb-4 pt-3.5 text-center">
            <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-q-copper">
              Ticket de costeo
            </p>
            <p className="font-display text-[22px] font-semibold">{modelo.nombre}</p>
            <p className="mt-2 inline-block rounded-md border border-dashed border-q-copper/40 bg-q-copper/10 px-2.5 py-1 font-mono text-xs tracking-wide text-q-copper">
              {q.productCode}
            </p>
            <p className="mt-1 text-center text-xs text-q-ink-soft">
              {q.cantidad > 0
                ? `${q.cantidad} unidad${q.cantidad === 1 ? "" : "es"}`
                : "Ingresá una cantidad"}
            </p>
          </div>

          <hr className="my-4 border-t border-dashed border-q-ink/15" />

          {/* Line items */}
          <div>
            {q.items.map((it) => (
              <div
                key={it.label}
                className="flex items-center justify-between gap-2.5 py-1.5 text-[13.5px]"
              >
                <span className="text-q-ink-soft">{it.label}</span>
                <span
                  className={`whitespace-nowrap font-mono ${
                    it.value === 0 ? "text-q-muted" : ""
                  }`}
                >
                  {fmt(it.value)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-2.5 text-sm font-medium">
            <span>Subtotal</span>
            <span className="font-mono">{fmt(q.subtotal)}</span>
          </div>
          <div className="flex justify-between pt-1.5 text-[13px] text-q-ink-soft">
            <span>{`Margen (${Math.round(MARGEN_PCT * 100)}%)`}</span>
            <span className="font-mono">{fmt(q.margen)}</span>
          </div>

          {/* Total */}
          <div className="mt-4 border-t border-q-ink/15 pt-4 text-center">
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-q-copper">
              Precio final
            </p>
            <p className="font-display text-[40px] font-bold tracking-tight">{fmt(q.total)}</p>
          </div>

          {q.cantidad <= 0 && (
            <div className="mt-3.5 rounded-lg border border-q-copper/25 bg-q-copper/10 px-3 py-2.5 text-left text-[12.5px] text-[#7A3B2A]">
              Ingresá una cantidad mayor a 0 para calcular el costo.
            </div>
          )}

          {/* CTA WhatsApp */}
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon />
            Enviar cotización por WhatsApp
          </a>
        </div>
      </aside>
    </div>
  )
}

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[14px] border border-white/10 bg-q-bg-soft p-5">
      <h2 className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-q-amber-bright">
        <span className="h-1.5 w-1.5 rounded-full bg-q-amber shadow-[0_0_6px_1px_rgba(198,138,61,0.7)]" />
        {title}
      </h2>
      {children}
    </section>
  )
}

function Pills({
  options,
  selected,
  onSelect,
}: {
  options: Option[]
  selected: number
  onSelect: (i: number) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((it, i) => {
        const active = i === selected
        return (
          <button
            key={it.nombre}
            type="button"
            onClick={() => onSelect(i)}
            className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] transition-colors ${
              active
                ? "border-q-amber bg-q-amber/15 text-q-amber-bright"
                : "border-white/10 bg-white/[0.03] text-q-paper hover:border-q-amber/50"
            }`}
          >
            {it.nombre}
            <span
              className={`ml-1.5 font-mono text-[11px] ${
                active ? "text-q-amber-bright" : "text-q-muted"
              }`}
            >
              {it.precio ? fmt(it.precio) : "sin costo"}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function NumField({
  label,
  value,
  onChange,
  type = "number",
  min,
  step,
  placeholder,
}: {
  label: string
  value: string | number
  onChange: (v: string | number) => void
  type?: string
  min?: number
  step?: number
  placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-q-muted">{label}</label>
      <input
        type={type}
        min={min}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 font-mono text-sm text-q-paper outline-none focus:border-q-amber-bright"
      />
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
