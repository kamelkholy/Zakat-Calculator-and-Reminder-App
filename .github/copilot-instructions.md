# Zakat Calculator and Reminder App - Copilot Instructions

## Project Overview
This is a mobile application that helps Muslims calculate zakat obligations on their assets and receive timely reminders when assets become eligible for zakat payment.

## Architecture
This project follows **Clean Architecture** principles with clear separation of concerns:

### Layer Structure
- **Domain Layer**: Core business logic, entities, value objects, domain services
- **Application Layer**: Use cases, application services, DTOs, interfaces
- **Infrastructure Layer**: Data access, external APIs, notification services, persistence
- **Presentation Layer**: Mobile UI (React Native), API controllers

### Key Bounded Contexts
1. **Asset Management**: Track various asset types (cash, gold, investments, crypto, etc.)
2. **Zakat Calculation**: Calculate zakat based on nisab thresholds and hawl completion
3. **Reminder System**: Schedule and send notifications for zakat obligations
4. **User Management**: Authentication, profiles, preferences
5. **Reports & Analytics**: Generate reports, visualizations, exports
6. **Educational Content**: Manage and deliver Islamic resources

## Technology Stack
- **Mobile Frontend**: React Native (TypeScript)
- **Backend**: Node.js with Express (microservices architecture)
- **Database**: MongoDB with encryption
- **APIs**: Gold/silver prices, currency conversion, crypto prices, Hijri calendar
- **Notifications**: Firebase Cloud Messaging
- **Authentication**: JWT with biometric support

## Development Guidelines
1. **Domain-Driven Design**: Use aggregates, entities, value objects appropriately
2. **Dependency Inversion**: All dependencies point inward toward the domain
3. **SOLID Principles**: Follow single responsibility, open/closed, etc.
4. **Islamic Compliance**: Ensure accurate zakat calculations following Islamic principles
5. **Security First**: Encrypt financial data, implement secure authentication
6. **Privacy**: Support local-only storage option, no unnecessary data collection

## Coding Standards
- Use TypeScript for type safety
- Follow functional programming patterns where applicable
- Write unit tests for domain logic and use cases
- Document complex business rules with references to Islamic sources
- Use meaningful names reflecting Islamic terminology (hawl, nisab, zakatable, etc.)

## API Integrations
- Gold/Silver prices (live market data)
- Currency conversion rates
- Cryptocurrency prices
- Hijri calendar calculations
- Push notification services

## Security Considerations
- End-to-end encryption for financial data
- Biometric authentication support
- Secure token management
- Regular security audits
- GDPR compliance
