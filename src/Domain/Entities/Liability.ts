import { Money } from '../ValueObjects/Money';

/**
 * Liability Entity - Represents a debt or liability that reduces zakatable wealth
 */
export class Liability {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    private _amount: Money,
    private _description: string,
    private _dueDate: Date | null,
    private _isImmediatelyDue: boolean,
    private _createdAt: Date
  ) {}

  get amount(): Money {
    return this._amount;
  }

  get description(): string {
    return this._description;
  }

  get dueDate(): Date | null {
    return this._dueDate;
  }

  get isImmediatelyDue(): boolean {
    return this._isImmediatelyDue;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  /**
   * Update the liability amount
   */
  updateAmount(newAmount: Money): void {
    this._amount = newAmount;
  }

  /**
   * Update liability details
   */
  updateDetails(description: string, dueDate: Date | null): void {
    this._description = description;
    this._dueDate = dueDate;
  }

  /**
   * Mark liability as immediately due (deductible from zakat calculation)
   */
  markAsImmediatelyDue(): void {
    this._isImmediatelyDue = true;
  }

  /**
   * Check if liability should be deducted from zakatable wealth
   * Only immediately due debts are typically deducted
   */
  isDeductible(): boolean {
    return this._isImmediatelyDue;
  }
}
