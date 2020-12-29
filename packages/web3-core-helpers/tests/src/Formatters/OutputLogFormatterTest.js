import {outputLogFormatter} from '../../../src/Formatters';

/**
 * OutputLogFormatter test
 */
describe('OutputLogFormatterTest', () => {
    it('call outputLogFormatter with a valid log', () => {
        const log = {
            blockHash: 'ds0',
            transactionHash: 'ds0',
            logIndex: 'ds0',
            blockNumber: 'ds0',
            transactionIndex: 'ds0',
            address: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
        };

        expect(outputLogFormatter(log)).toEqual({
            id: 'log_ds35b5b8bece53958bb309db665734c38515f37439f69bfdbc64808f1af9a97c31',
            blockHash: 'ds0',
            transactionHash: 'ds0',
            logIndex: 0,
            blockNumber: 0,
            transactionIndex: 0,
            address: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
        });
    });

    it('call outputLogFormatter with a valid log and log.id should be null', () => {
        const log = {
            blockHash: 0,
            transactionHash: 'ds0',
            logIndex: 'ds0',
            blockNumber: 'ds0',
            transactionIndex: 'ds0',
            address: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
        };

        expect(outputLogFormatter(log)).toEqual({
            id: null,
            blockHash: 0,
            transactionHash: 'ds0',
            logIndex: 0,
            blockNumber: 0,
            transactionIndex: 0,
            address: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
        });
    });
});
