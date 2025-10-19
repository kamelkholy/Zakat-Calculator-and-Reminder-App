/**
 * Data Transfer Objects for Zakat Calculation
 */

export interface CalculateZakatDto {
  userId: string;
  includeAllAssets?: boolean;
  assetIds?: string[];
}

export interface ZakatCalculationResponseDto {
  totalWealth: {
    amount: number;
    currency: string;
  };
  nisabThreshold: {
    amount: number;
    currency: string;
  };
  isAboveNisab: boolean;
  zakatDue: {
    amount: number;
    currency: string;
  };
  eligibleAssets: Array<{
    id: string;
    description: string;
    currentValue: {
      amount: number;
      currency: string;
    };
    zakatAmount: {
      amount: number;
      currency: string;
    };
  }>;
  ineligibleAssets: Array<{
    id: string;
    description: string;
    reason: string;
  }>;
  calculationDate: string;
}

export interface GetNisabThresholdDto {
  currency: string;
  method: 'GOLD' | 'SILVER';
}

export interface NisabThresholdResponseDto {
  nisabThreshold: {
    amount: number;
    currency: string;
  };
  method: string;
  referencePrice: {
    amount: number;
    currency: string;
  };
  gramsRequired: number;
  lastUpdated: string;
}
