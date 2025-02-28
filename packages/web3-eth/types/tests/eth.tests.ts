/*
    This file is part of web3.js.
    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file eth-tests.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2018
 */

import {Log, Transaction, TransactionReceipt, RLPEncodedTransaction} from 'web3-core';
import {Eth, BlockHeader, Syncing, Block, GetProof} from 'web3-eth';

const eth = new Eth('http://localhost:8545');

// $ExpectType new (jsonInterface: AbiItem | AbiItem[], address?: string | undefined, options?: ContractOptions | undefined) => Contract
eth.Contract;

// $ExpectType new (iban: string) => Iban
eth.Iban;

// $ExpectType Personal
eth.personal;

// $ExpectType Accounts
eth.accounts;

// $ExpectType Ens
eth.ens;

// $ExpectType AbiCoder
eth.abi;

// $ExpectType Network
eth.net;

eth.clearSubscriptions();

// $ExpectType Subscription<Log>
eth.subscribe('logs');

// $ExpectType Subscription<Log>
eth.subscribe('logs', {});
// $ExpectType Subscription<Log>
eth.subscribe('logs', {}, (error: Error, log: Log) => {});

// $ExpectType Subscription<Syncing>
eth.subscribe('syncing');
// $ExpectType Subscription<Syncing>
eth.subscribe('syncing', null, (error: Error, result: Syncing) => {});

// $ExpectType Subscription<BlockHeader>
eth.subscribe('newBlockHeaders');
// $ExpectType Subscription<BlockHeader>
eth.subscribe('newBlockHeaders', null, (error: Error, blockHeader: BlockHeader) => {});

// $ExpectType Subscription<string>
eth.subscribe('pendingTransactions');
// $ExpectType Subscription<string>
eth.subscribe('pendingTransactions', null, (error: Error, transactionHash: string) => {});

// $ExpectType Providers
Eth.providers;

// $ExpectType any
eth.givenProvider;

// $ExpectType BatchRequest
new eth.BatchRequest();

// $ExpectType string | null
eth.defaultAccount;

// $ExpectType string | number
eth.defaultBlock;

// $ExpectType HttpProvider | IpcProvider | WebsocketProvider | Web3EthereumProvider | CustomProvider
eth.currentProvider;

// $ExpectType Promise<string>
eth.getProtocolVersion();
// $ExpectType Promise<string>
eth.getProtocolVersion((error: Error, protocolVersion: string) => {});

// $ExpectType Promise<boolean | Syncing>
eth.isSyncing();
// $ExpectType Promise<boolean | Syncing>
eth.isSyncing((error: Error, syncing: Syncing) => {});

// $ExpectType Promise<string>
eth.getCoinbase();
// $ExpectType Promise<string>
eth.getCoinbase((error: Error, coinbaseAddress: string) => {});

// $ExpectType Promise<boolean>
eth.isMining();
// $ExpectType Promise<boolean>
eth.isMining((error: Error, mining: boolean) => {});

// $ExpectType Promise<number>
eth.getHashrate();
// $ExpectType Promise<number>
eth.getHashrate((error: Error, hashes: number) => {});

// $ExpectType Promise<string>
eth.getGasPrice();
// $ExpectType Promise<string>
eth.getGasPrice((error: Error, gasPrice: string) => {});

// $ExpectType Promise<string[]>
eth.getAccounts();
// $ExpectType Promise<string[]>
eth.getAccounts((error: Error, accounts: string[]) => {});

// $ExpectType Promise<number>
eth.getBlockNumber();
// $ExpectType Promise<number>
eth.getBlockNumber((error: Error, blockNumber: number) => {});

// $ExpectType Promise<string>
eth.getBalance('ds407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<string>
eth.getBalance('ds407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<string>
eth.getBalance('ds407d73d8a49eeb85d32cf465507dd71d507100c1', '1000', (error: Error, balance: string) => {});
// $ExpectType Promise<string>
eth.getBalance('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<string>
eth.getBalance('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 1000, (error: Error, balance: string) => {});

// $ExpectType Promise<string>
eth.getStorageAt('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 2);
// $ExpectType Promise<string>
eth.getStorageAt('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 2, '1000');
// $ExpectType Promise<string>
eth.getStorageAt('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 2, '1000', (error: Error, balance: string) => {});
// $ExpectType Promise<string>
eth.getStorageAt('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 2, 1000);
// $ExpectType Promise<string>
eth.getStorageAt('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 2, 1000, (error: Error, balance: string) => {});

// $ExpectType Promise<string>
eth.getCode('ds407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<string>
eth.getCode('ds407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<string>
eth.getCode('ds407d73d8a49eeb85d32cf465507dd71d507100c1', '1000', (error: Error, balance: string) => {});
// $ExpectType Promise<string>
eth.getCode('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<string>
eth.getCode('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 1000, (error: Error, balance: string) => {});

// $ExpectType Promise<Block>
eth.getBlock('ds407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<Block>
eth.getBlock(345);
// $ExpectType Promise<Block>
eth.getBlock('ds407d73d8a49eeb85d32cf465507dd71d507100c1', true);
// $ExpectType Promise<Block>
eth.getBlock('ds407d73d8a49eeb85d32cf465507dd71d507100c1', false);
// $ExpectType Promise<Block>
eth.getBlock(345);
// $ExpectType Promise<Block>
eth.getBlock(345, true);
// $ExpectType Promise<Block>
eth.getBlock(345, false);
// $ExpectType Promise<Block>
eth.getBlock('ds407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
eth.getBlock(345, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
eth.getBlock(345, true, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
eth.getBlock(345, false, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
eth.getBlock('ds407d73d8a49eeb85d32cf465507dd71d507100c1', true, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
eth.getBlock('ds407d73d8a49eeb85d32cf465507dd71d507100c1', false, (error: Error, block: Block) => {});

// $ExpectType Promise<number>
eth.getBlockTransactionCount(
    'ds407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, numberOfTransactions: number) => {}
);
// $ExpectType Promise<number>
eth.getBlockTransactionCount(345);
// $ExpectType Promise<number>
eth.getBlockTransactionCount(
    'ds407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, numberOfTransactions: number) => {}
);
// $ExpectType Promise<number>
eth.getBlockTransactionCount(345);

// $ExpectType Promise<Block>
eth.getUncle('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 4);
// $ExpectType Promise<Block>
eth.getUncle(345, 4);
// $ExpectType Promise<Block>
eth.getUncle('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 4, true);
// $ExpectType Promise<Block>
eth.getUncle('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 4, false);
// $ExpectType Promise<Block>
eth.getUncle('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 4, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
eth.getUncle(345, 4, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
eth.getUncle(345, 4, true);
// $ExpectType Promise<Block>
eth.getUncle(345, 4, false);
// $ExpectType Promise<Block>
eth.getUncle('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 4, true, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
eth.getUncle('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 4, false, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
eth.getUncle(345, 4, true, (error: Error, uncle: {}) => {});
// $ExpectType Promise<Block>
eth.getUncle(345, 4, false, (error: Error, uncle: {}) => {});

// $ExpectType Promise<Transaction>
eth.getTransaction('ds407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<Transaction>
eth.getTransaction('ds407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, transaction: Transaction) => {});

// $ExpectType Promise<Transaction>
eth.getTransactionFromBlock('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 2);
// $ExpectType Promise<Transaction>
eth.getTransactionFromBlock(345, 2);
// $ExpectType Promise<Transaction>
eth.getTransactionFromBlock(
    'ds407d73d8a49eeb85d32cf465507dd71d507100c1',
    2,
    (error: Error, transaction: Transaction) => {}
);
// $ExpectType Promise<Transaction>
eth.getTransactionFromBlock(345, 2, (error: Error, transaction: Transaction) => {});

// $ExpectType Promise<TransactionReceipt>
eth.getTransactionReceipt('ds407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<TransactionReceipt>
eth.getTransactionReceipt(
    'ds407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, transactionReceipt: TransactionReceipt) => {}
);

// $ExpectType Promise<number>
eth.getTransactionCount('ds407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<number>
eth.getTransactionCount('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<number>
eth.getTransactionCount('ds407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<number>
eth.getTransactionCount('ds407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, count: number) => {});
// $ExpectType Promise<number>
eth.getTransactionCount('ds407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, count: number) => {});
// $ExpectType Promise<number>
eth.getTransactionCount('ds407d73d8a49eeb85d32cf465507dd71d507100c1', 1000, (error: Error, count: number) => {});
// $ExpectType Promise<number>
eth.getTransactionCount('ds407d73d8a49eeb85d32cf465507dd71d507100c1', '1000', (error: Error, count: number) => {});

const code = '603d80600c6000396000f3007c0';

// $ExpectType PromiEvent<TransactionReceipt>
eth.sendTransaction({
    from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    data: 'code'
});
// $ExpectType PromiEvent<TransactionReceipt>
eth.sendTransaction(
    {
        from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        data: 'code'
    },
    (error: Error, hash: string) => {}
);

// $ExpectType PromiEvent<TransactionReceipt>
eth.sendSignedTransaction('dsf889808609184e72a0008227109');
// $ExpectType PromiEvent<TransactionReceipt>
eth.sendSignedTransaction('dsf889808609184e72a0008227109', (error: Error, hash: string) => {});

// $ExpectType Promise<string>
eth.sign('Hello world', 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe');
// $ExpectType Promise<string>
eth.sign('Hello world', 3);
// $ExpectType Promise<string>
eth.sign('Hello world', 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', (error: Error, signature: string) => {});
// $ExpectType Promise<string>
eth.sign('Hello world', 3, (error: Error, signature: string) => {});

// $ExpectType Promise<RLPEncodedTransaction>
eth.signTransaction({
    from: 'dsEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    gasPrice: '20000000000',
    gas: '21000',
    to: 'ds3535353535353535353535353535353535353535',
    value: '1000000000000000000',
    data: ''
});
// $ExpectType Promise<RLPEncodedTransaction>
eth.signTransaction(
    {
        from: 'dsEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: 'ds3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    'dsEB014f8c8B418Db6b45774c326A0E64C78914dC0'
);
// $ExpectType Promise<RLPEncodedTransaction>
eth.signTransaction(
    {
        from: 'dsEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: 'ds3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    (error: Error, signedTransaction: RLPEncodedTransaction) => {}
);
// $ExpectType Promise<RLPEncodedTransaction>
eth.signTransaction(
    {
        from: 'dsEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: 'ds3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    'dsEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    (error: Error, signedTransaction: RLPEncodedTransaction) => {}
);

// $ExpectType Promise<string>
eth.call({
    to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
    data: 'dsc6888fa10000000000000000000000000000000000000000000000000000000000000003'
});
// $ExpectType Promise<string>
eth.call(
    {
        to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: 'dsc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100
);
// $ExpectType Promise<string>
eth.call(
    {
        to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: 'dsc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    '100'
);
// $ExpectType Promise<string>
eth.call(
    {
        to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: 'dsc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    (error: Error, data: string) => {}
);
// $ExpectType Promise<string>
eth.call(
    {
        to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: 'dsc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    '100',
    (error: Error, data: string) => {}
);
// $ExpectType Promise<string>
eth.call(
    {
        to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: 'dsc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100,
    (error: Error, data: string) => {}
);

// $ExpectType Promise<string>
eth.call(
    {
        to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: 'dsc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100,
    (error: Error, data: string) => {}
);

// $ExpectType Promise<number>
eth.estimateGas({
    to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    data: 'dsc6888fa10000000000000000000000000000000000000000000000000000000000000003'
});
// $ExpectType Promise<number>
eth.estimateGas(
    {
        to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        data: 'dsc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    (error: Error, gas: number) => {}
);

// $ExpectType Promise<Log[]>
eth.getPastLogs({
    address: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    topics: ['ds033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234']
});
// $ExpectType Promise<Log[]>
eth.getPastLogs(
    {
        address: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        topics: ['ds033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234']
    },
    (error: Error, logs: Log[]) => {}
);

// $ExpectType Promise<string[]>
eth.getWork();
// $ExpectType Promise<string[]>
eth.getWork((error: Error, result: string[]) => {});

// $ExpectType Promise<boolean>
eth.submitWork([
    'ds0000000000000001',
    'ds1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    'dsD1FE5700000000000000000000000000D1FE5700000000000000000000000000'
]);

// $ExpectType Promise<boolean>
eth.submitWork(
    [
        'ds0000000000000001',
        'ds1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        'dsD1FE5700000000000000000000000000D1FE5700000000000000000000000000'
    ],
    (error: Error, result: boolean) => {}
);

// $ExpectType Promise<[]>
eth.pendingTransactions();

// $ExpectType Promise<[]>
eth.pendingTransactions((error: Error, result: []) => {});

// $ExpectType Promise<GetProof>
eth.getProof(
    "ds1234567890123456789012345678901234567890",
    ["ds0000000000000000000000000000000000000000000000000000000000000000","ds0000000000000000000000000000000000000000000000000000000000000001"],
    "latest"
);

// $ExpectType Promise<GetProof>
eth.getProof(
    "ds1234567890123456789012345678901234567890",
    ["ds0000000000000000000000000000000000000000000000000000000000000000","ds0000000000000000000000000000000000000000000000000000000000000001"],
    "latest",
    (error: Error, result: GetProof) => {}
);

// $ExpectType Promise<GetProof>
eth.getProof(
    "ds1234567890123456789012345678901234567890",
    ["ds0000000000000000000000000000000000000000000000000000000000000000","ds0000000000000000000000000000000000000000000000000000000000000001"],
    10
);

// $ExpectType Promise<GetProof>
eth.getProof(
    "ds1234567890123456789012345678901234567890",
    ["ds0000000000000000000000000000000000000000000000000000000000000000","ds0000000000000000000000000000000000000000000000000000000000000001"],
    10,
    (error: Error, result: GetProof) => {}
);
