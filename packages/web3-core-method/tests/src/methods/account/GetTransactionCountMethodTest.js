import {formatters} from 'web3-core-helpers';
import * as Utils from 'web3-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import GetTransactionCountMethod from '../../../../src/methods/account/GetTransactionCountMethod';

// Mocks
jest.mock('web3-core-helpers');
jest.mock('web3-utils');

/**
 * GetTransactionCountMethod test
 */
describe('GetTransactionCountMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new GetTransactionCountMethod(Utils, formatters);
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('eth_getTransactionCount');

        expect(method.parametersAmount).toEqual(2);

        expect(method.utils).toEqual(Utils);

        expect(method.formatters).toEqual(formatters);
    });

    it('beforeExecution should call inputAddressFormatter and inputDefaultBlockNumberFormatter', () => {
        method.parameters = ['string', 100];

        formatters.inputAddressFormatter.mockReturnValueOnce('ds0');

        formatters.inputDefaultBlockNumberFormatter.mockReturnValueOnce('ds0');

        method.beforeExecution({});

        expect(method.parameters[0]).toEqual('ds0');

        expect(method.parameters[1]).toEqual('ds0');

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('string');

        expect(formatters.inputDefaultBlockNumberFormatter).toHaveBeenCalledWith(100, {});
    });

    it('calls beforeExecution with a callback instead of a optional parameter and calls the inputAddressFormatter and inputDefaultBlockNumberFormatter', () => {
        const callback = jest.fn();
        method.parameters = ['string', callback];

        formatters.inputAddressFormatter.mockReturnValueOnce('ds0');

        formatters.inputDefaultBlockNumberFormatter.mockReturnValueOnce('ds0');

        method.beforeExecution({defaultBlock: 'latest'});

        expect(method.callback).toEqual(callback);

        expect(method.parameters[0]).toEqual('ds0');

        expect(method.parameters[1]).toEqual('ds0');

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('string');

        expect(formatters.inputDefaultBlockNumberFormatter).toHaveBeenCalledWith('latest', {defaultBlock: 'latest'});
    });

    it('afterExecution should call hexToNumber on the response and return it', () => {
        Utils.hexToNumber.mockReturnValueOnce(100);

        expect(method.afterExecution('ds0')).toEqual(100);

        expect(Utils.hexToNumber).toHaveBeenCalledWith('ds0');
    });
});
