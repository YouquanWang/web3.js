.. _eth:

.. include:: include_announcement.rst

========
web3.eth
========

The ``web3-eth`` package allows you to interact with an Ethereum blockchain itself and the deployed smart contracts.


.. code-block:: javascript

    import Web3 from 'web3';
    import {Eth} from 'web3-eth';

    // "Web3.givenProvider" will be set if in an Ethereum supported browser.
    const eth = new Eth(Web3.givenProvider || 'ws://some.local-or-remote.node:8546', null, options);


    // or using the web3 umbrella package

    const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546', null, options);

    // -> web3.eth


Note on checksum addresses
=============================

All Ethereum addresses returned by functions of this package are returned as checksum addresses.
This means some letters are uppercase and some are lowercase.
Based on that it will calculate a checksum for the address and prove its correctness.
Incorrect checksum addresses will throw an error when passed into functions.
If you want to circumvent the checksum check you can make an address all lower- or uppercase.


-------
Example
-------

.. code-block:: javascript

    web3.eth.getAccounts(console.log);
    > ["ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe" ,"ds85F43D8a49eeB85d32Cf465507DD71d507100C1d"]


------------------------------------------------------------------------------


subscribe
=====================

For ``web3.eth.subscribe`` see the :ref:`Subscribe reference documentation <eth-subscribe>`


------------------------------------------------------------------------------


Contract
=====================

For ``web3.eth.Contract`` see the :ref:`Contract reference documentation <eth-contract>`


------------------------------------------------------------------------------


Iban
=====================

For ``web3.eth.Iban`` see the :ref:`Iban reference documentation <eth-iban>`


------------------------------------------------------------------------------


personal
=====================

For ``web3.eth.personal`` see the :ref:`personal reference documentation <eth-personal>`


------------------------------------------------------------------------------

accounts
=====================

For ``web3.eth.accounts`` see the :ref:`accounts reference documentation <eth-accounts>`


------------------------------------------------------------------------------

ens
=====================

For ``web3.eth.ens`` see the :ref:`Ens reference documentation <eth-ens>`



------------------------------------------------------------------------------

abi
=====================

For ``web3.eth.abi`` see the :ref:`ABI reference documentation <eth-abi>`


------------------------------------------------------------------------------


net
=====================

For ``web3.eth.net`` see the :ref:`net reference documentation <eth-net>`


------------------------------------------------------------------------------


.. include:: include_package-core.rst

------------------------------------------------------------------------------

getProtocolVersion
=====================

.. code-block:: javascript

    web3.eth.getProtocolVersion([callback])

Returns the Ethereum protocol version of the node.

-------
Returns
-------

``Promise<string>`` - The protocol version.


-------
Example
-------

.. code-block:: javascript

    web3.eth.getProtocolVersion().then(console.log);
    > "63"


------------------------------------------------------------------------------

isSyncing
=====================

.. code-block:: javascript

    web3.eth.isSyncing([callback])

Checks if the node is currently syncing and returns either a syncing object, or ``false``.

.. _eth-issyncing-return:

-------
Returns
-------

``Promise<object|boolean>`` - A sync object when the node is currently syncing or ``false``:

    - ``startingBlock`` - ``Number``: The block number where the sync started.
    - ``currentBlock`` - ``Number``: The block number where at which block the node currently synced to already.
    - ``highestBlock`` - ``Number``: The estimated block number to sync to.
    - ``knownStates`` - ``Number``: The estimated states to download
    - ``pulledStates`` - ``Number``: The already downloaded states


-------
Example
-------

.. code-block:: javascript

    web3.eth.isSyncing()
    .then(console.log);

    > {
        startingBlock: 100,
        currentBlock: 312,
        highestBlock: 512,
        knownStates: 234566,
        pulledStates: 123455
    }


------------------------------------------------------------------------------

getCoinbase
=====================

.. code-block:: javascript

    web3.eth.getCoinbase([callback])

Returns the coinbase address to which mining rewards will go.

-------
Returns
-------

``Promise<string>`` - The coinbase address set in the node for mining rewards.


-------
Example
-------

.. code-block:: javascript

    web3.eth.getCoinbase().then(console.log);
    > "ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe"


------------------------------------------------------------------------------

isMining
=====================

.. code-block:: javascript

    web3.eth.isMining([callback])


Checks whether the node is mining or not.

-------
Returns
-------

``Promise<boolean>`` - Returns ``true`` if the node is mining, otherwise ``false``.


-------
Example
-------

.. code-block:: javascript

    web3.eth.isMining().then(console.log);
    > true


------------------------------------------------------------------------------

getHashrate
=====================

.. code-block:: javascript

    web3.eth.getHashrate([callback])

Returns the number of hashes per second that the node is mining with.

-------
Returns
-------

``Promise<number>`` - The Number of hashes per second.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getHashrate().then(console.log);
    > 493736


------------------------------------------------------------------------------

.. _eth-gasprice:


getGasPrice
=====================

.. code-block:: javascript

    web3.eth.getGasPrice([callback])


Returns the current gas price oracle.
The gas price is determined by the last few blocks median gas price.
GasPrice is the wei per unit of gas,.

-------
Returns
-------

``Promise<string>`` - Number string of the current gas price in :ref:`wei <what-is-wei>`.

See the :ref:`A note on dealing with big numbers in JavaScript <utils-bn>`.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getGasPrice().then(console.log);
    > "20000000000"


------------------------------------------------------------------------------

.. _eth-getaccounts:

getAccounts
=====================

.. code-block:: javascript

    web3.eth.getAccounts([callback])

Will return a list of the unlocked accounts in the Web3 wallet or it will return the accounts from the currently connected node.

This means you can add accounts with :ref:`web3.eth.accounts.create() <accounts-create>` and you will get them returned here.

-------
Returns
-------


``Promise<Array>`` - An array of addresses controlled by node.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getAccounts().then(console.log);
    > ["ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "dsDCc6960376d6C6dEa93647383FfB245CfCed97Cf"]


------------------------------------------------------------------------------

getBlockNumber
=====================

.. code-block:: javascript

    web3.eth.getBlockNumber([callback])

Returns the current block number.

-------
Returns
-------

``Promise<number>`` - The number of the most recent block.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getBlockNumber().then(console.log);
    > 2744


------------------------------------------------------------------------------

.. _eth-getbalance:

getBalance
=====================

.. code-block:: javascript

    web3.eth.getBalance(address [, defaultBlock] [, callback])

Get the balance of an address at a given block.

----------
Parameters
----------

1. ``String`` - The address to get the balance of.
2. ``Number|String`` - (optional) If you pass this parameter it will not use the default block set with :ref:`web3.eth.defaultBlock <eth-defaultblock>`.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------


``Promise<string>`` - The current balance for the given address in :ref:`wei <what-is-wei>`.

See the :ref:`A note on dealing with big numbers in JavaScript <big-numbers-in-javascript>`.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getBalance("ds407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);
    > "1000000000000"


------------------------------------------------------------------------------

.. _eth-getstorageat:

getStorageAt
=====================

.. code-block:: javascript

    web3.eth.getStorageAt(address, position [, defaultBlock] [, callback])

Get the storage at a specific position of an address.

----------
Parameters
----------

1. ``String`` - The address to get the storage from.
2. ``Number`` - The index position of the storage.
3. ``Number|String`` - (optional) If you pass this parameter it will not use the default block set with :ref:`web3.eth.defaultBlock <eth-defaultblock>`.
4. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------

``Promise<string>`` - The value in storage at the given position.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getStorageAt("ds407d73d8a49eeb85d32cf465507dd71d507100c1", 0).then(console.log);
    > "ds033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"


------------------------------------------------------------------------------

.. _eth-code:

getCode
=====================

.. code-block:: javascript

    web3.eth.getCode(address [, defaultBlock] [, callback])

Get the code at a specific address.

----------
Parameters
----------

1. ``String`` - The address to get the code from.
2. ``Number|String`` - (optional) If you pass this parameter it will not use the default block set with :ref:`web3.eth.defaultBlock <eth-defaultblock>`.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------


``Promise<string>`` - The data at given address ``address``.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getCode("dsd5677cf67b5aa051bb40496e68ad359eb97cfbf8").then(console.log);
    > "ds600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"


------------------------------------------------------------------------------

.. _eth-getblock:

getBlock
=====================

.. code-block:: javascript

     web3.eth.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] [, callback])

Returns a block matching the block number or block hash.

----------
Parameters
----------

1. ``String|Number`` - The block number or block hash. Or the string ``"genesis"``, ``"latest"`` or ``"pending"`` as in the :ref:`default block parameter <eth-defaultblock>`.
2. ``Boolean`` - (optional, default ``false``) If ``true``, the returned block will contain all transactions as objects, if ``false`` it will only contains the transaction hashes.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------


``Promise<object>`` - The block object:

  - ``number`` - ``Number``: The block number. ``null`` when its pending block.
  - ``hash`` 32 Bytes - ``String``: Hash of the block. ``null`` when its pending block.
  - ``parentHash`` 32 Bytes - ``String``: Hash of the parent block.
  - ``nonce`` 8 Bytes - ``String``: Hash of the generated proof-of-work. ``null`` when its pending block.
  - ``sha3Uncles`` 32 Bytes - ``String``: SHA3 of the uncles data in the block.
  - ``logsBloom`` 256 Bytes - ``String``: The bloom filter for the logs of the block. ``null`` when its pending block.
  - ``transactionsRoot`` 32 Bytes - ``String``: The root of the transaction trie of the block
  - ``stateRoot`` 32 Bytes - ``String``: The root of the final state trie of the block.
  - ``receiptsRoot`` 32 Bytes - ``String``: Transaction receipts are used to store the state after a transaction has been executed and are kept in an index-keyed trie. The hash of its root is placed in the block header as the receipts root.
  - ``miner`` - ``String``: The address of the beneficiary to whom the mining rewards were given.
  - ``difficulty`` - ``String``: Integer of the difficulty for this block.
  - ``totalDifficulty`` - ``String``: Integer of the total difficulty of the chain until this block.
  - ``extraData`` - ``String``: The "extra data" field of this block.
  - ``size`` - ``Number``: Integer the size of this block in bytes.
  - ``gasLimit`` - ``Number``: The maximum gas allowed in this block.
  - ``gasUsed`` - ``Number``: The total used gas by all transactions in this block.
  - ``timestamp`` - ``Number | String``: The unix timestamp for when the block was collated (returns a string if a overflow got detected).
  - ``transactions`` - ``Array``: Array of transaction objects, or 32 Bytes transaction hashes depending on the ``returnTransactionObjects`` parameter.
  - ``uncles`` - ``Array``: Array of uncle hashes.

-------
Example
-------

.. code-block:: javascript

    web3.eth.getBlock(3150).then(console.log);
    > {
        "number": 3,
        "hash": "dsef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
        "parentHash": "ds2302e1c0b972d00932deb5dab9eb2982f570597d9d42504c05d9c2147eaf9c88",
        "nonce": "dsfb6e1a62d119228b",
        "sha3Uncles": "ds1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "logsBloom": "ds00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "transactionsRoot": "ds3a1b03875115b79539e5bd33fb00d8f7b7cd61929d5a3c574f507b8acf415bee",
        "stateRoot": "dsf1133199d44695dfa8fd1bcfe424d82854b5cebef75bddd7e40ea94cda515bcb",
        "receiptsRoot: 'ds56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
        "miner": "ds8888f1f195afa192cfee860698584c030f4c9db1",
        "difficulty": '21345678965432',
        "totalDifficulty": '324567845321',
        "size": 616,
        "extraData": "ds",
        "gasLimit": 3141592,
        "gasUsed": 21662,
        "timestamp": 1429287689,
        "transactions": [
            "ds9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
        ],
        "uncles": []
    }


------------------------------------------------------------------------------

getBlockTransactionCount
=============================

.. code-block:: javascript

    web3.eth.getBlockTransactionCount(blockHashOrBlockNumber [, callback])

Returns the number of transaction in a given block.

----------
Parameters
----------


1. ``String|Number`` - The block number or hash. Or the string ``"genesis"``, ``"latest"`` or ``"pending"`` as in the :ref:`default block parameter <eth-defaultblock>`.
2. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------


``Promise<number>`` - The number of transactions in the given block.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getBlockTransactionCount("ds407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);
    > 1


------------------------------------------------------------------------------

getUncle
=====================

.. code-block:: javascript

    web3.eth.getUncle(blockHashOrBlockNumber, uncleIndex [, callback])

Returns a blocks uncle by a given uncle index position.

----------
Parameters
----------

1. ``String|Number`` - The block number or hash. Or the string ``"genesis"``, ``"latest"`` or ``"pending"`` as in the :ref:`default block parameter <eth-defaultblock>`.
2. ``Number`` - The index position of the uncle.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------


``Promise<object>`` - The returned uncle. For a return value see :ref:`web3.eth.getBlock() <eth-getblock>`.

.. note:: An uncle doesn't contain individual transactions.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getUncle(500, 0).then(console.log);
    > // see web3.eth.getBlock

------------------------------------------------------------------------------

getTransaction
=====================

.. code-block:: javascript

    web3.eth.getTransaction(transactionHash [, callback])

Returns a transaction matching the given transaction hash.

----------
Parameters
----------

1. ``String`` - The transaction hash.
2. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


.. _eth-gettransaction-return:

-------
Returns
-------


``Promise<object>`` - A transaction object its hash ``transactionHash``:

  - ``hash`` 32 Bytes - ``String``: Hash of the transaction.
  - ``nonce`` - ``Number``: The number of transactions made by the sender prior to this one.
  - ``blockHash`` 32 Bytes - ``String``: Hash of the block where this transaction was in. ``null`` when its pending.
  - ``blockNumber`` - ``Number``: Block number where this transaction was in. ``null`` when its pending.
  - ``transactionIndex`` - ``Number``: Integer of the transactions index position in the block. ``null`` when its pending.
  - ``from`` - ``String``: Address of the sender.
  - ``to`` - ``String``: Address of the receiver. ``null`` when its a contract creation transaction.
  - ``value`` - ``String``: Value transferred in :ref:`wei <what-is-wei>`.
  - ``gasPrice`` - ``String``: The wei per unit of gas provided by the sender in :ref:`wei <what-is-wei>`.
  - ``gas`` - ``Number``: Gas provided by the sender.
  - ``input`` - ``String``: The data sent along with the transaction.


-------
Example
-------

.. code-block:: javascript

    web3.eth.getTransaction('ds9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b§234').then(console.log);
    > {
        "hash": "ds9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
        "nonce": 2,
        "blockHash": "dsef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
        "blockNumber": 3,
        "transactionIndex": 0,
        "from": "dsa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "to": "ds6295ee1b4f6dd65047762f924ecd367c17eabf8f",
        "value": '123450000000000000',
        "gas": 314159,
        "gasPrice": '2000000000000',
        "input": "ds57cb2fc4"
    }

------------------------------------------------------------------------------

.. _eth-getpendingtransactions:

getPendingTransactions
======================

.. code-block:: javascript

    web3.eth.getPendingTransactions([, callback])

Returns a list of pending transactions.

----------
Parameters
----------

1. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


.. _eth-getpendingtransactions-return:

-------
Returns
-------


``Promise<object[]>`` - Array of pending transactions:

  - ``hash`` 32 Bytes - ``String``: Hash of the transaction.
  - ``nonce`` - ``Number``: The number of transactions made by the sender prior to this one.
  - ``blockHash`` 32 Bytes - ``String``: Hash of the block where this transaction was in. ``null`` when its pending.
  - ``blockNumber`` - ``Number``: Block number where this transaction was in. ``null`` when its pending.
  - ``transactionIndex`` - ``Number``: Integer of the transactions index position in the block. ``null`` when its pending.
  - ``from`` - ``String``: Address of the sender.
  - ``to`` - ``String``: Address of the receiver. ``null`` when its a contract creation transaction.
  - ``value`` - ``String``: Value transferred in :ref:`wei <what-is-wei>`.
  - ``gasPrice`` - ``String``: The wei per unit of gas provided by the sender in :ref:`wei <what-is-wei>`.
  - ``gas`` - ``Number``: Gas provided by the sender.
  - ``input`` - ``String``: The data sent along with the transaction.



-------
Example
-------

.. code-block:: javascript

    web3.eth.getPendingTransactions().then(console.log);
    >  [
        {
            hash: 'ds9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b',
            nonce: 2,
            blockHash: 'dsef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
            blockNumber: 3,
            transactionIndex: 0,
            from: 'dsa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
            to: 'ds6295ee1b4f6dd65047762f924ecd367c17eabf8f',
            value: '123450000000000000',
            gas: 314159,
            gasPrice: '2000000000000',
            input: 'ds57cb2fc4'
            v: 'ds3d',
            r: 'dsaabc9ddafffb2ae0bac4107697547d22d9383667d9e97f5409dd6881ce08f13f',
            s: 'ds69e43116be8f842dcd4a0b2f760043737a59534430b762317db21d9ac8c5034'
        },....,{
            hash: 'ds9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b',
            nonce: 3,
            blockHash: 'dsef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
            blockNumber: 4,
            transactionIndex: 0,
            from: 'dsa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
            to: 'ds6295ee1b4f6dd65047762f924ecd367c17eabf8f',
            value: '123450000000000000',
            gas: 314159,
            gasPrice: '2000000000000',
            input: 'ds57cb2fc4'
            v: 'ds3d',
            r: 'dsaabc9ddafffb2ae0bac4107697547d22d9383667d9e97f5409dd6881ce08f13f',
            s: 'ds69e43116be8f842dcd4a0b2f760043737a59534430b762317db21d9ac8c5034'
        }
   ]

------------------------------------------------------------------------------

getTransactionFromBlock
=============================

.. code-block:: javascript

    getTransactionFromBlock(hashStringOrNumber, indexNumber [, callback])

Returns a transaction based on a block hash or number and the transactions index position.

----------
Parameters
----------


1. ``String`` - A block number or hash. Or the string ``"genesis"``, ``"latest"`` or ``"pending"`` as in the :ref:`default block parameter <eth-defaultblock>`.
2. ``Number`` - The transactions index position.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------


``Promise<object>`` - A transaction object, see :ref:`web3.eth.getTransaction <eth-gettransaction-return>`:


-------
Example
-------


.. code-block:: javascript

    const transaction = web3.eth.getTransactionFromBlock('ds4534534534', 2).then(console.log);
    > // see web3.eth.getTransaction

------------------------------------------------------------------------------

getTransactionReceipt
=====================

.. code-block:: javascript

    web3.eth.getTransactionReceipt(hash [, callback])

Returns the receipt of a transaction by transaction hash.

.. note:: The receipt is not available for pending transactions and returns ``null``.


----------
Parameters
----------

1. ``String`` - The transaction hash.
2. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


.. _eth-gettransactionreceipt-return:

-------
Returns
-------


``Promise`` returns ``Object`` - A transaction receipt object, or ``null`` when no receipt was found:

  - ``status`` - ``Boolean``: ``TRUE`` if the transaction was successful, ``FALSE``, if the EVM reverted the transaction.
  - ``blockHash`` 32 Bytes - ``String``: Hash of the block where this transaction was in.
  - ``blockNumber`` - ``Number``: Block number where this transaction was in.
  - ``transactionHash`` 32 Bytes - ``String``: Hash of the transaction.
  - ``transactionIndex``- ``Number``: Integer of the transactions index position in the block.
  - ``from`` - ``String``: Address of the sender.
  - ``to`` - ``String``: Address of the receiver. ``null`` when its a contract creation transaction.
  - ``contractAddress`` - ``String``: The contract address created, if the transaction was a contract creation, otherwise ``null``.
  - ``cumulativeGasUsed`` - ``Number``: The total amount of gas used when this transaction was executed in the block.
  - ``gasUsed``- ``Number``:  The amount of gas used by this specific transaction alone.
  - ``logs`` - ``Array``: Array of log objects, which this transaction generated.

-------
Example
-------

.. code-block:: javascript

    const receipt = web3.eth.getTransactionReceipt('ds9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b')
                            .then(console.log);
    > {
      "status": true,
      "transactionHash": "ds9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
      "transactionIndex": 0,
      "blockHash": "dsef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
      "blockNumber": 3,
      "contractAddress": "ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
      "cumulativeGasUsed": 314159,
      "gasUsed": 30234,
      "logs": [{
             // logs as returned by getPastLogs, etc.
         }, ...]
    }


------------------------------------------------------------------------------

.. _eth-gettransactioncount:

getTransactionCount
=====================

.. code-block:: javascript

    web3.eth.getTransactionCount(address [, defaultBlock] [, callback])

Get the numbers of transactions sent from this address.

----------
Parameters
----------

1. ``String`` - The address to get the numbers of transactions from.
2. ``Number|String`` - (optional) If you pass this parameter it will not use the default block set with :ref:`web3.eth.defaultBlock <eth-defaultblock>`.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------


``Promise<number>`` - The number of transactions sent from the given address.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getTransactionCount("ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe").then(console.log);
    > 1

------------------------------------------------------------------------------

.. _eth-sendtransaction:

sendTransaction
=====================

.. code-block:: javascript

    web3.eth.sendTransaction(transactionObject [, callback])

Sends a transaction to the network.

----------
Parameters
----------


1. ``Object`` - The transaction object to send:
  - ``from`` - ``String|Number``: The address for the sending account. Uses the :ref:`web3.eth.defaultAccount <eth-defaultaccount>` property, if not specified. Or an address or index of a local wallet in :ref:`web3.eth.accounts.wallet <eth_accounts_wallet>`.
  - ``to`` - ``String``: (optional) The destination address of the message, left undefined for a contract-creation transaction.
  - ``value`` - ``Number|String|BN|BigNumber``: (optional) The value transferred for the transaction in :ref:`wei <what-is-wei>`, also the endowment if it's a contract-creation transaction.
  - ``gas``  - ``Number``: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
  - ``gasPrice`` - ``Number|String|BN|BigNumber``: (optional) The price of gas for this transaction in :ref:`wei <what-is-wei>`, defaults to :ref:`web3.eth.gasPrice <eth-gasprice>`.
  - ``data`` - ``String``: (optional) Either a `ABI byte string <http://solidity.readthedocs.io/en/latest/abi-spec.html>`_ containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
  - ``nonce`` - ``Number``: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
2. ``callback`` - ``Function``: (optional) Optional callback, returns an error object as first parameter and the result as second.

.. note:: The ``from`` property can also be an address or index from the :ref:`web3.eth.accounts.wallet <eth_accounts_wallet>`. It will then sign locally using the private key of that account, and send the transaction via :ref:`web3.eth.sendSignedTransaction() <eth-sendsignedtransaction>`.

.. _eth-sendtransaction-return:

-------
Returns
-------

The **callback** will return the 32 bytes transaction hash.

``PromiEvent``: A :ref:`promise combined event emitter <promiEvent>`. Will be resolved when the transaction :ref:`receipt <eth-gettransactionreceipt-return>` is available. Additionally the following events are available:

- ``"transactionHash"`` returns ``String``: Is fired right after the transaction is sent and a transaction hash is available.
- ``"receipt"`` returns ``Object``: Is fired when the transaction receipt is available.
- ``"confirmation"`` returns ``Number``, ``Object``: Is fired for every confirmation up to the 12th confirmation. Receives the confirmation number as the first and the :ref:`receipt <eth-gettransactionreceipt-return>` as the second argument. Fired from confirmation 0 on, which is the block where its minded.
- ``"error"`` returns ``Error``: Is fired if an error occurs during sending. If a out of gas error, the second parameter is the receipt.


-------
Example
-------

.. code-block:: javascript

    // compiled solidity source code using https://remix.ethereum.org
    const code = "603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";


    // using the callback
    web3.eth.sendTransaction({
        from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        data: code // deploying a contract
    }, function(error, hash){
        ...
    });

    // using the promise
    web3.eth.sendTransaction({
        from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        value: '1000000000000000'
    })
    .then(function(receipt){
        ...
    });


    // using the event emitter
    web3.eth.sendTransaction({
        from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        to: 'ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        value: '1000000000000000'
    })
    .on('transactionHash', function(hash){
        ...
    })
    .on('receipt', function(receipt){
        ...
    })
    .on('confirmation', function(confirmationNumber, receipt){ ... })
    .on('error', console.error); // If a out of gas error, the second parameter is the receipt.

------------------------------------------------------------------------------

.. _eth-sendsignedtransaction:

sendSignedTransaction
=====================

.. code-block:: javascript

    web3.eth.sendSignedTransaction(signedTransactionData [, callback])

Sends an already signed transaction, generated for example using :ref:`web3.eth.accounts.signTransaction <eth-accounts-signtransaction>`.

----------
Parameters
----------

1. ``String`` - Signed transaction data in HEX format
2. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------


``PromiEvent``: A :ref:`promise combined event emitter <promiEvent>`. Will be resolved when the transaction :ref:`receipt <eth-gettransactionreceipt-return>` is available.

Please see the return values for :ref:`web3.eth.sendTransaction <eth-sendtransaction-return>` for details.

-------
Example
-------


.. code-block:: javascript

    const Tx = require('ethereumjs-tx');
    const privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')

    const rawTx = {
      nonce: 'ds00',
      gasPrice: 'ds09184e72a000',
      gasLimit: 'ds2710',
      to: 'ds0000000000000000000000000000000000000000',
      value: 'ds00',
      data: 'ds7f7465737432000000000000000000000000000000000000000000000000000000600057'
    }

    const tx = new Tx(rawTx);
    tx.sign(privateKey);

    const serializedTx = tx.serialize();

    // console.log(serializedTx.toString('hex'));
    // dsf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

    web3.eth.sendSignedTransaction('ds' + serializedTx.toString('hex'))
    .on('receipt', console.log);

    > // see eth.getTransactionReceipt() for details

------------------------------------------------------------------------------

sign
=====================

.. code-block:: javascript

    web3.eth.sign(dataToSign, address [, callback])

Signs data using a specific account. This account needs to be unlocked.

----------
Parameters
----------


1. ``String`` - Data to sign. If String it will be converted using :ref:`web3.utils.utf8ToHex <utils-utf8tohex>`.
2. ``String|Number`` - Address to sign data with. Or an address or index of a local wallet in :ref:`web3.eth.accounts.wallet <eth_accounts_wallet>`.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

.. note:: The 2. ``address`` parameter can also be an address or index from the :ref:`web3.eth.accounts.wallet <eth_accounts_wallet>`. It will then sign locally using the private key of this account.


-------
Returns
-------


``Promise<string>`` - The signature.


-------
Example
-------


.. code-block:: javascript

    web3.eth.sign("Hello world", "ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
    .then(console.log);
    > "ds30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"

    // the below is the same
    web3.eth.sign(web3.utils.utf8ToHex("Hello world"), "ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
    .then(console.log);
    > "ds30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"

------------------------------------------------------------------------------

signTransaction
=====================

.. code-block:: javascript

    web3.eth.signTransaction(transactionObject [, address,] [, callback])

Signs a transaction with the private key of the given address.
If the given address is a local unlocked account, the transaction will be signed locally.

----------
Parameters
----------


1. ``Object`` - The transaction data to sign :ref:`web3.eth.sendTransaction() <eth-sendtransaction>` for more.
1. ``string`` - The address of the account.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------


``Promise<object>`` - The RLP encoded transaction. The ``raw`` property can be used to send the transaction using :ref:`web3.eth.sendSignedTransaction <eth-sendsignedtransaction>`.


-------
Example
-------


.. code-block:: javascript

    web3.eth.signTransaction({
        from: "dsEB014f8c8B418Db6b45774c326A0E64C78914dC0",
        gasPrice: "20000000000",
        gas: "21000",
        to: 'ds3535353535353535353535353535353535353535',
        value: "1000000000000000000",
        data: ""
    }).then(console.log);
    > {
        raw: 'dsf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
        tx: {
            nonce: 'ds0',
            gasPrice: 'ds4a817c800',
            gas: 'ds5208',
            to: 'ds3535353535353535353535353535353535353535',
            value: 'dsde0b6b3a7640000',
            input: 'ds',
            v: 'ds25',
            r: 'ds4f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88d',
            s: 'ds7e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
            hash: 'dsda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
        }
    }

------------------------------------------------------------------------------

.. _eth-call:

call
=====================

.. code-block:: javascript

    web3.eth.call(callObject [, defaultBlock] [, callback])

Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.

----------
Parameters
----------

1. ``Object`` - A transaction object see :ref:`web3.eth.sendTransaction <eth-sendtransaction-return>`, with the difference that for calls the ``from`` property is optional as well.
2. ``Number|String`` - (optional) If you pass this parameter it will not use the default block set with :ref:`web3.eth.defaultBlock <eth-defaultblock>`.
3. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------

``Promise<string>`` - The returned data of the call, e.g. a smart contract functions return value.

-------
Example
-------


.. code-block:: javascript

    web3.eth.call({
        to: "ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", // contract address
        data: "dsc6888fa10000000000000000000000000000000000000000000000000000000000000003"
    }).then(console.log);
    > "ds000000000000000000000000000000000000000000000000000000000000000a"

------------------------------------------------------------------------------

estimateGas
=====================

.. code-block:: javascript

    web3.eth.estimateGas(callObject [, callback])

Executes a message call or transaction and returns the amount of the gas used.

----------
Parameters
----------


1. ``Object`` - A transaction object see :ref:`web3.eth.sendTransaction <eth-sendtransaction-return>`, with the difference that for calls the ``from`` property is optional as well.
2. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------

``Promise<number>`` - The used gas for the simulated call/transaction.

-------
Example
-------


.. code-block:: javascript

    web3.eth.estimateGas({
        to: "ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
        data: "dsc6888fa10000000000000000000000000000000000000000000000000000000000000003"
    }).then(console.log);
    > "ds0000000000000000000000000000000000000000000000000000000000000015"

------------------------------------------------------------------------------

getPastLogs
=====================

.. code-block:: javascript

    web3.eth.getPastLogs(options [, callback])

Gets past logs, matching the given options.

----------
Parameters
----------

1. ``Object`` - The filter options as follows:
  - ``fromBlock`` - ``Number|String``: The number of the earliest block (``"latest"`` may be given to mean the most recent and ``"pending"`` currently mining, block). By default ``"latest"``.
  - ``toBlock`` -  ``Number|String``: The number of the latest block (``"latest"`` may be given to mean the most recent and ``"pending"`` currently mining, block). By default ``"latest"``.
  - ``address`` -  ``String|Array``: An address or a list of addresses to only get logs from particular account(s).
  - ``topics`` - ``Array``: An array of values which must each appear in the log entries. The order is important, if you want to leave topics out use ``null``, e.g. ``[null, 'ds12...']``. You can also pass an array for each topic with options for that topic e.g. ``[null, ['option1', 'option2']]``


.. _eth-getpastlogs-return:

-------
Returns
-------

``Promise<Array>`` - Array of log objects.

The structure of the returned event ``Object`` in the ``Array`` looks as follows:

- ``address`` - ``String``: From which this event originated from.
- ``data`` - ``String``: The data containing non-indexed log parameter.
- ``topics`` - ``Array``: An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the log.
- ``logIndex`` - ``Number``: Integer of the event index position in the block.
- ``transactionIndex`` - ``Number``: Integer of the transaction's index position, the event was created in.
- ``transactionHash`` 32 Bytes - ``String``: Hash of the transaction this event was created in.
- ``blockHash`` 32 Bytes - ``String``: Hash of the block where this event was created in. ``null`` when its still pending.
- ``blockNumber`` - ``Number``: The block number where this log was created in. ``null`` when still pending.

-------
Example
-------

.. code-block:: javascript

    web3.eth.getPastLogs({
        address: "ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
        topics: ["ds033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"]
    }).then(console.log);
    > [{
        data: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
        logIndex: 0,
        transactionIndex: 0,
        transactionHash: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: 'dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: 1234,
        address: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },{...}]


------------------------------------------------------------------------------

getWork
=====================

.. code-block:: javascript

    web3.eth.getWork([callback])

Gets work for miners to mine on. Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").

----------
Parameters
----------

1. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------

``Promise<Array>`` - The mining work with the following structure:

    - ``String`` 32 Bytes - at **index 0**: current block header pow-hash
    - ``String`` 32 Bytes - at **index 1**: the seed hash used for the DAG.
    - ``String`` 32 Bytes - at **index 2**: the boundary condition ("target"), 2^256 / difficulty.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getWork().then(console.log);
    > [
      "ds1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "ds5EED00000000000000000000000000005EED0000000000000000000000000000",
      "dsd1ff1c01710000000000000000000000d1ff1c01710000000000000000000000"
    ]

------------------------------------------------------------------------------

submitWork
=====================

.. code-block:: javascript

    web3.eth.submitWork(nonce, powHash, digest, [callback])

Used for submitting a proof-of-work solution.

----------
Parameters
----------

1. ``String`` 8 Bytes: The nonce found (64 bits)
2. ``String`` 32 Bytes: The header's pow-hash (256 bits)
3. ``String`` 32 Bytes: The mix digest (256 bits)
4. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------

``Promise<boolean>`` - Returns ``true`` if the provided solution is valid, otherwise false.

-------
Example
-------


.. code-block:: javascript

    web3.eth.submitWork([
        "ds0000000000000001",
        "ds1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        "dsD1FE5700000000000000000000000000D1FE5700000000000000000000000000"
    ])
    .then(console.log);
    > true

------------------------------------------------------------------------------

requestAccounts
=====================

.. code-block:: javascript

    web3.eth.requestAccounts([callback])

This method will request/enable the accounts from the current environment it is running (Metamask, Status or Mist).
It doesn't work if you're connected to a node with a default Web3.js provider. (WebsocketProvider, HttpProvidder and IpcProvider)
This method will only work if you're using the injected provider from a application like Status, Mist or Metamask.

For further information about the behavior of this method please read the EIP of it: `EIP-1102 <https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md>`_

----------
Parameters
----------

1. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------

``Promise<Array>`` - Returns an array of enabled accounts.

-------
Example
-------


.. code-block:: javascript

    web3.eth.requestAccounts().then(console.log);
    > ['0aae0B295369a9FD31d5F28D9Ec85E40f4cb692BAf', dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe]

------------------------------------------------------------------------------

.. _eth-chainId:

getChainId
==========

.. code-block:: javascript

    web3.eth.getChainId([callback])

Returns the chain ID of the current connected node as described in the `EIP-695 <https://github.com/ethereum/EIPs/blob/master/EIPS/eip-695.md>`_.

-------
Returns
-------

``Promise<Number>`` - Returns chain ID.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getChainId().then(console.log);
    > 61

------------------------------------------------------------------------------

.. _eth-getNodeInfo:

getNodeInfo
===========

.. code-block:: javascript

    web3.eth.getNodeInfo([callback])

-------
Returns
-------

``Promise<String>`` - The current client version.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getNodeInfo().then(console.log);
    > "Mist/v0.9.3/darwin/go1.4.1"

------------------------------------------------------------------------------

.. _eth-getProof:

getProof
========

.. code-block:: javascript

    web3.eth.getProof(address, storageKey, blockNumber, [callback])

Returns the account and storage-values of the specified account including the Merkle-proof as described in `EIP-1186 <https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1186.md>`_.

----------
Parameters
----------

1. ``String`` 20 Bytes:  The Address of the account or contract.
2. ``Array`` 32 Bytes: Array of storage-keys which should be proofed and included. See :ref:`web3.eth.getStorageAt <eth-getStorageAt>`.
3. ``Number | String | "latest" | "earliest"``: Integer block number, or the string "latest" or "earliest".
4. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------

``Promise<Object>`` - A account object.

    ``balance`` - The balance of the account. See :ref:`web3.eth.getBalance <eth-getBalance>`.
    ``codeHash`` -  hash of the code of the account. For a simple Account without code it will return "dsc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
    ``nonce`` -  Nonce of the account.
    ``storageHash`` - SHA3 of the StorageRoot. All storage will deliver a MerkleProof starting with this rootHash.
    ``accountProof`` - Array of rlp-serialized MerkleTree-Nodes, starting with the stateRoot-Node, following the path of the SHA3 (address) as key.
    ``storageProof`` - Array of storage-entries as requested.
    ``key`` -  The requested storage key.
    ``value`` -  The storage value.

-------
Example
-------


.. code-block:: javascript

    web3.eth.getProof(
        "ds1234567890123456789012345678901234567890",
        ["ds0000000000000000000000000000000000000000000000000000000000000000","ds0000000000000000000000000000000000000000000000000000000000000001"],
        "latest"
    ).then(console.log);
    > {
        "address": "ds1234567890123456789012345678901234567890",
        "accountProof": [
            "dsf90211a090dcaf88c40c7bbc95a912cbdde67c175767b31173df9ee4b0d733bfdd511c43a0babe369f6b12092f49181ae04ca173fb68d1a5456f18d20fa32cba73954052bda0473ecf8a7e36a829e75039a3b055e51b8332cbf03324ab4af2066bbd6fbf0021a0bbda34753d7aa6c38e603f360244e8f59611921d9e1f128372fec0d586d4f9e0a04e44caecff45c9891f74f6a2156735886eedf6f1a733628ebc802ec79d844648a0a5f3f2f7542148c973977c8a1e154c4300fec92f755f7846f1b734d3ab1d90e7a0e823850f50bf72baae9d1733a36a444ab65d0a6faaba404f0583ce0ca4dad92da0f7a00cbe7d4b30b11faea3ae61b7f1f2b315b61d9f6bd68bfe587ad0eeceb721a07117ef9fc932f1a88e908eaead8565c19b5645dc9e5b1b6e841c5edbdfd71681a069eb2de283f32c11f859d7bcf93da23990d3e662935ed4d6b39ce3673ec84472a0203d26456312bbc4da5cd293b75b840fc5045e493d6f904d180823ec22bfed8ea09287b5c21f2254af4e64fca76acc5cd87399c7f1ede818db4326c98ce2dc2208a06fc2d754e304c48ce6a517753c62b1a9c1d5925b89707486d7fc08919e0a94eca07b1c54f15e299bd58bdfef9741538c7828b5d7d11a489f9c20d052b3471df475a051f9dd3739a927c89e357580a4c97b40234aa01ed3d5e0390dc982a7975880a0a089d613f26159af43616fd9455bb461f4869bfede26f2130835ed067a8b967bfb80",
            "dsf90211a0395d87a95873cd98c21cf1df9421af03f7247880a2554e20738eec2c7507a494a0bcf6546339a1e7e14eb8fb572a968d217d2a0d1f3bc4257b22ef5333e9e4433ca012ae12498af8b2752c99efce07f3feef8ec910493be749acd63822c3558e6671a0dbf51303afdc36fc0c2d68a9bb05dab4f4917e7531e4a37ab0a153472d1b86e2a0ae90b50f067d9a2244e3d975233c0a0558c39ee152969f6678790abf773a9621a01d65cd682cc1be7c5e38d8da5c942e0a73eeaef10f387340a40a106699d494c3a06163b53d956c55544390c13634ea9aa75309f4fd866f312586942daf0f60fb37a058a52c1e858b1382a8893eb9c1f111f266eb9e21e6137aff0dddea243a567000a037b4b100761e02de63ea5f1fcfcf43e81a372dafb4419d126342136d329b7a7ba032472415864b08f808ba4374092003c8d7c40a9f7f9fe9cc8291f62538e1cc14a074e238ff5ec96b810364515551344100138916594d6af966170ff326a092fab0a0d31ac4eef14a79845200a496662e92186ca8b55e29ed0f9f59dbc6b521b116fea090607784fe738458b63c1942bba7c0321ae77e18df4961b2bc66727ea996464ea078f757653c1b63f72aff3dcc3f2a2e4c8cb4a9d36d1117c742833c84e20de994a0f78407de07f4b4cb4f899dfb95eedeb4049aeb5fc1635d65cf2f2f4dfd25d1d7a0862037513ba9d45354dd3e36264aceb2b862ac79d2050f14c95657e43a51b85c80",
            "dsf90171a04ad705ea7bf04339fa36b124fa221379bd5a38ffe9a6112cb2d94be3a437b879a08e45b5f72e8149c01efcb71429841d6a8879d4bbe27335604a5bff8dfdf85dcea00313d9b2f7c03733d6549ea3b810e5262ed844ea12f70993d87d3e0f04e3979ea0b59e3cdd6750fa8b15164612a5cb6567cdfb386d4e0137fccee5f35ab55d0efda0fe6db56e42f2057a071c980a778d9a0b61038f269dd74a0e90155b3f40f14364a08538587f2378a0849f9608942cf481da4120c360f8391bbcc225d811823c6432a026eac94e755534e16f9552e73025d6d9c30d1d7682a4cb5bd7741ddabfd48c50a041557da9a74ca68da793e743e81e2029b2835e1cc16e9e25bd0c1e89d4ccad6980a041dda0a40a21ade3a20fcd1a4abb2a42b74e9a32b02424ff8db4ea708a5e0fb9a09aaf8326a51f613607a8685f57458329b41e938bb761131a5747e066b81a0a16808080a022e6cef138e16d2272ef58434ddf49260dc1de1f8ad6dfca3da5d2a92aaaadc58080",
            "dsf851808080a009833150c367df138f1538689984b8a84fc55692d3d41fe4d1e5720ff5483a6980808080808080808080a0a319c1c415b271afc0adcb664e67738d103ac168e0bc0b7bd2da7966165cb9518080"
            ],
            "balance": 0,
            "codeHash": "dsc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
            "nonce": 0,
            "storageHash": "ds56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
            "storageProof": [
            {
                "key": "ds0000000000000000000000000000000000000000000000000000000000000000",
                "value": '0',
                "proof": []
            },
            {
                "key": "ds0000000000000000000000000000000000000000000000000000000000000001",
                "value": '0',
                "proof": []
            }
        ]
    }

------------------------------------------------------------------------------
