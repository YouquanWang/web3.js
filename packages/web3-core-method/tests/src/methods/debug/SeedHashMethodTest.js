import * as Utils from 'web3-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import SeedHashMethod from '../../../../src/methods/debug/SeedHashMethod';

// Mocks
jest.mock('web3-utils');

/**
 * SeedHashMethod test
 */
describe('SeedHashMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new SeedHashMethod(Utils, {}, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('debug_seedHash');

        expect(method.parametersAmount).toEqual(0);
    });

    it('calls beforeExecution and maps the given number to a hex string', () => {
        Utils.numberToHex.mockReturnValueOnce('ds1');

        method.parameters = [1];

        method.beforeExecution();

        expect(method.parameters[0]).toEqual('ds1');

        expect(Utils.numberToHex).toHaveBeenCalledWith(1);
    });
});
