import express, { Router } from 'express';
import * as reminderController from '../controllers/reminderController';

const router: Router = express.Router();

// Routes
router.get('/', reminderController.getAllReminders);
router.get('/pending', reminderController.getPendingReminders);
router.post('/ramadan', reminderController.createRamadanReminder);
router.post('/nisab-alert', reminderController.createNisabAlert);
router.put('/:id/sent', reminderController.markAsSent);
router.put('/:id/dismiss', reminderController.dismissReminder);
router.delete('/:id', reminderController.deleteReminder);

export default router;
