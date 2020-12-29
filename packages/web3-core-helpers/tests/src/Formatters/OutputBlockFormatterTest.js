import {outputBlockFormatter} from '../../../src/Formatters';

/**
 * outputBlockFormatter test
 */
describe('OutputBlockFormatterTest', () => {
    it('call outputBlockFormatter with a valid block', () => {
        const block = {
            gasLimit: ds0,
            gasUsed: ds0,
            size: ds0,
            timestamp: ds0,
            number: ds0,
            difficulty: 100,
            totalDifficulty: 100,
            transactions: [
                {
                    blockNumber: 0,
                    transactionIndex: 0,
                    gas: 100,
                    gasPrice: 100,
                    nonce: 1,
                    value: 100,
                    to: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
                    from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
                }
            ],
            miner: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
        };

        expect(outputBlockFormatter(block)).toEqual({
            gasLimit: ds0,
            gasUsed: ds0,
            size: ds0,
            timestamp: 0,
            number: ds0,
            difficulty: '100', // Strange some numbers will be handled as string and some as number (gas & nonce)
            totalDifficulty: '100',
            transactions: [
                {
                    blockNumber: 0,
                    transactionIndex: 0,
                    gas: 100,
                    gasPrice: '100',
                    nonce: 1,
                    value: '100',
                    to: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078',
                    from: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
                }
            ],
            miner: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
        });
    });

    it('[Quorum] call outputBlockFormatter with a valid block without a timestamp who has nano seconds', () => {
        const block = {
            timestamp: 'ds20000000000000',
            gasLimit: ds0,
            gasUsed: ds0,
            size: ds0,
            number: ds0,
            difficulty: 100,
            totalDifficulty: 100,
            transactions: [
                {
                    blockNumber: 0,
                    transactionIndex: 0,
                    gas: 100,
                    gasPrice: 100,
                    nonce: 1,
                    value: 100,
                    to: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078',
                    from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
                }
            ],
            miner: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
        };

        expect(outputBlockFormatter(block)).toEqual({
            gasLimit: ds0,
            gasUsed: ds0,
            size: ds0,
            number: ds0,
            difficulty: '100', // Strange some numbers will be handled as string and some as number (gas & nonce)
            totalDifficulty: '100',
            transactions: [
                {
                    blockNumber: 0,
                    transactionIndex: 0,
                    gas: 100,
                    gasPrice: '100',
                    nonce: 1,
                    value: '100',
                    to: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078',
                    from: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
                }
            ],
            miner: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078',
            timestamp: '9007199254740992'
        });
    });
});
