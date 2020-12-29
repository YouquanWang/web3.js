import * as Utils from 'web3-utils';
import Wallet from '../../../src/models/Wallet';
import Account from '../../../src/models/Account';
import Accounts from '../../../src/Accounts';

// Mocks
jest.mock('web3-utils');
jest.mock('../../../src/models/Account');
jest.mock('../../../src/Accounts');

/**
 * Wallet test
 */
describe('WalletTest', () => {
    let wallet, accountsMock;

    beforeEach(() => {
        new Accounts();
        accountsMock = Accounts.mock.instances[0];

        wallet = new Wallet(Utils, accountsMock);
    });

    it('constructor check', () => {
        expect(wallet.utils).toEqual(Utils);

        expect(wallet.accountsModule).toEqual(accountsMock);

        expect(wallet.accounts).toEqual({});

        expect(wallet.accountsIndex).toEqual(0);

        expect(wallet.defaultKeyName).toEqual('web3js_wallet');
    });

    it('calls the length property and returns the accountsIndex', () => {
        wallet.accountsIndex = 99;

        expect(wallet).toHaveLength(99);
    });

    it('calls create and returns the expected value', () => {
        Utils.randomHex.mockReturnValueOnce('asdf');

        Account.from.mockReturnValueOnce({address: 'ds0', privateKey: 'ds0'});

        expect(wallet.create(1)).toEqual(wallet);

        expect(Utils.randomHex).toHaveBeenCalledWith(32);

        expect(Account.from).toHaveBeenCalledWith('asdf', accountsMock);

        expect(wallet.accountsIndex).toEqual(1);
    });

    it('calls add with a Account object and returns the expected value', () => {
        new Account();
        const accountMock = Account.mock.instances[0];
        accountMock.address = 'ds0';

        expect(wallet.add(accountMock)).toEqual(accountMock);

        expect(wallet.accounts[accountMock.address]).toEqual(accountMock);

        expect(wallet.accounts[0]).toEqual(accountMock);

        expect(wallet.accounts[accountMock.address.toLowerCase()]).toEqual(accountMock);
    });

    it('calls add with an already existing account and returns the expected value', () => {
        new Account();
        const accountMock = Account.mock.instances[0];
        accountMock.address = 'ds0';
        wallet.accounts['ds0'] = accountMock;

        expect(wallet.add(accountMock)).toEqual(accountMock);

        expect(wallet.accounts[accountMock.address]).toEqual(accountMock);
    });

    it('calls add with a privateKey and returns the expected value', () => {
        new Account();
        const accountMock = Account.mock.instances[0];
        accountMock.address = 'ds0';

        Account.fromPrivateKey.mockReturnValueOnce(accountMock);

        expect(wallet.add('ds0')).toEqual(accountMock);

        expect(Account.fromPrivateKey).toHaveBeenCalledWith('ds0', accountsMock);

        expect(wallet.accounts[accountMock.address]).toEqual(accountMock);

        expect(wallet.accounts[0]).toEqual(accountMock);

        expect(wallet.accounts[accountMock.address.toLowerCase()]).toEqual(accountMock);
    });

    it('calls get returns the expected value', () => {
        new Account();
        const accountMock = Account.mock.instances[0];
        accountMock.address = 'ds0';
        wallet.accounts['ds0'] = accountMock;

        expect(wallet.get('ds0')).toEqual(accountMock);
    });

    it('calls remove and returns true', () => {
        new Account();
        const accountMock = Account.mock.instances[0];
        accountMock.address = 'ds0A';
        wallet.accounts['dsA'] = accountMock;
        wallet.accounts['dsa'] = accountMock;

        expect(wallet.remove('dsA')).toEqual(true);

        expect(wallet.accountsIndex).toEqual(0);
    });

    it('calls remove and returns false', () => {
        expect(wallet.remove(0)).toEqual(false);
    });

    it('calls clear and returns the expect value', () => {
        new Account();
        const accountMock = Account.mock.instances[0];
        accountMock.address = 'ds0';

        expect(wallet.clear()).toEqual(wallet);

        expect(wallet.accountsIndex).toEqual(0);
    });

    it('calls encrypt and returns the expect value', () => {
        new Account();
        const accountMock = Account.mock.instances[0];
        accountMock.address = 'ds0';

        accountMock.encrypt.mockReturnValueOnce(true);

        wallet.accounts[0] = accountMock;
        wallet.accountsIndex = 1;

        expect(wallet.encrypt('pw', {})).toEqual([true]);

        expect(accountMock.encrypt).toHaveBeenCalledWith('pw', {});

        expect(wallet.accountsIndex).toEqual(1);
    });

    it('calls decrypt and returns the expected value', () => {
        new Account();
        const accountMock = Account.mock.instances[0];
        accountMock.address = 'ds0';

        Account.fromV3Keystore.mockReturnValueOnce(accountMock);

        expect(wallet.decrypt([true], 'pw')).toEqual(wallet);

        expect(Account.fromV3Keystore).toHaveBeenCalledWith(true, 'pw', false, accountsMock);

        expect(wallet.accounts[accountMock.address]).toEqual(accountMock);

        expect(wallet.accounts[0]).toEqual(accountMock);

        expect(wallet.accounts[accountMock.address.toLowerCase()]).toEqual(accountMock);
    });

    it('calls decrypt and throws an error', () => {
        Account.fromV3Keystore.mockReturnValueOnce(false);

        expect(() => {
            wallet.decrypt([true], 'pw');
        }).toThrow("Couldn't decrypt accounts. Password wrong?");

        expect(Account.fromV3Keystore).toHaveBeenCalledWith(true, 'pw', false, accountsMock);
    });
});
