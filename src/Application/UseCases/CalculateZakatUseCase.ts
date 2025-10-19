import { IAssetRepository } from '../../Domain/Interfaces/IAssetRepository';
import { ILiabilityRepository } from '../../Domain/Interfaces/ILiabilityRepository';
import { IUserRepository } from '../../Domain/Interfaces/IUserRepository';
import { IPriceService } from '../../Domain/Interfaces/IPriceService';
import { ZakatCalculationService } from '../../Domain/Services/ZakatCalculationService';
import { HijriDate } from '../../Domain/ValueObjects/HijriDate';
import { CalculateZakatDto, ZakatCalculationResponseDto } from '../DTOs/ZakatCalculationDtos';

/**
 * CalculateZakatUseCase - Use case for calculating zakat obligations
 */
export class CalculateZakatUseCase {
  constructor(
    private readonly assetRepository: IAssetRepository,
    private readonly liabilityRepository: ILiabilityRepository,
    private readonly userRepository: IUserRepository,
    private readonly priceService: IPriceService,
    private readonly zakatCalculationService: ZakatCalculationService
  ) {}

  async execute(dto: CalculateZakatDto): Promise<ZakatCalculationResponseDto> {
    // Get user to determine preferences
    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Get assets
    let assets = await this.assetRepository.findByUserId(dto.userId);
    if (!dto.includeAllAssets && dto.assetIds && dto.assetIds.length > 0) {
      assets = assets.filter((a) => dto.assetIds!.includes(a.id));
    }

    // Get liabilities
    const liabilities = await this.liabilityRepository.findDeductibleByUserId(
      dto.userId
    );

    // Get current nisab threshold
    const nisabPrice =
      user.nisabMethod.method === 'GOLD'
        ? await this.priceService.getGoldPrice(user.currency.code)
        : await this.priceService.getSilverPrice(user.currency.code);

    const nisabThreshold = this.zakatCalculationService.calculateNisab(
      nisabPrice,
      user.nisabMethod.referenceAmount
    );

    // Calculate zakat
    const currentDate = HijriDate.today();
    const result = this.zakatCalculationService.calculateTotalZakat(
      assets,
      liabilities,
      nisabThreshold,
      currentDate
    );

    // Map to response DTO
    return {
      totalWealth: {
        amount: result.totalWealth.amount,
        currency: result.totalWealth.currency,
      },
      nisabThreshold: {
        amount: result.nisabThreshold.amount,
        currency: result.nisabThreshold.currency,
      },
      isAboveNisab: result.isAboveNisab,
      zakatDue: {
        amount: result.zakatDue.amount,
        currency: result.zakatDue.currency,
      },
      eligibleAssets: result.eligibleAssets.map((asset) => {
        const zakatAmount = this.zakatCalculationService.calculateAssetZakat(asset);
        return {
          id: asset.id,
          description: asset.description,
          currentValue: {
            amount: asset.currentValue.amount,
            currency: asset.currentValue.currency,
          },
          zakatAmount: {
            amount: zakatAmount.amount,
            currency: zakatAmount.currency,
          },
        };
      }),
      ineligibleAssets: result.ineligibleAssets.map((asset) => ({
        id: asset.id,
        description: asset.description,
        reason: this.getIneligibilityReason(asset, currentDate),
      })),
      calculationDate: new Date().toISOString(),
    };
  }

  private getIneligibilityReason(asset: any, currentDate: HijriDate): string {
    if (!asset.isZakatable()) {
      return 'Asset type is not zakatable';
    }
    if (!asset.hasCompletedHawl(currentDate)) {
      return 'Hawl (one lunar year) not yet completed';
    }
    if (asset.zakatPaidStatus) {
      return 'Zakat already paid for this cycle';
    }
    return 'Unknown reason';
  }
}
