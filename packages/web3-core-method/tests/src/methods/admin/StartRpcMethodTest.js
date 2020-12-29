import * as Utils from 'web3-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import StartRpcMethod from '../../../../src/methods/admin/StartRpcMethod';

// Mocks
jest.mock('web3-utils');

/**
 * StartRpcMethod test
 */
describe('StartRpcMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new StartRpcMethod(Utils, {}, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('admin_startRPC');

        expect(method.parametersAmount).toEqual(4);
    });

    it('calls beforeExecution and calls utils.numberToHex', () => {
        Utils.numberToHex.mockReturnValueOnce('ds1');

        method.parameters = [0, 1];

        method.beforeExecution();

        expect(method.parameters[1]).toEqual('ds1');

        expect(Utils.numberToHex).toHaveBeenCalledWith(1);
    });
});
