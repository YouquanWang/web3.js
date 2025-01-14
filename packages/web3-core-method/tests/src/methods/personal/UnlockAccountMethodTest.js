import {formatters} from 'web3-core-helpers';
import UnlockAccountMethod from '../../../../src/methods/personal/UnlockAccountMethod';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';

// Mocks
jest.mock('web3-core-helpers');

/**
 * UnlockAccountMethod test
 */
describe('UnlockAccountMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new UnlockAccountMethod(null, formatters, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('personal_unlockAccount');

        expect(method.parametersAmount).toEqual(3);

        expect(method.utils).toEqual(null);

        expect(method.formatters).toEqual(formatters);
    });

    it('beforeExecution should call inputSignFormatter and inputAddressFormatter', () => {
        method.parameters = ['ds0'];

        formatters.inputAddressFormatter.mockReturnValueOnce('ds00');

        method.beforeExecution();

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('ds0');

        expect(method.parameters[0]).toEqual('ds00');
    });
});
