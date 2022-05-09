import { prisma } from '../../../src/database';

export function lowScoreRecommendationFactory() {
    return {
        id: 999,
        name: 'Beautiful Day',
        youtubeLink: 'https://www.youtube.com/watch?v=co6WMzDOh1o',
        score: -5,
    };
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

    if (type === 'valid') return recommendation;
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

export function recommendationDataFactory() {
    return {
        id: 100,
        name: 'On Melancholy Hill',
        youtubeLink: 'https://www.youtube.com/watch?v=p00v9ZFhWJM',
        score: 0,
    };
}

export function manyRecommendationsDataFactory() {
    return [
        {
            id: 1,
            name: 'mOBSCENE',
            youtubeLink: '   https://www.youtube.com/watch?v=mdwZV4Y95Nw',
            score: 100,
        },
        {
            id: 2,
            name: 'Gangsta´s Paradise',
            youtubeLink: 'https://www.youtube.com/watch?v=fPO76Jlnz6c',
            score: 90,
        },
        {
            id: 3,
            name: ' The Beautiful People',
            youtubeLink: 'https://www.youtube.com/watch?v=Ypkv0HeUvTc',
            score: 80,
        },
        {
            id: 4,
            name: 'Smile',
            youtubeLink: 'https://www.youtube.com/watch?v=0WxDrVUrSvI',
            score: 70,
        },
        {
            id: 5,
            name: 'Somewhere Only We Know',
            youtubeLink: 'https://www.youtube.com/watch?v=mer6X7nOY_o',
            score: 60,
        },
        {
            id: 6,
            name: 'Paranoid',
            youtubeLink: 'https://www.youtube.com/watch?v=0qanF-91aJo',
            score: 50,
        },
        {
            id: 7,
            name: 'I Think I´m Paranoid',
            youtubeLink: 'https://www.youtube.com/watch?v=ypr18UmxOas',
            score: 40,
        },
        {
            id: 8,
            name: 'My Favourite Game',
            youtubeLink: 'https://www.youtube.com/watch?v=u9WgtlgGAgs',
            score: 30,
        },
        {
            id: 9,
            name: 'Danse Macabre',
            youtubeLink: 'https://www.youtube.com/watch?v=YyknBTm_YyM',
            score: 25,
        },
        {
            id: 10,
            name: 'CHANSON DES TUVACHES',
            youtubeLink: 'https://www.youtube.com/watch?v=Syw8q4vgc3A',
            score: 20,
        },
    ];
}

export async function manyRecommendationsFactory(data) {
    const response = await prisma.recommendation.createMany({
        data,
    });

    return response;
}
