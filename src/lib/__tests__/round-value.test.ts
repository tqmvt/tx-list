import { roundValue } from '@/lib/round-value';

describe('Round value function should work correctly', () => {
  it('should return rounded value', () => {
    const result = roundValue(1178.033);
    expect(result).toEqual(1178);
  });
});
