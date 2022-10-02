import { addressShortener } from '@/lib/address-shortener';

describe('Address shortener function should work correctly', () => {
  it('should return shortened address', () => {
    const result = addressShortener(
      '0xEE8C4911301326fbb0bEd0954b9aC78A508566a9'
    );
    expect(result).toEqual('0xEE...6a9');
  });
});
