import { main } from '../../prisma/seed.js';
import { recommendationRepository } from '../repositories/recommendationRepository.js';

async function truncate() {
    await recommendationRepository.truncate();
}

async function seed() {
    await main();
}

export const e2eService = { truncate, seed };
