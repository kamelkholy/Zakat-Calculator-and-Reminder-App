import { IAssetRepository } from '../../Domain/Interfaces/IAssetRepository';
import { Asset } from '../../Domain/Entities/Asset';
import { AssetType } from '../../Domain/ValueObjects/AssetType';
import { Money } from '../../Domain/ValueObjects/Money';
import { HijriDate } from '../../Domain/ValueObjects/HijriDate';
import { CreateAssetDto, AssetResponseDto } from '../DTOs/AssetDtos';

/**
 * CreateAssetUseCase - Use case for creating a new asset
 */
export class CreateAssetUseCase {
  constructor(private readonly assetRepository: IAssetRepository) {}

  async execute(dto: CreateAssetDto): Promise<AssetResponseDto> {
    // Create value objects
    const assetType = AssetType.fromString(dto.type);
    const currentValue = new Money(dto.currentValue.amount, dto.currentValue.currency);
    const acquisitionDate = new HijriDate(
      dto.acquisitionDate.year,
      dto.acquisitionDate.month,
      dto.acquisitionDate.day
    );

    // Create entity
    const asset = new Asset(
      this.generateId(),
      dto.userId,
      assetType,
      currentValue,
      acquisitionDate,
      dto.description,
      new Date(),
      false
    );

    // Persist
    await this.assetRepository.save(asset);

    // Return DTO
    return this.mapToResponseDto(asset);
  }

  private generateId(): string {
    return `asset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private mapToResponseDto(asset: Asset): AssetResponseDto {
    const hawlDate = asset.getHawlCompletionDate();
    const currentDate = HijriDate.today();

    return {
      id: asset.id,
      userId: asset.userId,
      type: asset.type.type,
      currentValue: {
        amount: asset.currentValue.amount,
        currency: asset.currentValue.currency,
      },
      acquisitionDate: {
        year: asset.acquisitionDate.year,
        month: asset.acquisitionDate.month,
        day: asset.acquisitionDate.day,
      },
      description: asset.description,
      lastUpdated: asset.lastUpdated.toISOString(),
      zakatPaidStatus: asset.zakatPaidStatus,
      hawlCompletionDate: {
        year: hawlDate.year,
        month: hawlDate.month,
        day: hawlDate.day,
      },
      hasCompletedHawl: asset.hasCompletedHawl(currentDate),
      isZakatable: asset.isZakatable(),
    };
  }
}
