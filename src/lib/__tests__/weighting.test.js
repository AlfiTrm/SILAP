import { getTotalWeight, isWeightTotalValid } from '../weighting'

describe('weighting helpers', () => {
  it('sums all criteria values correctly', () => {
    expect(
      getTotalWeight({
        harga: 20,
        cpu: 15,
        gpu: 20,
        ram: 10,
        storage: 10,
        display: 10,
        battery: 10,
        weight: 5,
      }),
    ).toBe(100)
  })

  it('returns false when the total is not 100', () => {
    expect(
      isWeightTotalValid({
        harga: 20,
        cpu: 15,
        gpu: 20,
        ram: 10,
        storage: 10,
        display: 10,
        battery: 10,
        weight: 4,
      }),
    ).toBe(false)
  })
})
