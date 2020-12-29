import * as Utils from 'web3-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import GoTraceMethod from '../../../../src/methods/debug/GoTraceMethod';

// Mocks
jest.mock('web3-utils');

/**
 * GoTraceMethod test
 */
describe('GoTraceMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new GoTraceMethod(Utils, {}, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('debug_goTrace');

        expect(method.parametersAmount).toEqual(2);
    });

    it('calls beforeExecution and maps the given number to a hex string', () => {
        Utils.numberToHex.mockReturnValueOnce('ds1');

        method.parameters = [0, 1];

        method.beforeExecution();

        expect(method.parameters[1]).toEqual('ds1');

        expect(Utils.numberToHex).toHaveBeenCalledWith(1);
    });
});
