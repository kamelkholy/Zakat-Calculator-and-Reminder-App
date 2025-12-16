# Zakat Calculator - Monolithic Architecture

## Project Structure

```
zakat-calculator/
├── backend/                    # Node.js/Express Backend API
│   ├── config/                 # Configuration files
│   ├── models/                 # Database models (MongoDB)
│   │   ├── User.js
│   │   ├── MoneyAsset.js
│   │   ├── StockAsset.js
│   │   ├── PreciousMetalAsset.js
│   │   └── Reminder.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── assets.js
│   │   ├── zakat.js
│   │   └── reminders.js
│   ├── services/               # Business logic services
│   │   ├── zakatCalculation.js
│   │   ├── reminderService.js
│   │   └── priceService.js
│   ├── middleware/             # Express middleware
│   ├── utils/                  # Helper functions
│   └── server.js               # Main server file
│
├── mobile/                     # React Native Mobile App
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── screens/            # App screens
│   │   │   ├── HomeScreen.js
│   │   │   ├── AssetsScreen.js
│   │   │   ├── CalculateScreen.js
│   │   │   └── RemindersScreen.js
│   │   ├── services/           # API client
│   │   ├── store/              # State management (Redux/Context)
│   │   ├── navigation/         # Navigation setup
│   │   └── App.js
│   └── package.json
│
├── shared/                     # Shared code between backend and mobile
│   ├── constants.js
│   └── types.js
│
└── package.json                # Root package.json
```

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Validation:** Joi
- **API Documentation:** Swagger

### Mobile
- **Framework:** React Native
- **State Management:** Redux Toolkit
- **Navigation:** React Navigation
- **HTTP Client:** Axios
- **UI Components:** React Native Paper

### Services
- **Price API:** Gold/Silver/Crypto prices
- **Calendar:** Hijri date conversion
- **Notifications:** Firebase Cloud Messaging

## API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Assets
- `GET /api/assets` - Get all user assets
- `POST /api/assets/money` - Create money asset
- `POST /api/assets/stock` - Create stock asset
- `POST /api/assets/precious-metal` - Create precious metal asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Zakat Calculation
- `POST /api/zakat/calculate` - Calculate zakat
- `GET /api/zakat/nisab` - Get current nisab threshold

### Reminders
- `GET /api/reminders` - Get user reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

## Database Collections

1. **users** - User accounts
2. **money_assets** - Cash, bank accounts, etc.
3. **stock_assets** - Stocks and shares
4. **precious_metal_assets** - Gold and silver
5. **reminders** - Zakat reminders

## Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Mobile Setup
```bash
cd mobile
npm install
npx react-native run-android  # or run-ios
```
