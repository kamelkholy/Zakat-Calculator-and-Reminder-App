import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authMiddleware } from '../middleware/auth';

const ASSET_SERVICE_URL = process.env.ASSET_SERVICE_URL || 'http://localhost:3001';
const ZAKAT_SERVICE_URL = process.env.ZAKAT_SERVICE_URL || 'http://localhost:3002';
const REMINDER_SERVICE_URL = process.env.REMINDER_SERVICE_URL || 'http://localhost:3003';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3004';

export function setupRoutes(): Router {
  const router = Router();

  // User Management Service - Authentication routes (no auth required for login/register)
  router.use('/users/register', createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/users': '/api' },
  }));

  router.use('/users/login', createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/users': '/api' },
  }));

  router.use('/users/forgot-password', createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/users': '/api' },
  }));

  // Protected routes - require authentication
  router.use('/users', /*authMiddleware,*/ createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/users': '/api' },
    onProxyReq: (proxyReq, req: any) => {
      // Forward user info from JWT
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.userId);
        proxyReq.setHeader('X-User-Email', req.user.email);
      }
    },
  }));

  // Asset Management Service
  router.use('/assets', /*authMiddleware,*/ createProxyMiddleware({
    target: ASSET_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/assets': '/api/assets' },
    onProxyReq: (proxyReq, req: any) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.userId);
      }
    },
  }));

  // Zakat Calculation Service
  router.use('/zakat', /*authMiddleware,*/ createProxyMiddleware({
    target: ZAKAT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/zakat': '/api' },
    onProxyReq: (proxyReq, req: any) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.userId);
      }
    },
  }));

  // Reminder Service
  router.use('/reminders', /*authMiddleware,*/ createProxyMiddleware({
    target: REMINDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/reminders': '/api/reminders' },
    onProxyReq: (proxyReq, req: any) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.userId);
      }
    },
  }));

  return router;
}
