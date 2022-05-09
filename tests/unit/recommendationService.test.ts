import { recommendationService } from '../../src/services/recommendationsService';
import { recommendationRepository } from '../../src/repositories/recommendationRepository';
import { jest } from '@jest/globals';
import {
    recommendationDataFactory,
    lowScoreRecommendationFactory,
    manyRecommendationsDataFactory,
} from '../integration/factories/recommendationFactory';

const notFound = {
    message: '',
    type: 'not_found',
};

const conflict = {
    message: 'Recommendations names must be unique',
    type: 'conflict',
};

describe('test RecommendationService insert', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should throw error if the recommendation already exists', async () => {
        const recommendation = recommendationDataFactory();

        jest.spyOn(recommendationRepository, 'findByName').mockResolvedValue(
            recommendation
        );

        expect(async () => {
            await recommendationService.insert(recommendation);
        }).rejects.toEqual(conflict);
    });
});

describe('test RecommendationService upvote', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should throw error given an invalid id', async () => {
        jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);

        expect(async () => {
            await recommendationService.upvote(1);
        }).rejects.toEqual(notFound);
    });
});

describe('test RecommendationService downvote', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should throw error if recommendation is not found', async () => {
        jest.spyOn(recommendationRepository, 'find').mockResolvedValue(null);

        expect(async () => {
            await recommendationService.downvote(1);
        }).rejects.toEqual(notFound);
    });

    it('should exclude recommendation if score is lower than -5', async () => {
        const recommendation = lowScoreRecommendationFactory();

        jest.spyOn(recommendationRepository, 'find').mockResolvedValue(
            recommendation
        );
        jest.spyOn(recommendationRepository, 'updateScore').mockResolvedValue({
            ...recommendation,
            score: -6,
        });

        const remove = jest
            .spyOn(recommendationRepository, 'remove')
            .mockResolvedValue(null);

        await recommendationService.downvote(recommendation.id);

        expect(remove).toHaveBeenCalledTimes(1);
    });
});

describe('test RecommendationService Random', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should throw error if any recommendation is found', async () => {
        jest.spyOn(recommendationService, 'getScoreFilter').mockReturnValue(
            'gt'
        );
        jest.spyOn(recommendationService, 'getByScore').mockResolvedValue([]);
        jest.spyOn(recommendationRepository, 'findAll').mockResolvedValue([]);

        expect(async () => {
            await recommendationService.getRandom();
        }).rejects.toEqual(notFound);
    });
});
