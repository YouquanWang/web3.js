import {outputSyncingFormatter} from '../../../src/Formatters';

/**
 * OutputSyncingFormatter test
 */
describe('OutputSyncingFormatterTest', () => {
    it('call outputSyncingFormatter with valid syncing response', () => {
        const response = {
            startingBlock: 'ds0',
            currentBlock: 'ds0',
            highestBlock: 'ds0',
            knownStates: 'ds0',
            pulledStates: 'ds0'
        };

        expect(outputSyncingFormatter(response)).toEqual({
            startingBlock: 0,
            currentBlock: 0,
            highestBlock: 0,
            knownStates: 0,
            pulledStates: 0
        });
    });
});
