/**
 * NisabCalculationMethod Value Object - Represents the method used to calculate nisab threshold
 */
export class NisabCalculationMethod {
  constructor(private readonly _method: NisabMethod) {}

  get method(): NisabMethod {
    return this._method;
  }

  /**
   * Get the amount of gold/silver used for nisab calculation
   */
  get referenceAmount(): number {
    switch (this._method) {
      case NisabMethod.Gold:
        return 85; // 85 grams of gold
      case NisabMethod.Silver:
        return 595; // 595 grams of silver
      default:
        throw new Error('Invalid nisab method');
    }
  }

  /**
   * Get the reference metal
   */
  get referenceMetal(): 'GOLD' | 'SILVER' {
    switch (this._method) {
      case NisabMethod.Gold:
        return 'GOLD';
      case NisabMethod.Silver:
        return 'SILVER';
      default:
        throw new Error('Invalid nisab method');
    }
  }

  equals(other: NisabCalculationMethod): boolean {
    return this._method === other._method;
  }

  toString(): string {
    return this._method === NisabMethod.Gold ? 'Gold (85g)' : 'Silver (595g)';
  }

  // Factory methods
  static gold(): NisabCalculationMethod {
    return new NisabCalculationMethod(NisabMethod.Gold);
  }

  static silver(): NisabCalculationMethod {
    return new NisabCalculationMethod(NisabMethod.Silver);
  }

  /**
   * Create from string
   */
  static fromString(value: string): NisabCalculationMethod {
    const upperValue = value.toUpperCase();
    if (upperValue === 'GOLD') {
      return NisabCalculationMethod.gold();
    } else if (upperValue === 'SILVER') {
      return NisabCalculationMethod.silver();
    }
    throw new Error(`Invalid nisab method: ${value}`);
  }
}

export enum NisabMethod {
  Gold = 'GOLD',
  Silver = 'SILVER',
}
