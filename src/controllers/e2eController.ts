import { Request, Response } from 'express';
import { e2eService } from '../services/e2eService.js';

async function truncate(req: Request, res: Response) {
    await e2eService.truncate();

    res.sendStatus(200);
}

async function seed(req: Request, res: Response) {
    await e2eService.seed();

    res.sendStatus(200);
}

export const e2eController = { truncate, seed };
