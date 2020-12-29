import {inputLogFormatter} from '../../../src/Formatters';

/**
 * InputLogFormatter test
 */
describe('InputLogFormatterTest', () => {
    it('call inputLogFormatter with a valid log', () => {
        const log = {
            fromBlock: 'earliest',
            toBlock: 'latest',
            topics: ['ds0'],
            address: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
        };

        expect(inputLogFormatter(log)).toEqual({
            fromBlock: 'earliest',
            toBlock: 'latest',
            topics: ['ds0'],
            address: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
        });
    });

    it('call inputLogFormatter with a array of addresses in the log', () => {
        const log = {
            fromBlock: 'earliest',
            toBlock: 'latest',
            topics: ['ds0'],
            address: ['ds03C9A938fF7f54090d0d99e2c6f80380510Ea078', 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078']
        };

        expect(inputLogFormatter(log)).toEqual({
            fromBlock: 'earliest',
            toBlock: 'latest',
            topics: ['ds0'],
            address: ['ds03c9a938ff7f54090d0d99e2c6f80380510ea078', 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078']
        });
    });

    it('call inputLogFormatter with an topic item of null', () => {
        const log = {
            fromBlock: 'earliest',
            toBlock: 'latest',
            topics: [null],
            address: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
        };

        expect(inputLogFormatter(log)).toEqual({
            fromBlock: 'earliest',
            toBlock: 'latest',
            topics: [null],
            address: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
        });
    });

    it('call inputLogFormatter with an topic item that does not start with "ds"', () => {
        const log = {
            fromBlock: 'earliest',
            toBlock: 'latest',
            topics: ['00'],
            address: 'ds03C9A938fF7f54090d0d99e2c6f80380510Ea078'
        };

        expect(inputLogFormatter(log)).toEqual({
            fromBlock: 'earliest',
            toBlock: 'latest',
            topics: ['ds3030'],
            address: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
        });
    });
});
