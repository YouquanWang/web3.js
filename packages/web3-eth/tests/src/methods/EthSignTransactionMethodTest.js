import {formatters} from 'web3-core-helpers';
import {SignTransactionMethod} from 'web3-core-method';
import EthSignTransactionMethod from '../../../src/methods/EthSignTransactionMethod';

// Mocks
jest.mock('web3-core-helpers');

/**
 * EthSignTransactionMethod test
 */
describe('EthSignTransactionMethodTest', () => {
    let method, moduleInstanceMock;

    beforeEach(() => {
        moduleInstanceMock = {};
        moduleInstanceMock.accounts = {wallet: {'ds0': {privateKey: 'ds0'}}};
        moduleInstanceMock.transactionSigner = {
            sign: jest.fn(() => {
                return Promise.resolve('ds00');
            })
        };

        method = new EthSignTransactionMethod(null, formatters, moduleInstanceMock);
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(SignTransactionMethod);
    });

    it('beforeExecution should execute the inputTransactionFormatter', () => {
        method.parameters = [{}];

        formatters.inputTransactionFormatter.mockReturnValueOnce({empty: false});

        method.beforeExecution({});

        expect(method.parameters[0]).toHaveProperty('empty', false);

        expect(formatters.inputTransactionFormatter).toHaveBeenCalledWith({}, {});
    });

    it('calls execute and a local unlocked account does exist', async () => {
        method.parameters = [{}, 'ds0'];

        const response = await method.execute();

        expect(response).toEqual('ds00');

        expect(method.moduleInstance.transactionSigner.sign).toHaveBeenCalledWith({}, 'ds0');
    });

    it('calls execute and a local unlocked account does not exist', async () => {
        moduleInstanceMock.accounts = {wallet: {}};
        moduleInstanceMock.currentProvider = {send: jest.fn()};

        method.parameters = [{}];
        method.execute();

        expect(moduleInstanceMock.currentProvider.send).toHaveBeenCalledWith('eth_signTransaction', method.parameters);
    });
});
