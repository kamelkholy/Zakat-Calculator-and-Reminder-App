# ⚡ Immediate Next Steps - Start Here!

## 🎯 Your Current Situation

You have a **complete clean architecture foundation** for your Zakat Calculator app. Now it's time to make it functional!

**What's Done**: ✅ Domain Layer, ✅ Application Layer, ✅ Project Structure  
**What's Next**: ⏳ Infrastructure Implementation

---

## 🚀 Action Plan for This Week

### **Step 1: Environment Setup** (30 minutes)

1. **Install Node.js dependencies**:
```powershell
# From project root
npm install
```

2. **Set up environment variables**:
```powershell
# Copy the example file
Copy-Item .env.example .env

# Edit .env file with your settings
notepad .env
```

3. **Start MongoDB and Redis** (using Docker):
```powershell
# Start all services
npm run docker:up

# Verify services are running
docker ps
```

**Expected Output**: MongoDB on port 27017, Redis on port 6379

---

### **Step 2: Create First Infrastructure Implementation** (2-3 hours)

Let's implement the **AssetRepository** first as it's fundamental to the app.

#### **File to Create**: `src/Infrastructure/Persistence/AssetRepository.ts`

**What it does**:
- Connects domain layer to MongoDB
- Implements `IAssetRepository` interface
- Handles CRUD operations for assets
- Encrypts sensitive financial data

**Start with this code template**:
```typescript
import { IAssetRepository } from '../../Domain/Interfaces/IAssetRepository';
import { Asset } from '../../Domain/Entities/Asset';
import { AssetModel } from './models/AssetModel';
import { EncryptionService } from '../Security/EncryptionService';

export class AssetRepository implements IAssetRepository {
  constructor(private encryptionService: EncryptionService) {}

  async findById(id: string): Promise<Asset | null> {
    // Implementation here
  }

  async findByUserId(userId: string): Promise<Asset[]> {
    // Implementation here
  }

  async save(asset: Asset): Promise<Asset> {
    // Implementation here
  }

  async update(asset: Asset): Promise<Asset> {
    // Implementation here
  }

  async delete(id: string): Promise<void> {
    // Implementation here
  }
}
```

---

### **Step 3: Test Your Implementation** (1 hour)

Create a simple test file:

**File**: `tests/unit/Infrastructure/AssetRepository.test.ts`

```typescript
import { AssetRepository } from '../../../src/Infrastructure/Persistence/AssetRepository';
import { EncryptionService } from '../../../src/Infrastructure/Security/EncryptionService';
import { Asset } from '../../../src/Domain/Entities/Asset';

describe('AssetRepository', () => {
  let repository: AssetRepository;

  beforeAll(async () => {
    // Set up test database connection
  });

  test('should save and retrieve an asset', async () => {
    // Test implementation
  });
});
```

Run tests:
```powershell
npm test
```

---

### **Step 4: Integrate with Backend Service** (1-2 hours)

Update **Asset Management Service** to use the new repository:

**File**: `backend/AssetManagementService/src/index.ts`

Add route handlers that use `CreateAssetUseCase`:

```typescript
import { CreateAssetUseCase } from '../../../src/Application/UseCases/CreateAssetUseCase';
import { AssetRepository } from '../../../src/Infrastructure/Persistence/AssetRepository';

// Initialize repository
const assetRepository = new AssetRepository(encryptionService);
const createAssetUseCase = new CreateAssetUseCase(assetRepository, hijriService);

// POST /api/assets
app.post('/api/assets', async (req, res) => {
  try {
    const result = await createAssetUseCase.execute(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

---

### **Step 5: Manual Testing** (30 minutes)

Test the API using curl or Postman:

```powershell
# Create an asset
Invoke-RestMethod -Method POST -Uri "http://localhost:3001/api/assets" `
  -ContentType "application/json" `
  -Body '{"userId":"user123","type":"CASH","amount":5000,"currency":"USD"}'
```

---

## 📋 Detailed Implementation Checklist

### Week 1: Database Layer
- [ ] Create `src/Infrastructure/Persistence/DatabaseConnection.ts`
- [ ] Create `src/Infrastructure/Persistence/models/AssetModel.ts`
- [ ] Create `src/Infrastructure/Persistence/AssetRepository.ts`
- [ ] Create `src/Infrastructure/Persistence/UserRepository.ts`
- [ ] Create `src/Infrastructure/Persistence/ReminderRepository.ts`
- [ ] Create `src/Infrastructure/Persistence/LiabilityRepository.ts`
- [ ] Write unit tests for all repositories
- [ ] Test database operations manually

### Week 2: External APIs
- [ ] Create `src/Infrastructure/ExternalAPIs/BaseApiClient.ts`
- [ ] Create `src/Infrastructure/ExternalAPIs/GoldSilverPriceClient.ts`
- [ ] Create `src/Infrastructure/ExternalAPIs/CryptoPriceClient.ts`
- [ ] Create `src/Infrastructure/ExternalAPIs/CurrencyConversionClient.ts`
- [ ] Create `src/Infrastructure/ExternalAPIs/HijriCalendarClient.ts`
- [ ] Set up Redis caching for API responses
- [ ] Test API integrations
- [ ] Add error handling and retry logic

### Week 3: Security & Notifications
- [ ] Create `src/Infrastructure/Security/JwtAuthService.ts`
- [ ] Create `src/Infrastructure/Security/EncryptionService.ts`
- [ ] Create `src/Infrastructure/Security/PasswordHashService.ts`
- [ ] Create `src/Infrastructure/Notifications/FirebaseNotificationService.ts`
- [ ] Create `src/Infrastructure/Notifications/EmailNotificationService.ts`
- [ ] Create `src/Infrastructure/Notifications/SmsNotificationService.ts`
- [ ] Set up Firebase project
- [ ] Test notification sending

---

## 🔧 Required Tools & Accounts

### Development Tools (Install if not already)
- [x] Node.js (v18+)
- [x] npm or yarn
- [x] Docker Desktop
- [x] Visual Studio Code
- [ ] MongoDB Compass (optional, for database viewing)
- [ ] Postman or Insomnia (for API testing)

### API Keys to Obtain

1. **Gold/Silver Prices**:
   - Option 1: [metals-api.com](https://metals-api.com/) (Free tier: 50 requests/month)
   - Option 2: [goldapi.io](https://www.goldapi.io/) (Free tier: 100 requests/month)

2. **Cryptocurrency Prices**:
   - Option 1: [CoinGecko API](https://www.coingecko.com/en/api) (Free, no key required)
   - Option 2: [CoinMarketCap](https://coinmarketcap.com/api/) (Free tier: 333 requests/day)

3. **Currency Conversion**:
   - Option 1: [exchangerate-api.com](https://www.exchangerate-api.com/) (Free tier: 1,500 requests/month)
   - Option 2: [fixer.io](https://fixer.io/) (Free tier: 100 requests/month)

4. **Hijri Calendar**:
   - Option 1: [Aladhan API](https://aladhan.com/hijri-gregorian-converter-api) (Free, no key)
   - Option 2: [IslamicFinder API](https://www.islamicfinder.org/api-docs/)

5. **Firebase Cloud Messaging**:
   - Create project at [Firebase Console](https://console.firebase.google.com/)
   - Download `serviceAccountKey.json`

6. **Email Service** (Choose one):
   - [SendGrid](https://sendgrid.com/) (Free tier: 100 emails/day)
   - [AWS SES](https://aws.amazon.com/ses/) (Free tier: 62,000 emails/month)

7. **SMS Service** (Optional):
   - [Twilio](https://www.twilio.com/) (Trial credits available)
   - [AWS SNS](https://aws.amazon.com/sns/)

---

## 📝 Example `.env` File

```env
# Database
MONGODB_URI=mongodb://localhost:27017/zakat-calculator
MONGODB_DB_NAME=zakat-calculator

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d

# Encryption
ENCRYPTION_KEY=your-32-character-encryption-key-here

# API Keys
GOLD_PRICE_API_KEY=your_metals_api_key
GOLD_PRICE_API_URL=https://api.metals.live/v1/spot

CRYPTO_PRICE_API_KEY=your_coingecko_key (optional)
CRYPTO_PRICE_API_URL=https://api.coingecko.com/api/v3

CURRENCY_API_KEY=your_exchangerate_api_key
CURRENCY_API_URL=https://v6.exchangerate-api.com/v6

HIJRI_CALENDAR_API_URL=https://api.aladhan.com/v1

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n"

# Email
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@zakatcalculator.com

# SMS (Optional)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Environment
NODE_ENV=development
PORT=3000
```

---

## 🎓 Learning Resources for This Week

### MongoDB with TypeScript
- [Mongoose TypeScript Guide](https://mongoosejs.com/docs/typescript.html)
- [MongoDB Best Practices](https://www.mongodb.com/developer/products/mongodb/schema-design-anti-pattern-summary/)

### Repository Pattern
- [Repository Pattern Explained](https://deviq.com/design-patterns/repository-pattern)
- [Clean Architecture Repositories](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### Testing
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

## 💡 Tips for Success

### 1. **Start Small**
Don't try to implement everything at once. Focus on one repository or service at a time.

### 2. **Test as You Go**
Write tests immediately after implementing each component. Don't wait until the end.

### 3. **Use the Domain Layer**
Your domain entities and services are already complete. Just wrap them with infrastructure implementations.

### 4. **Follow the Dependency Rule**
Infrastructure → Application → Domain. Never let Domain depend on Infrastructure.

### 5. **Encrypt Sensitive Data**
Always encrypt financial information (asset values, account numbers, etc.).

### 6. **Handle Errors Gracefully**
Add try-catch blocks and meaningful error messages.

### 7. **Log Everything**
Use a logging library (Winston or Pino) to track operations.

---

## 🆘 Troubleshooting Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure Docker is running and MongoDB container is started:
```powershell
docker ps
npm run docker:up
```

### TypeScript Compilation Errors
```
Cannot find module '@/Domain/...'
```
**Solution**: Check `tsconfig.json` path mappings and rebuild:
```powershell
npm run build
```

### Missing Dependencies
```
Module not found: mongoose
```
**Solution**: Install dependencies:
```powershell
npm install
```

---

## ✅ Daily Progress Checklist

### Day 1: Setup
- [ ] Install all dependencies
- [ ] Configure `.env` file
- [ ] Start Docker services
- [ ] Verify MongoDB connection

### Day 2: First Repository
- [ ] Create AssetModel
- [ ] Implement AssetRepository
- [ ] Write repository tests
- [ ] Test manually with MongoDB Compass

### Day 3: Complete Repositories
- [ ] Implement UserRepository
- [ ] Implement ReminderRepository
- [ ] Implement LiabilityRepository
- [ ] Run all tests

### Day 4: API Clients Setup
- [ ] Create BaseApiClient
- [ ] Obtain API keys
- [ ] Test API connections
- [ ] Set up Redis caching

### Day 5: Gold/Crypto Prices
- [ ] Implement GoldSilverPriceClient
- [ ] Implement CryptoPriceClient
- [ ] Test price fetching
- [ ] Verify caching works

---

## 🎯 Success Criteria for Week 1

By end of Week 1, you should have:
- ✅ All repository implementations complete
- ✅ Database connection working
- ✅ CRUD operations functional
- ✅ Unit tests passing (>80% coverage)
- ✅ Manual testing successful
- ✅ Data encryption working

---

## 📞 Next Steps After Week 1

Once you complete the infrastructure layer:
1. **Review**: `IMPLEMENTATION_ROADMAP.md` for Week 2 tasks
2. **Start**: External API integrations
3. **Continue**: Following the 17-week plan

---

## 🤝 Getting Help

If you get stuck:
1. Check `docs/ARCHITECTURE.md` for patterns
2. Review existing domain layer code for reference
3. Check `GETTING_STARTED.md` for setup help
4. Search Stack Overflow for specific errors
5. Create GitHub issues for bugs

---

**Remember**: You're building a tool to help Muslims fulfill their religious obligation. Take your time, do it right, and may Allah bless your efforts!

**Start now**: Begin with Step 1 above! 🚀

---

**Created**: October 18, 2025  
**Last Updated**: October 18, 2025  
**Next Review**: After Week 1 completion
