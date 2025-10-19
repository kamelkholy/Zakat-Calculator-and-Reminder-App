# Zakat Calculator App - File Index

Quick reference guide to navigate the project structure.

## 📖 Documentation Files

| File | Purpose | Lines |
|------|---------|-------|
| [README.md](README.md) | Project overview, features, getting started | 400+ |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Complete creation summary and next steps | 300+ |
| [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) | **17-week detailed implementation plan** | 800+ |
| [IMMEDIATE_NEXT_STEPS.md](IMMEDIATE_NEXT_STEPS.md) | **Quick start guide for Week 1** | 400+ |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Detailed implementation guide | 350+ |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Clean architecture patterns and design | 400+ |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines | 150+ |
| [DesignDocument.md](DesignDocument.md) | Original product design document | 500+ |

## 🏗️ Domain Layer

### Entities
| File | Description |
|------|-------------|
| [Asset.ts](src/Domain/Entities/Asset.ts) | Zakatable asset entity with hawl tracking |
| [User.ts](src/Domain/Entities/User.ts) | User entity with preferences |
| [Reminder.ts](src/Domain/Entities/Reminder.ts) | Zakat reminder entity |
| [Liability.ts](src/Domain/Entities/Liability.ts) | Debt/liability entity |

### Value Objects
| File | Description |
|------|-------------|
| [Money.ts](src/Domain/ValueObjects/Money.ts) | Monetary value with currency |
| [HijriDate.ts](src/Domain/ValueObjects/HijriDate.ts) | Islamic calendar date |
| [AssetType.ts](src/Domain/ValueObjects/AssetType.ts) | Asset type classification |
| [Currency.ts](src/Domain/ValueObjects/Currency.ts) | ISO 4217 currency codes |
| [NisabCalculationMethod.ts](src/Domain/ValueObjects/NisabCalculationMethod.ts) | Nisab calculation method |

### Aggregates
| File | Description |
|------|-------------|
| [UserPortfolio.ts](src/Domain/Aggregates/UserPortfolio.ts) | User portfolio aggregate root |

### Domain Services
| File | Description |
|------|-------------|
| [ZakatCalculationService.ts](src/Domain/Services/ZakatCalculationService.ts) | Core zakat calculation logic |
| [ReminderService.ts](src/Domain/Services/ReminderService.ts) | Reminder management logic |

### Repository Interfaces
| File | Description |
|------|-------------|
| [IAssetRepository.ts](src/Domain/Interfaces/IAssetRepository.ts) | Asset repository interface |
| [IUserRepository.ts](src/Domain/Interfaces/IUserRepository.ts) | User repository interface |
| [IReminderRepository.ts](src/Domain/Interfaces/IReminderRepository.ts) | Reminder repository interface |
| [ILiabilityRepository.ts](src/Domain/Interfaces/ILiabilityRepository.ts) | Liability repository interface |
| [IPriceService.ts](src/Domain/Interfaces/IPriceService.ts) | Price service interface |
| [IHijriCalendarService.ts](src/Domain/Interfaces/IHijriCalendarService.ts) | Hijri calendar interface |
| [INotificationService.ts](src/Domain/Interfaces/INotificationService.ts) | Notification service interface |

## 📋 Application Layer

### Use Cases
| File | Description |
|------|-------------|
| [CreateAssetUseCase.ts](src/Application/UseCases/CreateAssetUseCase.ts) | Create new asset |
| [CalculateZakatUseCase.ts](src/Application/UseCases/CalculateZakatUseCase.ts) | Calculate zakat |
| [CreateUserUseCase.ts](src/Application/UseCases/CreateUserUseCase.ts) | Register user |
| [ProcessRemindersUseCase.ts](src/Application/UseCases/ProcessRemindersUseCase.ts) | Process reminders |

### DTOs
| File | Description |
|------|-------------|
| [AssetDtos.ts](src/Application/DTOs/AssetDtos.ts) | Asset data transfer objects |
| [UserDtos.ts](src/Application/DTOs/UserDtos.ts) | User data transfer objects |
| [ZakatCalculationDtos.ts](src/Application/DTOs/ZakatCalculationDtos.ts) | Zakat calculation DTOs |
| [ReminderDtos.ts](src/Application/DTOs/ReminderDtos.ts) | Reminder DTOs |
| [LiabilityDtos.ts](src/Application/DTOs/LiabilityDtos.ts) | Liability DTOs |

## 🔧 Infrastructure Layer

### Structure (Implementation Pending)
| Directory | Purpose |
|-----------|---------|
| `src/Infrastructure/Persistence/` | MongoDB repositories |
| `src/Infrastructure/ExternalAPIs/` | Third-party API clients |
| `src/Infrastructure/Notifications/` | FCM, email, SMS services |
| `src/Infrastructure/Security/` | Auth & encryption |

## 🎨 Presentation Layer

### Structure (Implementation Pending)
| Directory | Purpose |
|-----------|---------|
| `src/Presentation/Mobile/screens/` | Mobile app screens |
| `src/Presentation/Mobile/components/` | Reusable UI components |
| `src/Presentation/Mobile/navigation/` | Navigation config |

## 🖥️ Backend Services

### Microservices
| Service | Port | File | Status |
|---------|------|------|--------|
| Asset Management | 3001 | [index.ts](backend/AssetManagementService/src/index.ts) | Basic ✅ |
| Zakat Calculation | 3002 | [index.ts](backend/ZakatCalculationService/src/index.ts) | Basic ✅ |
| Reminder Service | 3003 | `backend/ReminderService/` | Pending ⏳ |
| User Management | 3004 | `backend/UserManagementService/` | Pending ⏳ |
| Reports Service | 3005 | `backend/ReportsService/` | Pending ⏳ |
| Educational Content | 3006 | `backend/EducationalContentService/` | Pending ⏳ |
| API Gateway | 3000 | `backend/APIGateway/` | Pending ⏳ |

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| [package.json](package.json) | Root package configuration |
| [tsconfig.json](tsconfig.json) | TypeScript configuration |
| [docker-compose.yml](docker-compose.yml) | Container orchestration |
| [.env.example](.env.example) | Environment variables template |
| [.gitignore](.gitignore) | Git ignore rules |
| [.github/copilot-instructions.md](.github/copilot-instructions.md) | AI assistant context |

## 🧪 Testing

### Structure (Tests Pending)
| Directory | Purpose |
|-----------|---------|
| `tests/unit/` | Unit tests for domain logic |
| `tests/integration/` | Integration tests for repositories |

## 📊 Quick Stats

```
Total Files Created:        60+
Lines of Code:              3,500+
Documentation:              2,000+ lines
Domain Entities:            4
Value Objects:              5
Use Cases:                  4
Repository Interfaces:      7
Microservices:             7
Configuration Files:        6
Documentation Files:        6
```

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Development
npm run build          # Build all projects
npm test              # Run tests
npm run lint          # Lint code
npm run format        # Format code

# Backend
npm run docker:up     # Start all services
npm run docker:down   # Stop all services
npm run backend:dev   # Run backend in dev mode

# Mobile
npm run mobile:start  # Start Metro bundler
npm run mobile:android # Run on Android
npm run mobile:ios    # Run on iOS
```

## 📍 Where to Start

### For New Developers
1. Read [README.md](README.md) for project overview
2. Check [GETTING_STARTED.md](GETTING_STARTED.md) for setup
3. Review [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for patterns
4. Study domain layer files to understand business logic

### For Implementation
1. Start with [GETTING_STARTED.md](GETTING_STARTED.md)
2. Implement infrastructure layer repositories
3. Complete backend microservices
4. Build mobile application
5. Write comprehensive tests

### For Contributors
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Review existing code patterns
3. Follow coding standards
4. Submit pull requests

## 🔍 Find What You Need

| Looking for... | Go to... |
|----------------|----------|
| Business rules | `src/Domain/Entities/` |
| Calculations | `src/Domain/Services/` |
| Use cases | `src/Application/UseCases/` |
| API contracts | `src/Application/DTOs/` |
| Architecture guide | `docs/ARCHITECTURE.md` |
| Setup instructions | `GETTING_STARTED.md` |
| Project overview | `README.md` |
| Backend services | `backend/` |
| Configuration | Root directory config files |

## 📞 Help & Support

- **Architecture Questions**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Setup Issues**: Check [GETTING_STARTED.md](GETTING_STARTED.md)
- **Contributing**: Read [CONTRIBUTING.md](CONTRIBUTING.md)
- **Project Status**: Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

**Last Updated**: October 18, 2025
**Project Status**: Architecture Complete ✅ | Implementation Ready ⏳
