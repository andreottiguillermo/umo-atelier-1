// Datos y lógica del cotizador — copiados de la planilla original.

export const WHATSAPP_NUMBER = "543884464020" // +54 388 446 4020

export type Option = {
  nombre: string
  precio: number
  codigo: string
}

export type Modelo = Option & { id: string; portalamparas: string }

export const MODELOS: Modelo[] = [
  { id: "lumenis_01", nombre: "Lumenis 01", precio: 45400, portalamparas: "E27", codigo: "1" },
  { id: "arcae_01", nombre: "Arcae 01", precio: 40000, portalamparas: "E14", codigo: "2" },
  { id: "nebula_01", nombre: "Nébula 01", precio: 85000, portalamparas: "—", codigo: "3" },
]

export const CABLES: Option[] = [
  { nombre: "Entelado rojo", precio: 4000, codigo: "1" },
  { nombre: "Entelado fucsia", precio: 4000, codigo: "2" },
  { nombre: "Entelado cobre", precio: 4000, codigo: "3" },
  { nombre: "Transparente", precio: 2500, codigo: "4" },
  { nombre: "Blanco", precio: 2500, codigo: "5" },
  { nombre: "Negro", precio: 2000, codigo: "6" },
]

export const FLORONES: Option[] = [
  { nombre: "Negro", precio: 0, codigo: "1" },
  { nombre: "Blanco", precio: 0, codigo: "2" },
  { nombre: "Cromado", precio: 2000, codigo: "3" },
]

export const FUSTES: Option[] = [
  { nombre: "Madera", precio: 25000, codigo: "1" },
  { nombre: "PLA", precio: 0, codigo: "2" },
]

export const TULIPAS: Option[] = [
  { nombre: "Cristal clear", precio: 0, codigo: "1" },
  { nombre: "Hueso", precio: 1000, codigo: "2" },
]

export const MARGEN_PCT = 0.1

export const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-AR")

export type QuoterState = {
  modelo: number
  cable: number
  floron: number
  fuste: number
  tulipa: number
  cantidad: number
  metros: number
  diametro: string
  altura: string
}

export function computeQuote(state: QuoterState) {
  const cantidad = Math.max(0, state.cantidad || 0)
  const metros = Math.max(0, state.metros || 0)

  const modelo = MODELOS[state.modelo]
  const cable = CABLES[state.cable]
  const floron = FLORONES[state.floron]
  const fuste = FUSTES[state.fuste]
  const tulipa = TULIPAS[state.tulipa]

  const costoModelo = modelo.precio * cantidad
  const costoCable = cable.precio * metros * cantidad
  const costoFloron = floron.precio * cantidad
  const costoFuste = fuste.precio * cantidad
  const costoTulipa = tulipa.precio * cantidad

  const subtotal = costoModelo + costoCable + costoFloron + costoFuste + costoTulipa
  const margen = subtotal * MARGEN_PCT
  const total = subtotal + margen

  const productCode = `UMO-${modelo.codigo}${cable.codigo}${floron.codigo}${fuste.codigo}${tulipa.codigo}`

  const items = [
    { label: `Modelo · ${modelo.nombre}`, value: costoModelo },
    { label: `Cable · ${cable.nombre} (${metros} m)`, value: costoCable },
    { label: `Florón · ${floron.nombre}`, value: costoFloron },
    { label: `Fuste · ${fuste.nombre}`, value: costoFuste },
    { label: `Tulipa · ${tulipa.nombre}`, value: costoTulipa },
  ]

  return {
    modelo,
    cable,
    floron,
    fuste,
    tulipa,
    cantidad,
    metros,
    subtotal,
    margen,
    total,
    productCode,
    items,
  }
}

/** Construye el enlace wa.me con un mensaje predefinido. */
export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
