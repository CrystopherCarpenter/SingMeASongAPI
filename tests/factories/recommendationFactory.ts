import { prisma } from '../../src/database';

export async function recommendationFactory() {
    const recommendation = {
        id: 999,
        name: 'Beautiful Day',
        youtubeLink: 'https://www.youtube.com/watch?v=co6WMzDOh1o',
        score: -5,
    };

    await prisma.recommendation.upsert({
        where: { id: recommendation.id },
        update: {},
        create: { ...recommendation },
    });

    return recommendation.id;
}
