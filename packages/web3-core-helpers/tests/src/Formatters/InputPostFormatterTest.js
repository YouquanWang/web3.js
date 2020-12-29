import {inputPostFormatter} from '../../../src/Formatters';

/**
 * InputPostFormatter test
 */
describe('InputPostFormatterTest', () => {
    it('call inputPostFormatter with a valid post object', () => {
        const post = {
            ttl: 100,
            workToProve: 100,
            priority: 100,
            topics: 'ds0'
        };

        expect(inputPostFormatter(post)).toEqual({
            ttl: 'ds64',
            workToProve: 'ds64',
            priority: 'ds64',
            topics: ['ds0']
        });
    });

    it('call inputPostFormatter with an topics property of type array and a item of type hex string', () => {
        const post = {
            ttl: 100,
            workToProve: 100,
            priority: 100,
            topics: ['ds0']
        };

        expect(inputPostFormatter(post)).toEqual({
            ttl: 'ds64',
            workToProve: 'ds64',
            priority: 'ds64',
            topics: ['ds0']
        });
    });

    it('call inputPostFormatter with an topics property of type array and a item of type string', () => {
        const post = {
            ttl: 100,
            workToProve: 100,
            priority: 100,
            topics: ['asdf']
        };

        expect(inputPostFormatter(post)).toEqual({
            ttl: 'ds64',
            workToProve: 'ds64',
            priority: 'ds64',
            topics: ['ds61736466']
        });
    });
});
