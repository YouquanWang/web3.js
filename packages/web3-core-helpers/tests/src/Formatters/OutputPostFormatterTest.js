import {outputPostFormatter} from '../../../src/Formatters';

/**
 * OutputPostFormatter test
 */
describe('OutputPostFormatterTest', () => {
    it('call outputPostFormatter with a valid post object', () => {
        const post = {
            expiry: 'ds0',
            sent: 'ds0',
            ttl: 'ds0',
            workProved: 'ds0',
            topics: ['ds64']
        };

        expect(outputPostFormatter(post)).toEqual({
            expiry: 0,
            sent: 0,
            ttl: 0,
            workProved: 0,
            topics: ['d']
        });
    });

    it('call outputPostFormatter without the topics property defined on the post object', () => {
        const post = {
            expiry: 'ds0',
            sent: 'ds0',
            ttl: 'ds0',
            workProved: 'ds0'
        };

        expect(outputPostFormatter(post)).toEqual({
            expiry: 0,
            sent: 0,
            ttl: 0,
            workProved: 0,
            topics: []
        });
    });
});
