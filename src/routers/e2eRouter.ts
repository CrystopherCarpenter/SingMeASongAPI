import { Router } from 'express';
import { e2eController } from '../controllers/e2eController.js';

const e2eRouter = Router();

e2eRouter.post('/e2e/truncate', e2eController.truncate);
e2eRouter.post('/e2e/seed', e2eController.seed);

export default e2eRouter;
