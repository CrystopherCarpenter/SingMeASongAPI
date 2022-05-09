import app from '../src/app';
import supertest from 'supertest';
import { prisma } from '../src/database';
import { recommendationRepository } from '../src/repositories/recommendationRepository';
import { recommendationFactory } from './factories/recommendationFactory';

describe('POST /recommendations', () => {
    afterAll(async () => {
        disconnect();
    });

    it('should add a song recommendation', async () => {
        const recommendation = {
            name: 'On Melancholy Hill',
            youtubeLink: 'https://www.youtube.com/watch?v=p00v9ZFhWJM',
        };

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toEqual(201);
    });

    it('should return status 409 for an existent recommendation name', async () => {
        const recommendation = {
            name: 'On Melancholy Hill',
            youtubeLink: 'https://www.youtube.com/watch?v=p00v9ZFhWJM',
        };

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toEqual(409);
    });

    it('should return status 422 for an invalid recommendation name', async () => {
        const recommendation = {
            name: ['invalid', 'name', 123],
            youtubeLink: 'https://www.youtube.com/watch?v=p00v9ZFhWJM',
        };

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toEqual(422);
    });

    it('should return status 422 for an invalid recommendation youtubeLink', async () => {
        const recommendation = {
            name: 'On Melancholy Hill',
            youtubeLink: 'https://www.invalidlink.com',
        };

        const { status } = await supertest(app)
            .post('/recommendations')
            .send(recommendation);

        expect(status).toEqual(422);
    });
});

describe('POST /recommendations/:id/upvote', () => {
    afterAll(async () => {
        disconnect();
    });

    it('should add 1 to the score of a given recommendation', async () => {
        const id = Math.floor(Math.random() * 11 + 1);

        const { body: before } = await supertest(app)
            .get(`/recommendations/${id}`)
            .send();

        const expectedScore = before.score + 1;

        await supertest(app).post(`/recommendations/${id}/upvote`).send();

        const { body: after } = await supertest(app)
            .get(`/recommendations/${id}`)
            .send();

        expect(after.score).toEqual(expectedScore);
    });
});

describe('POST /recommendations/:id/downvote', () => {
    afterAll(async () => {
        disconnect();
    });

    it('should subtract 1 to the score of a given recommendation', async () => {
        const id = Math.floor(Math.random() * 11 + 1);

        const { body: before } = await supertest(app)
            .get(`/recommendations/${id}`)
            .send();

        const expectedScore = before.score - 1;

        await supertest(app).post(`/recommendations/${id}/downvote`).send();

        const { body: after } = await supertest(app)
            .get(`/recommendations/${id}`)
            .send();

        expect(after.score).toEqual(expectedScore);
    });

    it('should delete recommendation when the score is less than -5', async () => {
        const id = await recommendationFactory();

        await supertest(app).post(`/recommendations/${id}/downvote`).send();

        const { status } = await supertest(app)
            .get(`/recommendations/${id}`)
            .send();

        expect(status).toEqual(404);
    });
});

describe('GET /recommendations/', () => {
    afterAll(async () => {
        disconnect();
    });

    it('should return last 10 recommendations', async () => {
        const { body } = await supertest(app).get('/recommendations/').send();

        expect(body.length).toEqual(10);
    });
});

describe('GET /recommendations/:id', () => {
    afterAll(async () => {
        disconnect();
    });

    it('should return a song given an existent id', async () => {
        const id = Math.floor(Math.random() * 11 + 1);

        const { body } = await supertest(app)
            .get(`/recommendations/${id}`)
            .send();

        expect(body.id).toEqual(id);
    });

    it('should return status 404 given an inexistent id', async () => {
        const id = -1;

        const { status } = await supertest(app)
            .get(`/recommendations/${id}`)
            .send();

        expect(status).toEqual(404);
    });
});

describe('GET /recommendations/top/:amount', () => {
    afterAll(async () => {
        disconnect();
    });

    it('should return top 10 recommendations', async () => {
        const { body } = await supertest(app)
            .get('/recommendations/top/10')
            .send();

        expect(body.length).toEqual(10);
    });
});

describe('GET /recommendations/random', () => {
    afterAll(async () => {
        disconnect();
    });

    it('should return a recommendation', async () => {
        const { body } = await supertest(app)
            .get('/recommendations/random')
            .send();

        console.log(body);

        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
            })
        );
    });

    it('should return status 404', async () => {
        await recommendationRepository.truncate();

        const { status } = await supertest(app)
            .get('/recommendations/random')
            .send();

        expect(status).toEqual(404);
    });
});

async function disconnect() {
    await prisma.$disconnect();
}
