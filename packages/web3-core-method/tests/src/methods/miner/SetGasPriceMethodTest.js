import * as Utils from 'web3-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import SetGasPriceMethod from '../../../../src/methods/miner/SetGasPriceMethod';

// Mocks
jest.mock('web3-utils');

/**
 * SetGasPriceMethod test
 */
describe('SetGasPriceMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new SetGasPriceMethod(Utils, {}, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('miner_setGasPrice');

        expect(method.parametersAmount).toEqual(1);
    });

    it('beforeExecution should call Utils.numberToHex', () => {
        method.parameters = [1];

        Utils.numberToHex.mockReturnValueOnce('ds1');

        method.beforeExecution({});

        expect(method.parameters[0]).toEqual('ds1');

        expect(Utils.numberToHex).toHaveBeenCalledWith(1);
    });
});
