# API Gateway Service

The API Gateway is the single entry point for all client requests to the Zakat Calculator backend microservices.

## Features

- ✅ **Request Routing**: Routes requests to appropriate microservices
- ✅ **Authentication**: JWT-based authentication middleware
- ✅ **Rate Limiting**: Protects against abuse and DDoS attacks
- ✅ **CORS**: Configurable cross-origin resource sharing
- ✅ **Logging**: Request/response logging for monitoring
- ✅ **Error Handling**: Centralized error handling
- ✅ **Security**: Helmet.js for security headers
- ✅ **Health Checks**: Service health monitoring
- ✅ **Service Discovery**: Dynamic service routing

## Architecture

```
Client → API Gateway → Microservices
         (Port 3000)    (Ports 3001-3006)
```

## Routes

### Public Routes (No Authentication)

- `GET /health` - Gateway health check
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/forgot-password` - Password reset
- `GET /api/v1/content/*` - Educational content (public)

### Protected Routes (Authentication Required)

#### User Management
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update profile
- `PUT /api/v1/users/preferences` - Update preferences

#### Asset Management
- `POST /api/v1/assets` - Create asset
- `GET /api/v1/assets/:userId` - Get user assets
- `GET /api/v1/assets/:id` - Get asset by ID
- `PUT /api/v1/assets/:id` - Update asset
- `DELETE /api/v1/assets/:id` - Delete asset

#### Zakat Calculation
- `POST /api/v1/zakat/calculate` - Calculate zakat
- `GET /api/v1/zakat/nisab/current` - Get current nisab
- `GET /api/v1/zakat/nisab/historical` - Get historical nisab

#### Reminders
- `POST /api/v1/reminders` - Create reminder
- `GET /api/v1/reminders/:userId` - Get user reminders
- `PUT /api/v1/reminders/:id` - Update reminder
- `DELETE /api/v1/reminders/:id` - Delete reminder
- `POST /api/v1/reminders/:id/snooze` - Snooze reminder

#### Reports
- `GET /api/v1/reports/annual/:userId/:year` - Annual summary
- `GET /api/v1/reports/asset-growth/:userId` - Asset growth
- `POST /api/v1/reports/export/pdf` - Export PDF
- `POST /api/v1/reports/export/csv` - Export CSV

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

## Configuration

Edit `.env` file:

```env
PORT=3000
JWT_SECRET=your-secret-key
ASSET_SERVICE_URL=http://localhost:3001
ZAKAT_SERVICE_URL=http://localhost:3002
# ... other services
```

## Running

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t api-gateway .
docker run -p 3000:3000 api-gateway
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Example Request

```bash
curl -X GET http://localhost:3000/api/v1/assets/user123 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Rate Limiting

- **General Routes**: 100 requests per 15 minutes per IP
- **Auth Routes**: 5 requests per 15 minutes per IP
- **Public Content**: 200 requests per 15 minutes per IP

## Error Responses

### 400 Bad Request
```json
{
  "error": "ValidationError",
  "message": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "No authorization token provided"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Cannot GET /api/v1/invalid-route"
}
```

### 429 Too Many Requests
```json
{
  "error": "Too Many Requests",
  "message": "Too many requests from this IP, please try again later."
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Health Monitoring

Check gateway health:
```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-20T18:30:00.000Z",
  "uptime": 12345.67,
  "service": "api-gateway"
}
```

## Service Communication

The gateway forwards authenticated user information to downstream services via headers:

- `X-User-Id`: User ID from JWT
- `X-User-Email`: User email from JWT

## Security Features

1. **Helmet.js**: Sets various HTTP headers for security
2. **CORS**: Configurable cross-origin resource sharing
3. **Rate Limiting**: Prevents abuse
4. **JWT Verification**: Validates authentication tokens
5. **Request Logging**: Tracks all requests
6. **Error Sanitization**: Hides sensitive error details in production

## Development

### Project Structure
```
src/
├── index.ts              # Main application entry
├── routes/
│   └── index.ts          # Route definitions
├── middleware/
│   ├── auth.ts           # JWT authentication
│   ├── rateLimiter.ts    # Rate limiting
│   ├── logger.ts         # Request logging
│   └── errorHandler.ts   # Error handling
└── services/
    └── ServiceRegistry.ts # Service health checks
```

### Adding a New Route

1. Define the route in `src/routes/index.ts`
2. Add service URL in `.env`
3. Configure proxy middleware
4. Add authentication if needed

Example:
```typescript
router.use('/new-service', authMiddleware, createProxyMiddleware({
  target: process.env.NEW_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/v1/new-service': '/api' },
}));
```

## Testing

```bash
# Run tests
npm test

# Test with curl
curl http://localhost:3000/health
```

## Deployment

### Environment Variables (Production)
- Set strong `JWT_SECRET`
- Configure `ALLOWED_ORIGINS`
- Set service URLs to production endpoints
- Set `NODE_ENV=production`

### Docker Compose
The gateway is included in the root `docker-compose.yml` file.

## Troubleshooting

### Service Unavailable
Check if downstream services are running:
```bash
docker-compose ps
```

### Authentication Fails
- Verify JWT_SECRET matches across services
- Check token expiration
- Ensure Authorization header format: `Bearer <token>`

### Rate Limit Exceeded
- Wait 15 minutes
- Check if rate limits are appropriate
- Consider IP whitelisting for trusted clients

## Performance

- Uses connection pooling for service requests
- Implements request/response caching where appropriate
- Configurable timeouts (default: 10 seconds)
- Graceful shutdown on SIGTERM/SIGINT

## Monitoring

Logs include:
- Request method and path
- Response status code
- Request duration
- Timestamp

Example log:
```
[2025-10-20T18:30:00.000Z] GET /api/v1/assets/user123 200 45ms
```

## License

Part of the Zakat Calculator and Reminder App
