import {formatters} from 'web3-core-helpers';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import GetBalanceMethod from '../../../../src/methods/account/GetBalanceMethod';

// Mocks
jest.mock('web3-core-helpers');

/**
 * GetBalanceMethod test
 */
describe('GetBalanceMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new GetBalanceMethod(null, formatters, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('eth_getBalance');

        expect(method.parametersAmount).toEqual(2);

        expect(method.utils).toEqual(null);

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

    it('calls beforeExecution with a callback instead of the optional paramter and it calls the inputAddressFormatter and inputDefaultBlockNumberFormatter', () => {
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

    it('afterExecution should call outputBigNumberFormatter on the response and return it', () => {
        formatters.outputBigNumberFormatter.mockReturnValueOnce({bigNumber: true});

        expect(method.afterExecution('response')).toHaveProperty('bigNumber', true);

        expect(formatters.outputBigNumberFormatter).toHaveBeenCalledWith('response');
    });
});
