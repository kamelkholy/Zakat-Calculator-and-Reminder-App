/**
 * Data Transfer Objects for Liability Management
 */

export interface CreateLiabilityDto {
  userId: string;
  amount: {
    amount: number;
    currency: string;
  };
  description: string;
  dueDate?: string; // ISO date string
  isImmediatelyDue: boolean;
}

export interface UpdateLiabilityDto {
  id: string;
  amount?: {
    amount: number;
    currency: string;
  };
  description?: string;
  dueDate?: string;
}

export interface LiabilityResponseDto {
  id: string;
  userId: string;
  amount: {
    amount: number;
    currency: string;
  };
  description: string;
  dueDate: string | null;
  isImmediatelyDue: boolean;
  isDeductible: boolean;
  createdAt: string;
}
