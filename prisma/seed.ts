import { prisma } from '../src/database.js';
import { Recommendation } from '@prisma/client';

type RecommendationData = Omit<Recommendation, 'id'>;

export async function main() {
    const recommendations: RecommendationData[] = [
        {
            name: 'mOBSCENE',
            youtubeLink: '   https://www.youtube.com/watch?v=mdwZV4Y95Nw',
            score: 100,
        },
        {
            name: 'Gangsta´s Paradise',
            youtubeLink: 'https://www.youtube.com/watch?v=fPO76Jlnz6c',
            score: 90,
        },
        {
            name: ' The Beautiful People',
            youtubeLink: 'https://www.youtube.com/watch?v=Ypkv0HeUvTc',
            score: 80,
        },
        {
            name: 'Smile',
            youtubeLink: 'https://www.youtube.com/watch?v=0WxDrVUrSvI',
            score: 70,
        },
        {
            name: 'Somewhere Only We Know',
            youtubeLink: 'https://www.youtube.com/watch?v=mer6X7nOY_o',
            score: 60,
        },
        {
            name: 'Paranoid',
            youtubeLink: 'https://www.youtube.com/watch?v=0qanF-91aJo',
            score: 50,
        },
        {
            name: 'I Think I´m Paranoid',
            youtubeLink: 'https://www.youtube.com/watch?v=ypr18UmxOas',
            score: 40,
        },
        {
            name: 'My Favourite Game',
            youtubeLink: 'https://www.youtube.com/watch?v=u9WgtlgGAgs',
            score: 30,
        },
        {
            name: 'Danse Macabre',
            youtubeLink: 'https://www.youtube.com/watch?v=YyknBTm_YyM',
            score: 20,
        },
        {
            name: 'CHANSON DES TUVACHES',
            youtubeLink: 'https://www.youtube.com/watch?v=Syw8q4vgc3A',
            score: 10,
        },
        {
            name: 'Les Marionettes',
            youtubeLink: 'https://www.youtube.com/watch?v=ikBg4BDgsso',
            score: 0,
        },
    ];

    for (let i = 0; i < recommendations.length; i++) {
        await prisma.recommendation.upsert({
            where: { name: recommendations[i].name },
            update: {},
            create: { ...recommendations[i] },
        });
    }
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
