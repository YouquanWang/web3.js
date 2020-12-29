import {formatters} from 'web3-core-helpers';
import AbstractMethod from '../../../../lib/methods/AbstractMethod';
import SetEtherBaseMethod from '../../../../src/methods/miner/SetEtherBaseMethod';

// Mocks
jest.mock('web3-core-helpers');

/**
 * SetEtherBaseMethod test
 */
describe('SetEtherBaseMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new SetEtherBaseMethod(null, formatters, {});
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractMethod);

        expect(method.rpcMethod).toEqual('miner_setEtherbase');

        expect(method.parametersAmount).toEqual(1);
    });

    it('calls beforeExecution and formats the given address', () => {
        formatters.inputAddressFormatter.mockReturnValueOnce('ds0');

        method.parameters = ['ds00'];
        method.beforeExecution();

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('ds00');

        expect(method.parameters[0]).toEqual('ds0');
    });
});
