import { Request, Response } from 'express';
import { testsService } from '../services/testsService.js';

async function truncate(req: Request, res: Response) {
    await testsService.truncate();

    res.sendStatus(200);
}

async function seed(req: Request, res: Response) {
    await testsService.seed();

    res.sendStatus(200);
}

export const e2eController = { truncate, seed };
