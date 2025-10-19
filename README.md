# Zakat Calculator and Reminder App

A comprehensive mobile application built with **Clean Architecture** principles to help Muslims calculate zakat obligations on their assets and receive timely reminders when assets become eligible for zakat payment.

## 🏗️ Architecture Overview

This project follows **Clean Architecture** (also known as Hexagonal Architecture or Ports and Adapters) with clear separation of concerns across four layers:

```
┌─────────────────────────────────────────────────────────────┐
│                   Presentation Layer                        │
│              (Mobile UI - React Native)                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Application Layer                         │
│        (Use Cases, DTOs, Application Services)              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Domain Layer                            │
│  (Entities, Value Objects, Aggregates, Domain Services)     │
└─────────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                       │
│   (Data Access, External APIs, Notifications, Security)     │
└─────────────────────────────────────────────────────────────┘
```

### Project Structure

```
zakat-calculator-app/
├── src/
│   ├── Domain/                    # Core business logic (no dependencies)
│   │   ├── Entities/              # Business entities
│   │   ├── ValueObjects/          # Immutable value objects
│   │   ├── Aggregates/            # Aggregate roots
│   │   ├── Services/              # Domain services
│   │   └── Interfaces/            # Repository & service interfaces
│   │
│   ├── Application/               # Application business rules
│   │   ├── UseCases/              # Application use cases
│   │   ├── DTOs/                  # Data transfer objects
│   │   ├── Interfaces/            # Application service interfaces
│   │   └── Services/              # Application services
│   │
│   ├── Infrastructure/            # External concerns
│   │   ├── Persistence/           # Database implementations
│   │   ├── ExternalAPIs/          # Third-party API integrations
│   │   ├── Notifications/         # Push notifications, email, SMS
│   │   └── Security/              # Authentication & encryption
│   │
│   └── Presentation/              # UI Layer
│       └── Mobile/                # React Native mobile app
│           ├── screens/           # App screens
│           ├── components/        # Reusable UI components
│           └── navigation/        # Navigation configuration
│
├── backend/                       # Microservices architecture
│   ├── AssetManagementService/    # Asset CRUD operations
│   ├── ZakatCalculationService/   # Zakat calculation engine
│   ├── ReminderService/           # Reminder scheduling & delivery
│   ├── UserManagementService/     # User authentication & profiles
│   ├── ReportsService/            # Analytics & reports
│   ├── EducationalContentService/ # Islamic resources
│   └── APIGateway/                # API Gateway & routing
│
├── tests/
│   ├── unit/                      # Unit tests
│   └── integration/               # Integration tests
│
└── docs/                          # Documentation
```

## 🎯 Core Features

### 1. Asset Management
- Track multiple asset types: cash, gold, silver, stocks, crypto, real estate, etc.
- Record acquisition dates for hawl (lunar year) tracking
- Update asset values manually or via API integration
- Categorize and organize assets

### 2. Zakat Calculation Engine
- Real-time nisab threshold calculation (gold/silver based)
- Automatic 2.5% zakat rate application
- Hijri and Gregorian calendar support
- Aggregate all zakatable assets
- Deduct immediate debts and liabilities

### 3. Reminder System
- Hawl completion reminders
- Pre-Ramadan notifications
- Custom reminder schedules
- Nisab threshold alerts
- Multi-channel delivery (push, email, SMS)

### 4. Reports & Analytics
- Annual zakat summary reports
- Asset growth tracking
- Visual charts and graphs
- Export to PDF/CSV

### 5. Educational Resources
- Zakat fundamentals
- FAQs and scholarly references
- Video tutorials
- Common scenarios guidance

## 🔧 Technology Stack

### Frontend
- **Framework**: React Native (TypeScript)
- **State Management**: Redux Toolkit / Context API
- **Navigation**: React Navigation
- **UI Library**: React Native Paper / Native Base
- **API Client**: Axios

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **API Style**: RESTful / GraphQL
- **Authentication**: JWT + Biometric

### Database
- **Primary**: MongoDB (encrypted)
- **Caching**: Redis
- **Search**: Elasticsearch (optional)

### External APIs
- Gold/Silver prices API
- Currency conversion API
- Cryptocurrency prices API
- Hijri calendar API
- Firebase Cloud Messaging

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose / Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker & Docker Compose (for backend services)
- React Native development environment
- MongoDB instance

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd zakat-calculator-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start backend services**
```bash
npm run docker:up
# or manually
npm run backend:dev
```

5. **Start mobile app**
```bash
npm run mobile:start
# For Android
npm run mobile:android
# For iOS
npm run mobile:ios
```

### Development Commands

```bash
# Build all projects
npm run build

# Run tests
npm test
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format

# Clean build artifacts
npm run clean
```

## 📋 Domain Model

### Key Entities
- **User**: Application user with preferences
- **Asset**: Zakatable or non-zakatable asset
- **Liability**: Debt or liability
- **Reminder**: Notification for zakat obligations

### Key Value Objects
- **Money**: Monetary value with currency
- **HijriDate**: Islamic calendar date
- **AssetType**: Type of asset
- **Currency**: ISO currency code
- **NisabCalculationMethod**: Gold or silver based

### Key Aggregates
- **UserPortfolio**: User's complete financial portfolio (aggregate root)

### Key Domain Services
- **ZakatCalculationService**: Zakat calculation logic
- **ReminderService**: Reminder creation and management

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test suite
npm test -- AssetEntity.test.ts
```

## 🔒 Security Features

- End-to-end encryption for financial data
- Biometric authentication (fingerprint, Face ID)
- JWT token-based authentication
- Secure password hashing (bcrypt)
- Optional local-only storage mode
- GDPR compliance
- Regular security audits

## 📱 Mobile App Features

### Screens
- Dashboard (wealth overview)
- Assets List & Management
- Zakat Calculator
- Reminders
- Reports & Analytics
- Settings
- Educational Content

### Supported Platforms
- iOS 13+
- Android 8.0+

## 🌍 Localization

Supported languages:
- English
- Arabic (RTL support)
- Urdu
- Malay
- Turkish
- French

## 📖 API Documentation

API documentation is available at:
- Development: `http://localhost:3000/api-docs`
- Production: `https://api.zakatcalculator.app/api-docs`

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Islamic scholars for zakat calculation methodologies
- Open-source community for excellent libraries
- Beta testers for valuable feedback

## 📞 Support

For support, email support@zakatcalculator.app or join our Discord community.

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- ✅ Basic asset tracking
- ✅ Simple zakat calculation
- ✅ Basic reminders
- ✅ iOS and Android apps

### Phase 2: Enhanced Features
- [ ] Additional asset types
- [ ] Advanced reminder options
- [ ] Reports and analytics
- [ ] Educational content

### Phase 3: Premium Features
- [ ] Cloud sync
- [ ] Multi-currency support
- [ ] API integrations for auto-updates
- [ ] Advanced customization

### Phase 4: Community & Scale
- [ ] User feedback integration
- [ ] Multi-language support
- [ ] Partnership with Islamic orgs
- [ ] Regular content updates

## 📊 Project Status

Current Version: 1.0.0 (MVP)
Status: Active Development

---

**May Allah accept this project and benefit the Muslim community. Ameen.**
