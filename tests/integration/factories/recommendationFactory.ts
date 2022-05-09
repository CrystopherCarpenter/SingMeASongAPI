import { prisma } from '../../../src/database';

export async function lowScoreRecommendationFactory() {
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

export async function recommendationFactory(data) {
    const response = await prisma.recommendation.create({
        data,
    });

    return response;
}

type dataType =
    | 'valid'
    | 'invalidName'
    | 'invalidLink'
    | 'emptyName'
    | 'emptyLink';

export function recommendationBodyFactory(type: dataType) {
    const recommendation = {
        name: 'On Melancholy Hill',
        youtubeLink: 'https://www.youtube.com/watch?v=p00v9ZFhWJM',
    };

    if (type === 'valid') return { ...recommendation };
    if (type === 'invalidName')
        return { ...recommendation, name: ['invalid', 'name'] };
    if (type === 'emptyName') return { ...recommendation, name: '' };
    if (type === 'invalidLink')
        return {
            ...recommendation,
            youtubeLink: 'https://www.invalidlink.com',
        };
    if (type === 'emptyLink') return { ...recommendation, youtubeLink: '' };
}

export async function manyRecommendationsFactory() {
    const data = [
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

    const response = await prisma.recommendation.createMany({
        data,
    });

    return response;
}
