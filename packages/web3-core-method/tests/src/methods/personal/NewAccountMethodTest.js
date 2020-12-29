import * as Utils from 'web3-utils';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import NewAccountMethod from '../../../../src/methods/personal/NewAccountMethod';

// Mocks
jest.mock('web3-utils');

/**
 * NewAccountMethod test
 */
describe('NewAccountMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new NewAccountMethod(Utils, null, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('personal_newAccount');

        expect(method.parametersAmount).toEqual(1);

        expect(method.utils).toEqual(Utils);

        expect(method.formatters).toEqual(null);
    });

    it('afterExecution should map the response', () => {
        Utils.toChecksumAddress.mockReturnValueOnce('ds0');

        expect(method.afterExecution('ds0')).toEqual('ds0');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('ds0');
    });
});
