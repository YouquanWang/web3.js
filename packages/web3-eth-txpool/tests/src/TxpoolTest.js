import * as Utils from 'web3-utils';
import {formatters} from 'web3-core-helpers';
import {Network} from 'web3-net';
import {AbstractWeb3Module} from 'web3-core';
import MethodFactory from '../../src/factories/MethodFactory';
import TxPool from '../../src/TxPool';

// Mocks
jest.mock('web3-utils');
jest.mock('web3-core-helpers');
jest.mock('web3-net');

/**
 * TxPool test
 */
describe('TxpoolTest', () => {
    let txpool, providerMock, methodFactory, networkMock;

    beforeEach(() => {
        providerMock = {send: jest.fn(), clearSubscriptions: jest.fn()};
        methodFactory = new MethodFactory(Utils, formatters);

        new Network();
        networkMock = Network.mock.instances[0];

        txpool = new TxPool(providerMock, methodFactory, networkMock, Utils, formatters, {}, {});
    });

    it('constructor check', () => {
        expect(txpool.net).toEqual(networkMock);

        expect(txpool.utils).toEqual(Utils);

        expect(txpool.formatters).toEqual(formatters);

        expect(txpool).toBeInstanceOf(AbstractWeb3Module);
    });

    it('calls setProvider and returns true', () => {
        networkMock.setProvider = jest.fn();
        networkMock.setProvider.mockReturnValueOnce(true);

        expect(txpool.setProvider(providerMock, 'net')).toEqual(true);

        expect(networkMock.setProvider).toHaveBeenCalledWith(providerMock, 'net');
    });

    it('sets the defaultGasPrice property', () => {
        txpool.defaultGasPrice = 10;

        expect(txpool.defaultGasPrice).toEqual(10);

        expect(networkMock.defaultGasPrice).toEqual(10);
    });

    it('sets the defaultGas property', () => {
        txpool.defaultGas = 10;

        expect(txpool.defaultGas).toEqual(10);

        expect(networkMock.defaultGas).toEqual(10);
    });

    it('sets the transactionBlockTimeout property', () => {
        txpool.transactionBlockTimeout = 10;

        expect(txpool.transactionBlockTimeout).toEqual(10);

        expect(networkMock.transactionBlockTimeout).toEqual(10);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        txpool.transactionConfirmationBlocks = 10;

        expect(txpool.transactionConfirmationBlocks).toEqual(10);

        expect(networkMock.transactionConfirmationBlocks).toEqual(10);
    });

    it('sets the transactionPollingTimeout property', () => {
        txpool.transactionPollingTimeout = 10;

        expect(txpool.transactionPollingTimeout).toEqual(10);

        expect(networkMock.transactionPollingTimeout).toEqual(10);
    });

    it('sets the defaultAccount property', () => {
        Utils.toChecksumAddress.mockReturnValue('ds2');

        txpool.defaultAccount = 'ds0';

        expect(txpool.defaultAccount).toEqual('ds2');

        expect(networkMock.defaultAccount).toEqual('ds0');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('ds0');
    });

    it('sets the defaultBlock property', () => {
        txpool.defaultBlock = 1;

        expect(txpool.defaultBlock).toEqual(1);

        expect(networkMock.defaultBlock).toEqual(1);
    });
});
