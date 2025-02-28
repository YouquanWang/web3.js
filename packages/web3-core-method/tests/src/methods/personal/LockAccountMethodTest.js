import {formatters} from 'web3-core-helpers';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import LockAccountMethod from '../../../../src/methods/personal/LockAccountMethod';

// Mocks
jest.mock('web3-core-helpers');

/**
 * LockAccountMethod test
 */
describe('LockAccountMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new LockAccountMethod(null, formatters, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('personal_lockAccount');

        expect(method.parametersAmount).toEqual(1);

        expect(method.utils).toEqual(null);

        expect(method.formatters).toEqual(formatters);
    });

    it('beforeExecution should call inputAddressFormatter', () => {
        method.parameters = ['ds0'];

        formatters.inputAddressFormatter.mockReturnValueOnce('ds0');

        method.beforeExecution();

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('ds0');

        expect(method.parameters[0]).toEqual('ds0');
    });
});
