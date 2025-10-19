# Zakat Calculator App - Clean Architecture Implementation Guide

## Overview

This document provides a comprehensive guide to the clean architecture implementation of the Zakat Calculator and Reminder App. The project structure follows Domain-Driven Design (DDD) principles with clear separation between layers.

## Architecture Layers

### 1. Domain Layer (Core Business Logic)
**Location**: `src/Domain/`

The domain layer contains the core business logic and is completely independent of any external frameworks or libraries.

#### Entities
- **Asset**: Represents a zakatable asset with value, type, acquisition date, and hawl tracking
- **User**: Represents application user with preferences and notification settings
- **Reminder**: Represents zakat reminders with scheduling and status
- **Liability**: Represents debts that reduce zakatable wealth

#### Value Objects
- **Money**: Immutable monetary value with currency
- **HijriDate**: Islamic calendar date representation
- **AssetType**: Type classification for assets
- **Currency**: ISO 4217 currency codes
- **NisabCalculationMethod**: Gold or silver-based nisab calculation

#### Aggregates
- **UserPortfolio**: Aggregate root managing user's complete financial portfolio

#### Domain Services
- **ZakatCalculationService**: Core zakat calculation logic
- **ReminderService**: Reminder creation and management logic

#### Interfaces (Ports)
- **IAssetRepository**: Asset persistence interface
- **IUserRepository**: User persistence interface
- **IReminderRepository**: Reminder persistence interface
- **ILiabilityRepository**: Liability persistence interface
- **IPriceService**: External price data interface
- **IHijriCalendarService**: Hijri calendar operations interface
- **INotificationService**: Notification delivery interface

### 2. Application Layer (Use Cases)
**Location**: `src/Application/`

The application layer orchestrates the flow of data between the domain and infrastructure layers.

#### Use Cases Implemented
- **CreateAssetUseCase**: Create new asset
- **CalculateZakatUseCase**: Calculate zakat obligations
- **CreateUserUseCase**: Register new user
- **ProcessRemindersUseCase**: Process and send due reminders

#### DTOs (Data Transfer Objects)
- **AssetDtos**: Asset creation, update, and response
- **UserDtos**: User registration, update, login
- **ZakatCalculationDtos**: Zakat calculation request and response
- **ReminderDtos**: Reminder management
- **LiabilityDtos**: Liability management

### 3. Infrastructure Layer (External Concerns)
**Location**: `src/Infrastructure/`

The infrastructure layer implements the interfaces defined in the domain layer.

#### Planned Implementations
- **Persistence**: MongoDB repositories
- **ExternalAPIs**: Gold/silver prices, currency conversion, crypto prices, Hijri calendar
- **Notifications**: Firebase Cloud Messaging, email (SendGrid), SMS (Twilio)
- **Security**: JWT authentication, encryption, biometric support

### 4. Presentation Layer (UI)
**Location**: `src/Presentation/Mobile/`

The presentation layer contains the React Native mobile application.

#### Planned Structure
- **screens/**: App screens (Dashboard, Assets, Calculator, Reminders, Reports, Settings)
- **components/**: Reusable UI components
- **navigation/**: Navigation configuration

## Backend Microservices

### Services Architecture
The backend is organized as microservices, each handling a specific bounded context:

1. **AssetManagementService** (Port: 3001)
   - Asset CRUD operations
   - Asset value updates
   - Asset categorization

2. **ZakatCalculationService** (Port: 3002)
   - Zakat calculations
   - Nisab threshold determination
   - Batch calculations

3. **ReminderService** (Port: 3003)
   - Reminder scheduling
   - Reminder delivery
   - Reminder status management

4. **UserManagementService** (Port: 3004)
   - User authentication
   - User profile management
   - Preference management

5. **ReportsService** (Port: 3005)
   - Report generation
   - Analytics
   - Export functionality

6. **EducationalContentService** (Port: 3006)
   - Content management
   - Resource delivery

7. **APIGateway** (Port: 3000)
   - Request routing
   - Authentication middleware
   - Rate limiting

## Key Design Decisions

### 1. Dependency Rule
All dependencies point inward. The domain layer has no dependencies on other layers. This ensures the core business logic remains pure and testable.

### 2. Interface Segregation
Each service interface is focused and minimal, implementing only the methods required by specific use cases.

### 3. Aggregate Boundaries
**UserPortfolio** is the aggregate root that manages consistency boundaries for assets and liabilities belonging to a user.

### 4. Value Object Immutability
All value objects are immutable. Changes create new instances rather than modifying existing ones.

### 5. Domain Events (Future Enhancement)
Consider implementing domain events for:
- Asset created/updated
- Zakat calculated
- Reminder sent
- User registered

## Data Flow Example

### Calculating Zakat Flow

```
Mobile App (Presentation)
  ↓
CalculateZakatUseCase (Application)
  ↓
ZakatCalculationService (Domain)
  ↓
IAssetRepository, IPriceService (Domain Interfaces)
  ↓
MongoAssetRepository, GoldPriceAPI (Infrastructure)
```

### Creating an Asset Flow

```
Mobile App (Presentation)
  ↓
CreateAssetUseCase (Application)
  ↓
Asset Entity (Domain)
  ↓
IAssetRepository (Domain Interface)
  ↓
MongoAssetRepository (Infrastructure)
```

## Testing Strategy

### Unit Tests
- Domain entities and value objects
- Domain services
- Use cases (with mocked repositories)

### Integration Tests
- Repository implementations
- External API integrations
- End-to-end use case flows

### E2E Tests
- Mobile app user flows
- API endpoint testing

## Implementation Priorities

### Phase 1: Foundation (Current Status)
✅ Domain layer entities and value objects
✅ Domain services
✅ Domain interfaces
✅ Application DTOs
✅ Core use cases
✅ Project structure
✅ Configuration files

### Phase 2: Infrastructure (Next)
⏳ MongoDB repository implementations
⏳ External API integrations
⏳ Authentication service
⏳ Notification service

### Phase 3: Mobile App
⏳ React Native setup
⏳ Core screens
⏳ Navigation
⏳ State management
⏳ API integration

### Phase 4: Backend Services
⏳ Implement all microservices
⏳ API Gateway
⏳ Service-to-service communication
⏳ Docker deployment

## Development Guidelines

### Naming Conventions
- Entities: PascalCase (e.g., `Asset`, `User`)
- Value Objects: PascalCase (e.g., `Money`, `HijriDate`)
- Interfaces: IPrefixPascalCase (e.g., `IAssetRepository`)
- Use Cases: PascalCase with UseCase suffix (e.g., `CreateAssetUseCase`)
- DTOs: PascalCase with Dto suffix (e.g., `CreateAssetDto`)

### Code Organization
- One class per file
- Group related files in directories
- Use index files for public API exports

### Error Handling
- Domain layer throws domain-specific exceptions
- Application layer catches and transforms to DTOs
- Infrastructure layer handles technical errors

### Validation
- Domain entities validate business rules
- Application layer validates input DTOs
- Use Joi or similar for DTO validation

## Security Considerations

### Data Encryption
- Financial data encrypted at rest
- MongoDB encryption enabled
- Sensitive fields individually encrypted

### Authentication
- JWT tokens for API authentication
- Biometric support in mobile app
- Refresh token rotation

### Authorization
- Role-based access control (future)
- Resource ownership validation
- API rate limiting

## Performance Optimization

### Caching Strategy
- Redis for frequently accessed data
- Nisab thresholds cached for 1 hour
- User preferences cached

### Database Optimization
- Indexes on frequently queried fields
- Aggregate queries for reports
- Connection pooling

### API Optimization
- Response compression
- Pagination for list endpoints
- GraphQL for flexible queries (future)

## Monitoring and Logging

### Application Logging
- Structured JSON logs
- Log levels: ERROR, WARN, INFO, DEBUG
- Correlation IDs for request tracking

### Metrics
- Request latency
- Error rates
- Active users
- Calculation frequency

### Alerting
- Database connection failures
- External API failures
- High error rates
- Security incidents

## Next Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Implement Infrastructure Layer**
   - Start with repository implementations
   - Implement external API clients
   - Set up authentication

4. **Implement Backend Services**
   - Complete each microservice
   - Set up API Gateway
   - Configure Docker

5. **Implement Mobile App**
   - Initialize React Native project
   - Create core screens
   - Integrate with backend APIs

6. **Testing**
   - Write unit tests for domain logic
   - Integration tests for repositories
   - E2E tests for critical flows

7. **Deployment**
   - Set up CI/CD pipeline
   - Configure production environment
   - Deploy to cloud platform

## Resources

### Domain-Driven Design
- "Domain-Driven Design" by Eric Evans
- "Implementing Domain-Driven Design" by Vaughn Vernon

### Clean Architecture
- "Clean Architecture" by Robert C. Martin
- "Get Your Hands Dirty on Clean Architecture" by Tom Hombergs

### Islamic Resources
- Zakat calculation methodologies from recognized Islamic scholars
- Hijri calendar systems and conversions
- Nisab threshold standards

## Conclusion

This clean architecture implementation provides a solid foundation for the Zakat Calculator app. The clear separation of concerns ensures:
- **Testability**: Pure business logic easy to test
- **Maintainability**: Changes localized to specific layers
- **Flexibility**: Easy to swap implementations
- **Scalability**: Microservices architecture supports growth

The project is now ready for implementation of the infrastructure layer and mobile application.

---

**For questions or clarifications, refer to the inline code documentation or reach out to the development team.**
