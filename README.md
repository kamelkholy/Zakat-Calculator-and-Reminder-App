# Zakat Calculator - Quick Start Guide

## Project Overview

A monolithic application with:
- **Backend API** (Node.js + Express + MongoDB)
- **Mobile App** (React Native - to be created)
- **Services**: Zakat Calculation & Reminder Management

## Backend Structure Created ✅

```
backend/
├── models/                      # MongoDB schemas
│   ├── User.js                 # User accounts
│   ├── MoneyAsset.js           # Cash, bank accounts
│   ├── StockAsset.js           # Stocks and shares
│   ├── PreciousMetalAsset.js   # Gold and silver
│   └── Reminder.js             # Zakat reminders
├── services/                    # Business logic
│   ├── zakatCalculation.js     # Zakat calculations
│   └── reminderService.js      # Reminder management
├── routes/                      # API endpoints
│   ├── assets.js               # Asset CRUD operations
│   ├── zakat.js                # Zakat calculations
│   └── reminders.js            # Reminder operations
└── server.js                    # Main server file
```

## Setup Instructions

### 1. Install MongoDB

```bash
# Windows (using Chocolatey)
choco install mongodb

# Or download from: https://www.mongodb.com/try/download/community
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your settings
```

### 4. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: http://localhost:3000

## API Endpoints

### Assets
- `GET /api/assets` - Get all user assets
- `POST /api/assets/money` - Create money asset
- `POST /api/assets/stock` - Create stock asset
- `POST /api/assets/precious-metal` - Create precious metal asset
- `PUT /api/assets/:type/:id` - Update asset
- `DELETE /api/assets/:type/:id` - Delete asset

### Zakat
- `GET /api/zakat/nisab` - Get current nisab threshold
- `POST /api/zakat/calculate` - Calculate zakat for all assets
- `POST /api/zakat/payment/:type/:assetId` - Record zakat payment

### Reminders
- `GET /api/reminders` - Get all reminders
- `GET /api/reminders/pending` - Get pending reminders
- `POST /api/reminders/ramadan` - Create Ramadan reminder
- `POST /api/reminders/nisab-alert` - Create nisab alert
- `PUT /api/reminders/:id/sent` - Mark as sent
- `PUT /api/reminders/:id/dismiss` - Dismiss reminder
- `DELETE /api/reminders/:id` - Delete reminder

## Testing the API

### Example: Create Money Asset

```bash
curl -X POST http://localhost:3000/api/assets/money \
  -H "Content-Type: application/json" \
  -H "user-id: YOUR_USER_ID" \
  -d '{
    "name": "Savings Account",
    "assetType": "BANK_ACCOUNT",
    "amount": 10000,
    "currency": "USD",
    "acquisitionDate": {
      "hijriYear": 1445,
      "hijriMonth": 6,
      "hijriDay": 15
    }
  }'
```

### Example: Calculate Zakat

```bash
curl -X POST http://localhost:3000/api/zakat/calculate \
  -H "Content-Type: application/json" \
  -H "user-id": YOUR_USER_ID"
```

## Next Steps

### Mobile App (To Be Created)

1. Create React Native app
2. Create screens for assets, zakat, reminders
3. Connect to backend API
4. Add push notifications

### Additional Features to Implement

- [ ] User authentication (JWT)
- [ ] Real gold/silver price API integration
- [ ] Hijri calendar conversion API
- [ ] Push notifications (Firebase)
- [ ] Export reports to PDF

## Architecture Benefits

✅ **Simple & Straightforward** - Everything in one codebase
✅ **Easy to Understand** - Clear folder structure
✅ **Fast Development** - No complex abstractions
✅ **Monolithic** - Deploy as single unit
