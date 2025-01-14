import * as Utils from 'web3-utils';
import {formatters} from 'web3-core-helpers';
import {AbstractWeb3Module} from 'web3-core';
import {SignMethod} from 'web3-core-method';
import EthSignMethod from '../../../src/methods/EthSignMethod';

// Mocks
jest.mock('web3-utils');
jest.mock('web3-core-helpers');
jest.mock('web3-core');

/**
 * EthSignMethod test
 */
describe('EthSignMethodTest', () => {
    let method, moduleInstanceMock, accountsMock;

    beforeEach(() => {
        accountsMock = {};
        accountsMock.sign = jest.fn();
        accountsMock.wallet = {'ds0': {privateKey: 'ds0', address: 'ds0'}};
        accountsMock.accountsIndex = 1;

        new AbstractWeb3Module({}, {}, {}, {});
        moduleInstanceMock = AbstractWeb3Module.mock.instances[0];
        moduleInstanceMock.accounts = accountsMock;

        formatters.inputAddressFormatter.mockReturnValue('ds0');
        formatters.inputSignFormatter.mockReturnValue('string');

        method = new EthSignMethod(Utils, formatters, moduleInstanceMock);
        method.parameters = ['nope', 'ds0'];
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(SignMethod);
    });

    it('calls execute with wallets defined and returns a resolved Promise', async () => {
        accountsMock.sign.mockReturnValueOnce('ds00');

        const response = await method.execute();

        expect(response).toEqual('ds00');

        expect(method.parameters[0]).toEqual('ds0');

        expect(method.parameters[1]).toEqual('string');

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('ds0');

        expect(formatters.inputSignFormatter).toHaveBeenCalledWith('nope');

        expect(accountsMock.sign).toHaveBeenCalledWith('string', 'ds0');
    });

    it('calls execute with wallets defined and the callback gets called', (done) => {
        accountsMock.sign.mockReturnValueOnce('ds00');

        method.callback = jest.fn((error, response) => {
            expect(error).toEqual(false);

            expect(response).toEqual('ds00');

            expect(method.parameters[0]).toEqual('ds0');

            expect(method.parameters[1]).toEqual('string');

            expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('ds0');

            expect(formatters.inputSignFormatter).toHaveBeenCalledWith('nope');

            expect(accountsMock.sign).toHaveBeenCalledWith('string', 'ds0');

            done();
        });

        method.execute();
    });

    it('calls execute with wallets defined but accounts.sign returns a rejected Promise', async () => {
        const error = new Error('SIGN ERROR');
        accountsMock.sign = jest.fn(() => {
            throw error;
        });

        try {
            await method.execute();
        } catch (error2) {
            expect(error2).toEqual(error);

            expect(accountsMock.sign).toHaveBeenCalledWith('string', 'ds0');
        }
    });

    it('calls execute with wallets defined but accounts.sign throws an error', (done) => {
        const error = new Error('SIGN ERROR');
        accountsMock.sign = jest.fn(() => {
            throw error;
        });

        method.callback = jest.fn((error, response) => {
            expect(error).toEqual(error);

            expect(response).toEqual(null);

            done();
        });

        method.execute();
    });

    it('calls execute and the account does not exist in the eth-accounts wallet', async () => {
        accountsMock.wallet = {nope: {privateKey: 'ds0'}};

        moduleInstanceMock.currentProvider = {send: jest.fn()};

        method.execute();

        expect(moduleInstanceMock.currentProvider.send).toHaveBeenCalledWith('eth_sign', method.parameters);
    });
});
