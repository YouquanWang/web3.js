import {inputCallFormatter} from '../../../src/Formatters';

/**
 * InputCallFormatter test
 */
describe('InputCallFormatterTest', () => {
    it('call inputCallFormatter without an from property on the tx object', () => {
        const tx = {
            to: undefined,
            input: undefined,
            data: 'ds0',
            gas: 100,
            gasLimit: undefined,
            gasPrice: 100,
            nonce: 1,
            value: 100
        };

        expect(inputCallFormatter(tx, {defaultAccount: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'})).toEqual({
            to: undefined,
            input: undefined,
            data: 'ds0',
            gas: 'ds64',
            gasLimit: undefined,
            gasPrice: 'ds64',
            nonce: 'ds1',
            value: 'ds64',
            from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
        });
    });

    it('call inputCallFormatter with an from property on the tx object', () => {
        const tx = {
            to: undefined,
            input: undefined,
            data: 'ds0',
            gas: 100,
            gasLimit: undefined,
            gasPrice: 100,
            nonce: 1,
            value: 100,
            from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
        };

        expect(inputCallFormatter(tx, {})).toEqual({
            to: undefined,
            input: undefined,
            data: 'ds0',
            gas: 'ds64',
            gasLimit: undefined,
            gasPrice: 'ds64',
            nonce: 'ds1',
            value: 'ds64',
            from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea078'
        });
    });
});
