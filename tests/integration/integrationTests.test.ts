import app from '../../src/app';
import supertest from 'supertest';
import { prisma } from '../../src/database';
import {
    recommendationFactory,
    recommendationBodyFactory,
    manyRecommendationsFactory,
    manyRecommendationsDataFactory,
} from './factories/recommendationFactory';

describe('POST /recommendations', () => {
    beforeEach(truncateTable);
    afterAll(disconnect);

    it('should add a song recommendation', async () => {
        const recommendation = recommendationBodyFactory('valid');

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toBe(201);
    });

    it('should return status 409 for an existent recommendation name', async () => {
        const recommendation = recommendationBodyFactory('valid');

        await recommendationFactory(recommendation);

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toBe(409);
    });

    it('should return status 422 for an invalid recommendation name', async () => {
        const recommendation = recommendationBodyFactory('invalidName');

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toBe(422);
    });

    it('should return status 422 for an empty recommendation name', async () => {
        const recommendation = recommendationBodyFactory('emptyName');

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toBe(422);
    });

    it('should return status 422 for an invalid recommendation youtubeLink', async () => {
        const recommendation = recommendationBodyFactory('invalidLink');

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toBe(422);
    });

    it('should return status 422 for an empty recommendation youtubeLink', async () => {
        const recommendation = recommendationBodyFactory('emptyLink');

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toBe(422);
    });
});

describe('POST /recommendations/:id/upvote', () => {
    beforeEach(truncateTable);
    afterAll(disconnect);

    it('should add 1 to the score of a given recommendation', async () => {
        const recommendation = recommendationBodyFactory('valid');

        await recommendationFactory(recommendation);

        const { body: before } = await supertest(app)
            .get(`/recommendations/1`)
            .send();

        const expectedScore = before.score + 1;

        await supertest(app).post(`/recommendations/1/upvote`).send();

        const after = await supertest(app).get(`/recommendations/1`).send();

        expect(after.body.score).toEqual(expectedScore);
        expect(after.status).toBe(200);
    });
});

describe('POST /recommendations/:id/downvote', () => {
    beforeEach(truncateTable);
    afterAll(disconnect);

    it('should subtract 1 to the score of a given recommendation', async () => {
        const recommendation = recommendationBodyFactory('valid');

        await recommendationFactory(recommendation);

        const { body: before } = await supertest(app)
            .get(`/recommendations/1`)
            .send();

        const expectedScore = before.score - 1;

        await supertest(app).post(`/recommendations/1/downvote`).send();

        const after = await supertest(app).get(`/recommendations/1`).send();

        expect(after.body.score).toEqual(expectedScore);
        expect(after.status).toBe(200);
    });
});

describe('GET /recommendations/', () => {
    beforeEach(truncateTable);
    afterAll(disconnect);

    it('should return last 10 recommendations', async () => {
        const data = manyRecommendationsDataFactory();
        await manyRecommendationsFactory(data);

        const response = await supertest(app).get('/recommendations/').send();

        expect(response.body.length).toBeLessThanOrEqual(10);
        expect(response.status).toBe(200);
    });
});

describe('GET /recommendations/:id', () => {
    beforeEach(truncateTable);
    afterAll(disconnect);

    it('should return a song given an existent id', async () => {
        const recommendation = recommendationBodyFactory('valid');

        await recommendationFactory(recommendation);

        const response = await supertest(app).get(`/recommendations/1`).send();

        expect(response.body.id).toEqual(1);
        expect(response.status).toBe(200);
    });
});

describe('GET /recommendations/top/:amount', () => {
    beforeEach(truncateTable);
    afterAll(disconnect);

    it('should return top x recommendations', async () => {
        const data = manyRecommendationsDataFactory();
        await manyRecommendationsFactory(data);

        const amount = Math.floor(Math.random() * 9 + 2);

        const response = await supertest(app)
            .get(`/recommendations/top/${amount}`)
            .send();

        expect(response.body.length).toEqual(amount);
        expect(response.body[1].score).toBeLessThanOrEqual(
            response.body[0].score
        );
        expect(response.status).toBe(200);
    });
});

describe('GET /recommendations/random', () => {
    beforeEach(truncateTable);
    afterAll(disconnect);

    it('should return a recommendation', async () => {
        const data = manyRecommendationsDataFactory();
        await manyRecommendationsFactory(data);

        const response = await supertest(app)
            .get('/recommendations/random')
            .send();

        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
            })
        );
        expect(response.status).toBe(200);
    });

    it('should return status 404', async () => {
        const { status } = await supertest(app)
            .get('/recommendations/random')
            .send();

        expect(status).toBe(404);
    });
});

async function disconnect() {
    await prisma.$disconnect();
}

async function truncateTable() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY;`;
}
