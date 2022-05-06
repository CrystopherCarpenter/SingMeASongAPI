import { prisma } from '../src/database.js';
import { Recommendation } from '@prisma/client';

type RecommendationData = Omit<Recommendation, 'id'>;

export async function main() {
    const recommendations: RecommendationData[] = [
        {
            name: 'Paranoid',
            youtubeLink: 'https://www.youtube.com/watch?v=0qanF-91aJo',
            score: 0,
        },
        {
            name: 'I Think I´m Paranoid',
            youtubeLink: 'https://www.youtube.com/watch?v=ypr18UmxOas',
            score: 1,
        },
        {
            name: 'My Favourite Game',
            youtubeLink: 'https://www.youtube.com/watch?v=u9WgtlgGAgs',
            score: 2,
        },
        {
            name: 'Danse Macabre',
            youtubeLink: 'https://www.youtube.com/watch?v=YyknBTm_YyM',
            score: 3,
        },
        {
            name: 'CHANSON DES TUVACHES',
            youtubeLink: 'https://www.youtube.com/watch?v=Syw8q4vgc3A',
            score: 4,
        },
        {
            name: 'Les Marionettes',
            youtubeLink: 'https://www.youtube.com/watch?v=ikBg4BDgsso',
            score: 5,
        },
    ];

    recommendations.forEach(async (recommendation) => {
        await prisma.recommendation.upsert({
            where: { name: recommendation.name },
            update: {},
            create: { ...recommendation },
        });
    });
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
