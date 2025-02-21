import * as Utils from 'web3-utils';
import {formatters} from 'web3-core-helpers';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import AbstractGetBlockUncleCountMethod from '../../../../lib/methods/block/AbstractGetBlockUncleCountMethod';

// Mocks
jest.mock('web3-utils');
jest.mock('web3-core-helpers');

/**
 * AbstractGetBlockUncleCountMethod test
 */
describe('AbstractGetBlockUncleCountMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new AbstractGetBlockUncleCountMethod('rpcMethod', Utils, formatters, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('rpcMethod');

        expect(method.parametersAmount).toEqual(1);

        expect(method.utils).toEqual(Utils);

        expect(method.formatters).toEqual(formatters);

        expect(method.moduleInstance).toEqual({});
    });

    it('calls beforeExecution with a block number hash as parameter and calls the inputBlockNumberFormatter', () => {
        method.parameters = ['ds0'];

        formatters.inputBlockNumberFormatter.mockReturnValueOnce('ds0');

        method.beforeExecution({});

        expect(method.parameters[0]).toEqual('ds0');

        expect(formatters.inputBlockNumberFormatter).toHaveBeenCalledWith('ds0');
    });

    it('afterExecution should map the hex string to a number', () => {
        Utils.hexToNumber.mockReturnValueOnce(100);

        expect(method.afterExecution('ds0')).toEqual(100);

        expect(Utils.hexToNumber).toHaveBeenCalledWith('ds0');
    });
});
