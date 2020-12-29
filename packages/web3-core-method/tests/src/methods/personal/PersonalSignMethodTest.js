import {formatters} from 'web3-core-helpers';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import PersonalSignMethod from '../../../../src/methods/personal/PersonalSignMethod';

// Mocks
jest.mock('web3-core-helpers');

/**
 * PersonalSignMethod test
 */
describe('PersonalSignMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new PersonalSignMethod(null, formatters, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('personal_sign');

        expect(method.parametersAmount).toEqual(3);

        expect(method.utils).toEqual(null);

        expect(method.formatters).toEqual(formatters);
    });

    it('beforeExecution should call inputSignFormatter and inputAddressFormatter', () => {
        method.parameters = ['sign', 'ds0'];

        formatters.inputSignFormatter.mockReturnValueOnce('signed');

        formatters.inputAddressFormatter.mockReturnValueOnce('ds00');

        method.beforeExecution();

        expect(method.parameters[0]).toEqual('signed');

        expect(method.parameters[1]).toEqual('ds00');

        expect(formatters.inputSignFormatter).toHaveBeenCalledWith('sign');

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('ds0');
    });

    it('calls beforeExecution with a callback instead of the optional paramter and it calls the inputSignFormatter and inputAddressFormatter', () => {
        const callback = jest.fn();
        method.parameters = ['sign', 'ds0', callback];

        formatters.inputSignFormatter.mockReturnValueOnce('signed');

        formatters.inputAddressFormatter.mockReturnValueOnce('ds00');

        method.beforeExecution({defaultBlock: 'latest'});

        expect(method.callback).toEqual(callback);

        expect(method.parameters[0]).toEqual('signed');

        expect(method.parameters[1]).toEqual('ds00');

        expect(method.parameters[2]).toEqual(undefined);

        expect(formatters.inputSignFormatter).toHaveBeenCalledWith('sign');

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('ds0');
    });
});
