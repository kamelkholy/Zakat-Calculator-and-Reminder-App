# 🗺️ Zakat Calculator App - Implementation Roadmap

## Current Project Status (October 18, 2025)

### ✅ Completed Components
- **Domain Layer**: 100% complete (20+ files)
- **Application Layer**: 90% complete (9 files)
- **Project Structure**: 100% complete
- **Documentation**: 100% complete
- **Configuration**: 100% complete

### ⏳ Pending Implementation
- **Infrastructure Layer**: 0% (structure only)
- **Backend Microservices**: 30% (2/7 services have basic setup)
- **Mobile Application**: 0% (folder structure only)
- **Testing**: 0%
- **CI/CD**: 0%

---

## 📅 Implementation Timeline

### **Phase 1: Infrastructure Foundation** (Weeks 1-3)
**Goal**: Make domain logic functional with real implementations

#### Week 1: Database & Persistence
**Priority**: HIGH | **Effort**: 40 hours

**Tasks**:
1. **Set up MongoDB Connection** (4 hours)
   - Create database connection utility in `src/Infrastructure/Persistence/DatabaseConnection.ts`
   - Configure connection pooling
   - Add connection health checks
   - Handle reconnection logic

2. **Implement AssetRepository** (8 hours)
   - File: `src/Infrastructure/Persistence/AssetRepository.ts`
   - Implement all methods from `IAssetRepository`
   - Add field-level encryption for sensitive data
   - Create MongoDB indexes for performance
   - Add error handling and logging

3. **Implement UserRepository** (8 hours)
   - File: `src/Infrastructure/Persistence/UserRepository.ts`
   - Implement all methods from `IUserRepository`
   - Hash passwords using bcrypt
   - Encrypt sensitive user data
   - Create unique indexes for email/userId

4. **Implement ReminderRepository** (6 hours)
   - File: `src/Infrastructure/Persistence/ReminderRepository.ts`
   - Implement all methods from `IReminderRepository`
   - Add indexes for scheduled date queries
   - Optimize for time-based queries

5. **Implement LiabilityRepository** (6 hours)
   - File: `src/Infrastructure/Persistence/LiabilityRepository.ts`
   - Implement all methods from `ILiabilityRepository`
   - Add user-based indexes

6. **Write Repository Unit Tests** (8 hours)
   - Use in-memory MongoDB for testing
   - Test all CRUD operations
   - Test edge cases and error scenarios

**Deliverables**:
- ✅ All repository implementations complete
- ✅ Database connection configured
- ✅ Repository tests passing
- ✅ Data encryption working

**Files to Create**:
```
src/Infrastructure/Persistence/
├── DatabaseConnection.ts
├── AssetRepository.ts
├── UserRepository.ts
├── ReminderRepository.ts
├── LiabilityRepository.ts
└── models/
    ├── AssetModel.ts
    ├── UserModel.ts
    ├── ReminderModel.ts
    └── LiabilityModel.ts
```

---

#### Week 2: External API Integrations
**Priority**: HIGH | **Effort**: 40 hours

**Tasks**:
1. **Gold/Silver Price API Client** (8 hours)
   - File: `src/Infrastructure/ExternalAPIs/GoldSilverPriceClient.ts`
   - Implement `IPriceService` interface
   - Integrate with metals-api.com or goldapi.io
   - Add caching (Redis) for price data (15-min cache)
   - Add fallback to multiple price sources
   - Handle rate limiting

2. **Cryptocurrency Price Client** (6 hours)
   - File: `src/Infrastructure/ExternalAPIs/CryptoPriceClient.ts`
   - Integrate with CoinGecko or CoinMarketCap API
   - Support multiple cryptocurrencies
   - Add price caching
   - Handle API errors gracefully

3. **Currency Conversion Client** (6 hours)
   - File: `src/Infrastructure/ExternalAPIs/CurrencyConversionClient.ts`
   - Integrate with exchangerate-api.com or fixer.io
   - Support 150+ currencies
   - Cache exchange rates (daily refresh)
   - Handle offline scenarios

4. **Hijri Calendar Service** (8 hours)
   - File: `src/Infrastructure/ExternalAPIs/HijriCalendarClient.ts`
   - Implement `IHijriCalendarService` interface
   - Integrate with IslamicFinder or Aladhan API
   - Convert between Hijri and Gregorian dates
   - Calculate hawl completion dates
   - Handle timezone conversions

5. **API Client Base Class** (4 hours)
   - File: `src/Infrastructure/ExternalAPIs/BaseApiClient.ts`
   - Create reusable HTTP client
   - Add retry logic with exponential backoff
   - Add request/response logging
   - Handle timeouts

6. **Write API Integration Tests** (8 hours)
   - Mock external APIs
   - Test error scenarios
   - Test caching behavior
   - Test rate limiting

**Deliverables**:
- ✅ All external API clients functional
- ✅ Caching layer implemented
- ✅ Error handling and fallbacks
- ✅ API integration tests passing

**Files to Create**:
```
src/Infrastructure/ExternalAPIs/
├── BaseApiClient.ts
├── GoldSilverPriceClient.ts
├── CryptoPriceClient.ts
├── CurrencyConversionClient.ts
├── HijriCalendarClient.ts
└── cache/
    └── RedisCache.ts
```

**Environment Variables Needed**:
```env
GOLD_PRICE_API_KEY=your_key_here
CRYPTO_PRICE_API_KEY=your_key_here
CURRENCY_API_KEY=your_key_here
HIJRI_CALENDAR_API_KEY=your_key_here
REDIS_URL=redis://localhost:6379
```

---

#### Week 3: Security & Notifications
**Priority**: HIGH | **Effort**: 40 hours

**Tasks**:
1. **JWT Authentication Service** (8 hours)
   - File: `src/Infrastructure/Security/JwtAuthService.ts`
   - Generate JWT tokens
   - Validate and decode tokens
   - Implement refresh token logic
   - Add token blacklisting (Redis)

2. **Encryption Service** (8 hours)
   - File: `src/Infrastructure/Security/EncryptionService.ts`
   - Field-level encryption for sensitive data
   - Use AES-256-GCM encryption
   - Key management and rotation
   - Encrypt: asset values, account numbers, personal info

3. **Password Hashing Service** (4 hours)
   - File: `src/Infrastructure/Security/PasswordHashService.ts`
   - Use bcrypt for password hashing
   - Add salt rounds configuration
   - Implement password verification

4. **Firebase Cloud Messaging** (8 hours)
   - File: `src/Infrastructure/Notifications/FirebaseNotificationService.ts`
   - Implement `INotificationService` interface
   - Configure Firebase Admin SDK
   - Send push notifications
   - Handle device token management
   - Support notification scheduling

5. **Email Notification Service** (6 hours)
   - File: `src/Infrastructure/Notifications/EmailNotificationService.ts`
   - Integrate with SendGrid or AWS SES
   - Create email templates
   - Send zakat reminders
   - Handle email failures

6. **SMS Notification Service** (6 hours)
   - File: `src/Infrastructure/Notifications/SmsNotificationService.ts`
   - Integrate with Twilio or AWS SNS
   - Send SMS reminders
   - Handle SMS delivery status

**Deliverables**:
- ✅ Authentication system functional
- ✅ Data encryption implemented
- ✅ All notification channels working
- ✅ Security tests passing

**Files to Create**:
```
src/Infrastructure/Security/
├── JwtAuthService.ts
├── EncryptionService.ts
└── PasswordHashService.ts

src/Infrastructure/Notifications/
├── FirebaseNotificationService.ts
├── EmailNotificationService.ts
├── SmsNotificationService.ts
└── templates/
    ├── email/
    │   ├── zakat-reminder.html
    │   └── hawl-completion.html
    └── sms/
        └── reminder-template.txt
```

**Environment Variables Needed**:
```env
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
ENCRYPTION_KEY=your_encryption_key_here

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

SENDGRID_API_KEY=your_key_here
SENDGRID_FROM_EMAIL=noreply@zakatspp.com

TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

---

### **Phase 2: Backend Microservices** (Weeks 4-7)
**Goal**: Complete all backend services with full functionality

#### Week 4: Core Services (Asset Management & Zakat Calculation)
**Priority**: HIGH | **Effort**: 40 hours

**Tasks**:
1. **Asset Management Service** (20 hours)
   - Complete `backend/AssetManagementService/src/index.ts`
   - **Routes**:
     - POST `/api/assets` - Create asset
     - GET `/api/assets/:userId` - Get user assets
     - GET `/api/assets/:id` - Get asset by ID
     - PUT `/api/assets/:id` - Update asset
     - DELETE `/api/assets/:id` - Delete asset
     - GET `/api/assets/:userId/summary` - Get portfolio summary
   - Add Joi validation for all inputs
   - Integrate with CreateAssetUseCase
   - Add authentication middleware
   - Add rate limiting
   - Write API tests

2. **Zakat Calculation Service** (20 hours)
   - Complete `backend/ZakatCalculationService/src/index.ts`
   - **Routes**:
     - POST `/api/calculate` - Calculate zakat
     - GET `/api/nisab/current` - Get current nisab threshold
     - GET `/api/nisab/historical` - Get historical nisab
     - POST `/api/calculate/preview` - Preview calculation
   - Integrate with CalculateZakatUseCase
   - Integrate with ZakatCalculationService (domain)
   - Add comprehensive logging
   - Write calculation accuracy tests

**Deliverables**:
- ✅ Asset Management Service fully functional
- ✅ Zakat Calculation Service fully functional
- ✅ API documentation (Swagger)
- ✅ Integration tests passing

---

#### Week 5: User & Reminder Services
**Priority**: HIGH | **Effort**: 40 hours

**Tasks**:
1. **User Management Service** (20 hours)
   - Create `backend/UserManagementService/src/index.ts`
   - **Routes**:
     - POST `/api/users/register` - Register user
     - POST `/api/users/login` - Login
     - POST `/api/users/logout` - Logout
     - GET `/api/users/profile` - Get profile
     - PUT `/api/users/profile` - Update profile
     - PUT `/api/users/preferences` - Update preferences
     - POST `/api/users/forgot-password` - Password reset
     - POST `/api/users/verify-email` - Email verification
   - Implement authentication middleware
   - Add input validation
   - Write user management tests

2. **Reminder Service** (20 hours)
   - Create `backend/ReminderService/src/index.ts`
   - **Routes**:
     - POST `/api/reminders` - Create reminder
     - GET `/api/reminders/:userId` - Get user reminders
     - PUT `/api/reminders/:id` - Update reminder
     - DELETE `/api/reminders/:id` - Delete reminder
     - POST `/api/reminders/:id/snooze` - Snooze reminder
     - POST `/api/reminders/:id/dismiss` - Dismiss reminder
   - Implement reminder scheduling (node-cron)
   - Integrate with ProcessRemindersUseCase
   - Add notification sending logic
   - Write reminder tests

**Deliverables**:
- ✅ User Management Service functional
- ✅ Reminder Service functional
- ✅ Reminder scheduling working
- ✅ Tests passing

---

#### Week 6: Reports & Educational Content
**Priority**: MEDIUM | **Effort**: 40 hours

**Tasks**:
1. **Reports Service** (20 hours)
   - Create `backend/ReportsService/src/index.ts`
   - **Routes**:
     - GET `/api/reports/annual/:userId/:year` - Annual summary
     - GET `/api/reports/asset-growth/:userId` - Asset growth
     - GET `/api/reports/payment-history/:userId` - Payment history
     - POST `/api/reports/export/pdf` - Export to PDF
     - POST `/api/reports/export/csv` - Export to CSV
   - Integrate with Chart.js for visualizations
   - Use PDFKit for PDF generation
   - Add data aggregation logic
   - Write report generation tests

2. **Educational Content Service** (20 hours)
   - Create `backend/EducationalContentService/src/index.ts`
   - **Routes**:
     - GET `/api/content/articles` - Get all articles
     - GET `/api/content/articles/:id` - Get article
     - GET `/api/content/faqs` - Get FAQs
     - GET `/api/content/videos` - Get videos
     - GET `/api/content/categories` - Get categories
   - Create content management endpoints (admin)
   - Add content search functionality
   - Support multiple languages (i18n)
   - Write content tests

**Deliverables**:
- ✅ Reports Service functional
- ✅ Educational Content Service functional
- ✅ PDF/CSV export working
- ✅ Tests passing

---

#### Week 7: API Gateway & Service Integration
**Priority**: HIGH | **Effort**: 40 hours

**Tasks**:
1. **API Gateway** (30 hours)
   - Create `backend/APIGateway/src/index.ts`
   - **Features**:
     - Route requests to microservices
     - Implement authentication middleware
     - Add rate limiting (express-rate-limit)
     - Add request logging
     - Implement CORS
     - Add health checks for all services
     - Implement circuit breaker pattern
     - Add API versioning
   - **Routes**:
     - `/api/v1/assets/*` → Asset Management Service
     - `/api/v1/zakat/*` → Zakat Calculation Service
     - `/api/v1/users/*` → User Management Service
     - `/api/v1/reminders/*` → Reminder Service
     - `/api/v1/reports/*` → Reports Service
     - `/api/v1/content/*` → Educational Content Service
   - Configure service discovery
   - Add load balancing

2. **Service-to-Service Communication** (10 hours)
   - Add inter-service authentication
   - Implement message queue (RabbitMQ/Redis)
   - Add event publishing/subscribing
   - Handle distributed transactions

**Deliverables**:
- ✅ API Gateway fully functional
- ✅ All services accessible through gateway
- ✅ Service communication working
- ✅ End-to-end tests passing

**Files to Create**:
```
backend/APIGateway/
├── src/
│   ├── index.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── rateLimiter.ts
│   │   ├── cors.ts
│   │   └── logger.ts
│   ├── routes/
│   │   └── gateway.ts
│   └── services/
│       └── serviceRegistry.ts
├── package.json
└── tsconfig.json
```

---

### **Phase 3: Mobile Application** (Weeks 8-13)
**Goal**: Build full-featured React Native mobile app

#### Week 8: React Native Setup & Navigation
**Priority**: HIGH | **Effort**: 40 hours

**Tasks**:
1. **Initialize React Native Project** (8 hours)
   ```bash
   cd src/Presentation/Mobile
   npx react-native init ZakatCalculatorApp --template react-native-template-typescript
   ```
   - Configure TypeScript
   - Install dependencies (React Navigation, Redux Toolkit, Axios)
   - Set up folder structure
   - Configure ESLint and Prettier

2. **Navigation Setup** (12 hours)
   - Install React Navigation
   - Create stack navigator
   - Create tab navigator
   - **Screens**:
     - SplashScreen
     - OnboardingScreen
     - LoginScreen
     - RegisterScreen
     - DashboardScreen (Tab)
     - AssetsScreen (Tab)
     - CalculatorScreen (Tab)
     - RemindersScreen (Tab)
     - ReportsScreen (Tab)
     - SettingsScreen (Tab)
     - LearnScreen (Tab)
   - Add authentication flow
   - Configure deep linking

3. **State Management** (10 hours)
   - Set up Redux Toolkit
   - Create slices:
     - authSlice
     - assetsSlice
     - zakatSlice
     - remindersSlice
     - userSlice
   - Configure Redux Persist
   - Add middleware

4. **API Integration Layer** (10 hours)
   - Create Axios instance
   - Add interceptors (auth token, error handling)
   - Create API service files:
     - authApi.ts
     - assetsApi.ts
     - zakatApi.ts
     - remindersApi.ts
     - reportsApi.ts
     - contentApi.ts

**Deliverables**:
- ✅ React Native project initialized
- ✅ Navigation working
- ✅ State management configured
- ✅ API layer ready

---

#### Weeks 9-11: Core Screens & Features (120 hours total)

**Week 9: Authentication & Dashboard** (40 hours)
1. **Authentication Screens** (20 hours)
   - Login screen with email/password
   - Register screen with validation
   - Forgot password screen
   - Biometric authentication (Face ID/Fingerprint)
   - Email verification

2. **Dashboard Screen** (20 hours)
   - Total wealth display
   - Nisab threshold comparison
   - Zakat amount due
   - Next zakat due date
   - Quick actions
   - Asset summary cards
   - Charts (wealth over time)

**Week 10: Assets & Calculator** (40 hours)
1. **Assets Screen** (20 hours)
   - Asset list with cards
   - Add asset form
   - Edit asset form
   - Delete asset (with confirmation)
   - Asset type icons
   - Filter/sort options
   - Search functionality

2. **Zakat Calculator Screen** (20 hours)
   - Total zakatable wealth calculation
   - Asset breakdown
   - Liability deduction display
   - Nisab threshold comparison
   - Calculation methodology selector
   - Detailed calculation breakdown
   - Save/share calculation

**Week 11: Reminders & Reports** (40 hours)
1. **Reminders Screen** (20 hours)
   - Reminder list
   - Add reminder form
   - Edit reminder
   - Snooze functionality
   - Dismiss reminder
   - Reminder history
   - Notification preferences

2. **Reports Screen** (20 hours)
   - Annual summary
   - Asset growth charts
   - Payment history
   - Export to PDF/CSV
   - Visual analytics
   - Shareable reports

---

#### Week 12: Settings & Educational Content (40 hours)

1. **Settings Screen** (20 hours)
   - Profile management
   - Currency preference
   - Madhab preference
   - Nisab calculation method
   - Language selection
   - Theme (light/dark mode)
   - Notification settings
   - Privacy settings
   - Security (biometric, PIN)
   - Data backup/restore
   - Local-only storage option

2. **Learn Screen** (20 hours)
   - Article list
   - Article detail view
   - FAQ section
   - Video tutorials
   - Category filtering
   - Search functionality
   - Bookmark articles
   - Share content

---

#### Week 13: UI/UX Polish & Offline Support (40 hours)

1. **UI Components Library** (15 hours)
   - Create reusable components:
     - CustomButton
     - CustomInput
     - AssetCard
     - ReminderCard
     - ZakatSummaryCard
     - LoadingSpinner
     - ErrorBoundary
     - ModalDialog
   - Add Islamic design elements
   - Implement dark mode
   - RTL support for Arabic

2. **Offline Support** (15 hours)
   - Implement offline-first architecture
   - Cache API responses
   - Queue offline actions
   - Sync when online
   - Show offline indicator

3. **Testing & Bug Fixes** (10 hours)
   - Test on iOS and Android
   - Fix UI bugs
   - Performance optimization
   - Memory leak fixes

**Deliverables**:
- ✅ Complete mobile app
- ✅ All screens functional
- ✅ Offline support working
- ✅ UI polished and responsive

---

### **Phase 4: Testing & Quality Assurance** (Weeks 14-15)
**Goal**: Ensure code quality and reliability

#### Week 14: Backend Testing (40 hours)
1. **Unit Tests** (20 hours)
   - Test all use cases
   - Test domain services
   - Test repositories
   - Achieve 80%+ code coverage

2. **Integration Tests** (15 hours)
   - Test API endpoints
   - Test database operations
   - Test external API integrations

3. **E2E Tests** (5 hours)
   - Test complete user flows
   - Test microservice communication

#### Week 15: Mobile Testing (40 hours)
1. **Component Tests** (15 hours)
   - Test React components
   - Test Redux slices
   - Test API services

2. **Integration Tests** (10 hours)
   - Test screen flows
   - Test navigation
   - Test state management

3. **E2E Tests** (10 hours)
   - Use Detox for E2E testing
   - Test critical user journeys
   - Test on real devices

4. **Security Testing** (5 hours)
   - Penetration testing
   - Vulnerability scanning
   - Data encryption verification

---

### **Phase 5: Deployment & Launch** (Weeks 16-17)
**Goal**: Deploy to production and launch app

#### Week 16: DevOps & CI/CD (40 hours)
1. **CI/CD Pipeline** (20 hours)
   - Set up GitHub Actions
   - Automated testing
   - Automated building
   - Docker image creation
   - Deployment automation

2. **Cloud Infrastructure** (20 hours)
   - Set up AWS/Azure/GCP
   - Configure MongoDB Atlas
   - Configure Redis Cloud
   - Set up load balancer
   - Configure CDN
   - Set up monitoring (Datadog/New Relic)
   - Configure logging (ELK stack)

#### Week 17: App Store Submission (40 hours)
1. **iOS App Store** (20 hours)
   - Create app listing
   - Prepare screenshots
   - Write app description
   - Submit for review
   - Handle review feedback

2. **Google Play Store** (20 hours)
   - Create app listing
   - Prepare screenshots
   - Write app description
   - Submit for review
   - Handle review feedback

---

## 📊 Resource Requirements

### Development Team (Recommended)
- **Backend Developer** (1-2 developers)
- **Mobile Developer** (1-2 developers)
- **DevOps Engineer** (1 developer)
- **QA Engineer** (1 tester)
- **Islamic Scholar** (consultant for zakat calculations)

### Infrastructure Costs (Monthly)
- **Cloud Hosting**: $100-300
- **Database (MongoDB Atlas)**: $50-100
- **Redis Cache**: $20-50
- **API Services**: $50-100
- **Notification Services**: $20-50
- **Monitoring/Logging**: $50-100
- **Total**: ~$290-700/month

### API Keys Needed
- ✅ Gold/Silver Price API
- ✅ Cryptocurrency Price API
- ✅ Currency Conversion API
- ✅ Hijri Calendar API
- ✅ Firebase Cloud Messaging
- ✅ Email Service (SendGrid/AWS SES)
- ✅ SMS Service (Twilio/AWS SNS)

---

## 🎯 Success Metrics

### Development Metrics
- **Code Coverage**: >80%
- **Build Success Rate**: >95%
- **API Response Time**: <500ms
- **Mobile App Size**: <50MB
- **Crash Rate**: <1%

### Business Metrics
- **User Acquisition**: 10,000 users in first 6 months
- **Daily Active Users**: 30%+
- **User Retention (30-day)**: 60%+
- **App Store Rating**: 4.5+ stars
- **Zakat Payments Facilitated**: Track and report

---

## 🚀 Quick Start Commands

### Setup Development Environment
```bash
# Clone repository
git clone <repo-url>
cd "Zakat Calculator and Reminder App"

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your API keys

# Start Docker services
npm run docker:up

# Build all projects
npm run build

# Run tests
npm test
```

### Start Backend Services
```bash
# Start all microservices
npm run backend:dev

# Or start individual services
cd backend/AssetManagementService && npm run dev
cd backend/ZakatCalculationService && npm run dev
```

### Start Mobile App
```bash
# Navigate to mobile app
cd src/Presentation/Mobile/ZakatCalculatorApp

# Install dependencies
npm install

# iOS
npm run ios

# Android
npm run android
```

---

## 📈 Progress Tracking

| Phase | Status | Start Date | End Date | Progress |
|-------|--------|------------|----------|----------|
| Phase 1: Infrastructure | ⏳ Not Started | Week 1 | Week 3 | 0% |
| Phase 2: Backend Services | ⏳ Not Started | Week 4 | Week 7 | 0% |
| Phase 3: Mobile App | ⏳ Not Started | Week 8 | Week 13 | 0% |
| Phase 4: Testing | ⏳ Not Started | Week 14 | Week 15 | 0% |
| Phase 5: Deployment | ⏳ Not Started | Week 16 | Week 17 | 0% |

---

## 🎓 Learning Resources

### Clean Architecture
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design by Eric Evans](https://www.domainlanguagecom/ddd/)

### React Native
- [Official React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Islamic Finance
- [Zakat Calculation Guide](https://www.islamicfinanceguru.com/investment/what-is-zakat/)
- Consult with qualified Islamic scholars for accuracy

---

## ⚠️ Important Notes

1. **Security First**: Always encrypt sensitive data
2. **Islamic Compliance**: Verify all calculations with scholars
3. **Testing**: Write tests alongside code, not after
4. **Documentation**: Update docs as you build
5. **Code Reviews**: Have peer reviews for critical code
6. **Performance**: Monitor and optimize regularly
7. **User Privacy**: Follow GDPR and data privacy laws

---

## 🤝 Get Support

- **Technical Issues**: Check `docs/ARCHITECTURE.md`
- **Setup Help**: See `GETTING_STARTED.md`
- **Contributing**: Read `CONTRIBUTING.md`
- **Questions**: Create GitHub issues

---

**May Allah bless this project and make it beneficial for Muslims worldwide. Ameen.**

---

**Last Updated**: October 18, 2025  
**Next Review**: Weekly during active development
