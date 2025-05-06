import BigNumber from 'bignumber.js';

BigNumber.config({
  EXPONENTIAL_AT: 999999999,
});

export class NumberUtil {
  public static add(a: string, b: string): string {
    return new BigNumber(a).plus(b).toString();
  }

  public static addMultiple(arr: string[]): string {
    return new BigNumber(arr.reduce((a, b) => new BigNumber(a).plus(b).toString(), '0')).toString();
  }

  public static sub(a: string, b: string): string {
    return new BigNumber(a).minus(b).toString();
  }

  public static mul(a: string, b: string): string {
    return new BigNumber(a).multipliedBy(b).toString();
  }

  public static mulRoundUp(a: string, b: string, decimal: number): string {
    return new BigNumber(a).multipliedBy(b).decimalPlaces(decimal, BigNumber.ROUND_UP).toString();
  }

  public static mulRoundDown(a: string, b: string, decimal: number): string {
    return new BigNumber(a).multipliedBy(b).decimalPlaces(decimal, BigNumber.ROUND_DOWN).toString();
  }

  public static div(a: string, b: string): string {
    return new BigNumber(a).dividedBy(b).toString();
  }

  public static divRoundUp(a: string, b: string, decimal: number): string {
    return new BigNumber(a).dividedBy(b).decimalPlaces(decimal, BigNumber.ROUND_UP).toString();
  }

  public static divRoundDown(a: string, b: string, decimal: number): string {
    return new BigNumber(a).dividedBy(b).decimalPlaces(decimal, BigNumber.ROUND_DOWN).toString();
  }

  public static eq(a: string, b: string): boolean {
    // Returns true if and only if a is equal to b.
    return new BigNumber(a).eq(b);
  }

  public static lt(a: string, b: string): boolean {
    // Returns true if and only if a < b.
    return new BigNumber(a).lt(b);
  }

  public static lte(a: string, b: string): boolean {
    // Returns true if and only if a <= b.
    return new BigNumber(a).lte(b);
  }

  public static gt(a: string, b: string): boolean {
    // Returns true if and only if a > b.
    return new BigNumber(a).gt(b);
  }

  public static gte(a: string, b: string): boolean {
    // Returns true if and only if a >= b.
    return new BigNumber(a).gte(b);
  }

  public static isZero(a: string): boolean {
    return new BigNumber(a).isZero();
  }

  public static positiveToNegative(a: string): string {
    if (NumberUtil.lte(a, '0')) return a;

    return '-'.concat(a);
  }

  public static negativeToPositive(a: string): string {
    return a.replace('-', '');
  }

  public static toFixed(a: string, decimalPaces?: number): string {
    if (decimalPaces === undefined) decimalPaces = NumberUtil.getPrecision(a);

    return new BigNumber(a).toFixed(decimalPaces).toString();
  }

  public static toFixedDown(a: string, decimalPaces?: number): string {
    a = a || ZERO_VALUE;
    return NumberUtil.getPrecision(a) > decimalPaces
      ? new BigNumber(a).toFixed(decimalPaces, BigNumber.ROUND_FLOOR)
      : new BigNumber(a).toFixed();
  }

  public static toFixedWithoutRounding(value: string, decimals: number) {
    const factor = new BigNumber(10).pow(decimals);
    return new BigNumber(value).times(factor).integerValue(BigNumber.ROUND_DOWN).div(factor).toString();
  }

  public static getPrecision(a: string): number {
    return new BigNumber(a).decimalPlaces()!;
  }

  public static numberToString(x) {
    // avoids scientific notation for too large and too small numbers

    if (typeof x === 'string') return x;

    const s = x.toString();
    if (Math.abs(x) < 1.0) {
      const n_e = s.split('e-');
      const n = n_e[0].replace('.', '');
      const e = parseInt(n_e[1]);
      const neg = s[0] === '-';
      if (e) {
        x = (neg ? '-' : '') + '0.' + new Array(e).join('0') + n.substring(neg);
        return x;
      }
    } else {
      const parts = s.split('e');
      if (parts[1]) {
        let e = parseInt(parts[1]);
        const m = parts[0].split('.');
        let part = '';
        if (m[1]) {
          e -= m[1].length;
          part = m[1];
        }
        return m[0] + part + new Array(e + 1).join('0');
      }
    }
    return s;
  }

  public static isInteger(a: string) {
    return BigNumber(a).isInteger();
  }
}

export const ZERO_VALUE = '0';

export const ONE_VALUE = '1';

export const ONE_HUNDREDS_VALUE = '100';

export const ONE_THOUSANDS_VALUE = '1000';
