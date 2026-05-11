export const presetWeights = {
  Gaming: {
    harga: 10,
    cpu: 15,
    gpu: 30,
    ram: 10,
    storage: 10,
    display: 10,
    battery: 5,
    weight: 10,
  },
  'Konten Kreator': {
    harga: 10,
    cpu: 20,
    gpu: 20,
    ram: 15,
    storage: 10,
    display: 15,
    battery: 5,
    weight: 5,
  },
  Produktivitas: {
    harga: 15,
    cpu: 15,
    gpu: 10,
    ram: 15,
    storage: 10,
    display: 10,
    battery: 15,
    weight: 10,
  },
  'Dana Pelajar': {
    harga: 30,
    cpu: 15,
    gpu: 5,
    ram: 10,
    storage: 10,
    display: 10,
    battery: 10,
    weight: 10,
  },
}

export function getTotalWeight(weights) {
  return Object.values(weights).reduce((sum, value) => sum + Number(value || 0), 0)
}

export function isWeightTotalValid(weights) {
  return getTotalWeight(weights) === 100
}
