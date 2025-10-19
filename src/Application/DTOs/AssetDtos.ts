/**
 * Data Transfer Objects for Asset Management
 */

export interface CreateAssetDto {
  userId: string;
  type: string;
  currentValue: {
    amount: number;
    currency: string;
  };
  acquisitionDate: {
    year: number;
    month: number;
    day: number;
  };
  description: string;
}

export interface UpdateAssetDto {
  id: string;
  currentValue?: {
    amount: number;
    currency: string;
  };
  description?: string;
}

export interface AssetResponseDto {
  id: string;
  userId: string;
  type: string;
  currentValue: {
    amount: number;
    currency: string;
  };
  acquisitionDate: {
    year: number;
    month: number;
    day: number;
  };
  description: string;
  lastUpdated: string;
  zakatPaidStatus: boolean;
  hawlCompletionDate: {
    year: number;
    month: number;
    day: number;
  };
  hasCompletedHawl: boolean;
  isZakatable: boolean;
}
