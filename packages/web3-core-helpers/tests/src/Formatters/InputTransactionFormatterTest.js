import {inputTransactionFormatter} from '../../../src/Formatters';

/**
 * InputTransactionFormatter test
 */
describe('InputTransactionFormatterTest', () => {
    it('call inputTransactionFormatter with valid tx object', () => {
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

        expect(inputTransactionFormatter(tx, {})).toEqual({
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

    it('call inputTransactionFormatter with valid tx object and defaultAccount', () => {
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

        expect(inputTransactionFormatter(tx, {defaultAccount: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea080'})).toEqual({
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

    it('call inputTransactionFormatter without a from property on the tx object but with an defaultAccount on the module', () => {
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

        expect(inputTransactionFormatter(tx, {defaultAccount: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea080'})).toEqual({
            to: undefined,
            input: undefined,
            data: 'ds0',
            gas: 'ds64',
            gasLimit: undefined,
            gasPrice: 'ds64',
            nonce: 'ds1',
            value: 'ds64',
            from: 'ds03c9a938ff7f54090d0d99e2c6f80380510ea080'
        });
    });

    it('call inputTransactionFormatter without a from property on the tx object and also without a defaultAccount', () => {
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

        expect(() => {
            inputTransactionFormatter(tx, {});
        }).toThrow('The send transactions "from" field must be defined!');
    });
});
