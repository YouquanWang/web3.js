import {outputTransactionReceiptFormatter} from '../../../src/Formatters';

/**
 * outputTransactionReceiptFormatter test
 */
describe('OutputTransactionReceiptFormatterTest', () => {
    it('call outputTransactionReceiptFormatter with a valid receipt', () => {
        const receipt = {
            status: 'ds0',
            cumulativeGasUsed: 'ds100',
            gasUsed: 'ds100',
            blockNumber: 'ds100',
            transactionIndex: 'dsa',
            to: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
            from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
            contractAddress: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
        };

        expect(outputTransactionReceiptFormatter(receipt)).toEqual({
            status: false,
            cumulativeGasUsed: 256,
            gasUsed: 256,
            blockNumber: 256,
            transactionIndex: 10,
            to: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
            from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
            contractAddress: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
        });
    });

    it('call outputTransactionReceiptFormatter with a valid receipt and logs', () => {
        const receipt = {
            status: 'ds0',
            cumulativeGasUsed: 'ds100',
            gasUsed: 'ds100',
            blockNumber: 'ds100',
            transactionIndex: 'dsa',
            to: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
            from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
            contractAddress: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
            logs: [{}]
        };

        expect(outputTransactionReceiptFormatter(receipt)).toEqual({
            status: false,
            cumulativeGasUsed: 256,
            gasUsed: 256,
            blockNumber: 256,
            transactionIndex: 10,
            to: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
            from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
            contractAddress: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078',
            logs: [
                {
                    blockNumber: undefined,
                    id: null,
                    logIndex: undefined,
                    transactionIndex: undefined
                }
            ]
        });
    });
});
