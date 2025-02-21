.. _eth-contract:

.. include:: include_announcement.rst

=================
web3.eth.Contract
=================

The ``web3.eth.Contract`` object makes it easy to interact with smart contracts on the Ethereum blockchain.
When you create a new contract object you give it the json interface of the respective smart contract
and web3 will auto convert all calls into low level ABI calls over RPC for you.

This allows you to interact with smart contracts as if they were JavaScript objects.

To use it standalone:

.. code-block:: javascript
    import {Contract} from 'web3-eth-contract';
    import {Accounts} from 'web3-eth-accounts;

    const contract = new Contract(
        'ws://localhost:8546',
        new Accounts('ws://localhost:8546', options),
        abi,
        address,
        options
    );

    contract.methods.somFunc().send({from: ....}).on('receipt', () => {
        ...
    });


------------------------------------------------------------------------------


web3.eth.Contract
=================

.. index:: JSON interface

.. code-block:: javascript

    new web3.eth.Contract(jsonInterface, address, options)

Creates a new contract instance with all its methods and events defined in its :ref:`json interface <glossary-json-interface>` object.

----------
Parameters
----------

1. ``jsonInterface`` - ``Array``: The json interface for the contract to instantiate
2. ``address`` - ``String`` (optional): This address is necessary for transactions and call requests and can also be added later using ``myContract.options.address = 'ds1234..'.``
3. ``options`` - ``Object`` (optional): The options of the contract. Some are used as fallbacks for calls and transactions:
    * ``data`` - ``String``: The byte code of the contract. Used when the contract gets :ref:`deployed <contract-deploy>`.
    * ``address`` - ``String``: The address where the contract is deployed. See :ref:`address <contract-address>`.
    * :ref:`defaultAccount <web3-module-defaultaccount>`
    * :ref:`defaultBlock <web3-module-defaultblock>`
    * :ref:`defaultGas <web3-module-defaultgas>`
    * :ref:`defaultGasPrice <web3-module-defaultaccount>`
    * :ref:`transactionBlockTimeout <web3-module-transactionblocktimeout>`
    * :ref:`transactionConfirmationBlocks <web3-module-transactionconfirmationblocks>`
    * :ref:`transactionPollingTimeout <web3-module-transactionpollingtimeout>`
    * :ref:`transactionSigner <web3-module-transactionSigner>`

-------
Returns
-------

``Object``: The contract instance with all its methods and events.


-------
Example
-------

.. code-block:: javascript

    const myContract = new web3.eth.Contract([...], 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
        defaultAccount: 'ds1234567890123456789012345678901234567891', // default from address
        defaultGasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });


------------------------------------------------------------------------------


= Properties =
=========

.. _contract-options:

options
=======

The contract options object has the following properties:

- ``data`` - ``String``: The contract bytecode.
- ``address`` - ``String`` (deprecated use ``contract.address``): The address of the contract.


------------------------------------------------------------------------------

.. _contract-address:

address
=========

.. code-block:: javascript

    myContract.address

The address used for this contract instance.
All transactions generated by web3.js from this contract will contain this address as the "to".

The address will be stored in lowercase.


-------
Property
-------

``address`` - ``String|null``: The address for this contract, or ``null`` if it's not yet set.


-------
Example
-------

.. code-block:: javascript

    myContract.address;
    > 'dsde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

    // set a new address
    myContract.address = 'ds1234FFDD...';


------------------------------------------------------------------------------

.. _contract-json-interface:

jsonInterface
=========

.. code-block:: javascript

    myContract.jsonInterface

The :ref:`json interface <glossary-json-interface>` object derived from the `ABI <https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI>`_ of this contract.


-------
Property
-------

``jsonInterface`` - ``AbiModel``: The :ref:`json interface <glossary-json-interface>` for this contract. Re-setting this will regenerate the methods and events of the contract instance.

--------
AbiModel
--------

.. code-block:: javascript

    interface AbiModel {
        getMethod(name: string): AbiItemModel | false;
        getMethods(): AbiItemModel[];
        hasMethod(name: string): boolean;
        getEvent(name: string): AbiItemModel | false;
        getEvents(): AbiItemModel[];
        getEventBySignature(signature: string): AbiItemModel;
        hasEvent(name: string): boolean;
    }

    interface AbiItemModel {
        name: string;
        signature: string;
        payable: boolean;
        anonymous: boolean;
        getInputLength(): Number;
        getInputs(): AbiInput[];
        getIndexedInputs(): AbiInput[];
        getOutputs(): AbiOutput[];
        isOfType(): boolean;
    }

    interface AbiInput {
        name: string;
        type: string;
        indexed?: boolean;
        components?: AbiInput[];
    }

    interface AbiOutput {
        name: string;
        type: string;
        components?: AbiOutput[];
    }




------------------------------------------------------------------------------


= Methods =
=========


------------------------------------------------------------------------------

clone
=====================

.. code-block:: javascript

    myContract.clone()

Clones the current contract instance.

----------
Parameters
----------

none

-------
Returns
-------


``Object``: The new contract instance.

-------
Example
-------

.. code-block:: javascript

    const contract1 = new eth.Contract(abi, address, {gasPrice: '12345678', defaultAccount: fromAddress});

    const contract2 = contract1.clone();
    contract2.address = address2;

    (contract1.address !== contract2.address);
    > true

------------------------------------------------------------------------------


.. _contract-deploy:

.. index:: contract deploy

deploy
=====================

.. code-block:: javascript

    myContract.deploy(options)

Call this function to deploy the contract to the blockchain.
After successful deployment the promise will resolve with a new contract instance.

----------
Parameters
----------

1. ``options`` - ``Object``: The options used for deployment.
    * ``data`` - ``String``: The byte code of the contract.
    * ``arguments`` - ``Array`` (optional): The arguments which get passed to the constructor on deployment.

-------
Returns
-------


``Object``: The transaction object:

- ``Array`` - arguments: The arguments passed to the method before. They can be changed.
- ``Function`` - :ref:`send <contract-send>`: Will deploy the contract. The promise will resolve with the new contract instance, instead of the receipt!
- ``Function`` - :ref:`estimateGas <contract-estimateGas>`: Will estimate the gas used for deploying.
- ``Function`` - :ref:`encodeABI <contract-encodeABI>`: Encodes the ABI of the deployment, which is contract data + constructor parameters

 For details to the methods see the documentation below.

-------
Example
-------

.. code-block:: javascript

    myContract.deploy({
        data: 'ds12345...',
        arguments: [123, 'My String']
    })
    .send({
        from: 'ds1234567890123456789012345678901234567891',
        gas: 1500000,
        gasPrice: '30000000000000'
    }, (error, transactionHash) => { ... })
    .on('error', (error) => { ... })
    .on('transactionHash', (transactionHash) => { ... })
    .on('receipt', (receipt) => {
       console.log(receipt.contractAddress) // contains the new contract address
    })
    .on('confirmation', (confirmationNumber, receipt) => { ... })
    .then((newContractInstance) => {
        console.log(newContractInstance.options.address) // instance with the new contract address
    });


    // When the data is already set as an option to the contract itself
    myContract.options.data = 'ds12345...';

    myContract.deploy({
        arguments: [123, 'My String']
    })
    .send({
        from: 'ds1234567890123456789012345678901234567891',
        gas: 1500000,
        gasPrice: '30000000000000'
    })
    .then((newContractInstance) => {
        console.log(newContractInstance.options.address) // instance with the new contract address
    });


    // Simply encoding
    myContract.deploy({
        data: 'ds12345...',
        arguments: [123, 'My String']
    })
    .encodeABI();
    > 'ds12345...0000012345678765432'


    // Gas estimation
    myContract.deploy({
        data: 'ds12345...',
        arguments: [123, 'My String']
    })
    .estimateGas((err, gas) => {
        console.log(gas);
    });

------------------------------------------------------------------------------


methods
=====================

.. code-block:: javascript

    myContract.methods.myMethod([param1[, param2[, ...]]])

Creates a transaction object for that method, which then can be :ref:`called <contract-call>`, :ref:`send <contract-send>`, :ref:`estimated  <contract-estimateGas>`or :ref:`ABI encoded <contract-encodeABI>`.

The methods of this smart contract are available through:

- The name: ``myContract.methods.myMethod(123)``
- The name with parameters: ``myContract.methods['myMethod(uint256)'](123)``
- The signature: ``myContract.methods['ds58cf5f10'](123)``

This allows calling functions with same name but different parameters from the JavaScript contract object.

----------
Parameters
----------

Parameters of any method depend on the smart contracts methods, defined in the :ref:`JSON interface <glossary-json-interface>`.

-------
Returns
-------

``Object``: The Transaction Object:

- ``Array`` - arguments: The arguments passed to the method before. They can be changed.
- ``Function`` - :ref:`call <contract-call>`: Will call the "constant" method and execute its smart contract method in the EVM without sending a transaction (Can't alter the smart contract state).
- ``Function`` - :ref:`send <contract-send>`: Will send a transaction to the smart contract and execute its method (Can alter the smart contract state).
- ``Function`` - :ref:`estimateGas <contract-estimateGas>`: Will estimate the gas used when the method would be executed on chain.
- ``Function`` - :ref:`encodeABI <contract-encodeABI>`: Encodes the ABI for this method. This can be send using a transaction, call the method or passing into another smart contracts method as argument.

 For details to the methods see the documentation below.

-------
Example
-------

.. code-block:: javascript

    // calling a method

    myContract.methods.myMethod(123).call({from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, (error, result) => {
        ...
    });

    // or sending and using a promise
    myContract.methods.myMethod(123).send({from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
    .then((receipt) => {
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    });

    // or sending and using the events

    myContract.methods.myMethod(123).send({from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
    .on('transactionHash', (hash) => {
        ...
    })
    .on('receipt', (receipt) => {
        ...
    })
    .on('confirmation', (confirmationNumber, receipt) => {
        ...
    })
    .on('error', console.error);


------------------------------------------------------------------------------


.. _contract-call:

methods.myMethod.call
=====================

.. code-block:: javascript

    myContract.methods.myMethod([param1[, param2[, ...]]]).call(transactionObject, blockNumber, callback])

Will call a "constant" method and execute its smart contract method in the EVM without sending any transaction. Note calling can not alter the smart contract state.

----------
Parameters
----------

``options`` - ``Object`` (optional): The options used for calling.
1.* ``transactionObject``
    * ``from`` - ``String`` (optional): The address the call "transaction" should be made from.
    * ``gasPrice`` - ``String`` (optional): The gas price in wei to use for this call "transaction".It is the wei per unit of gas.
    * ``gas`` - ``Number`` (optional): The maximum gas provided for this call "transaction" (gas limit).
2.*``blockNumber`` - ``Number``: The block number this log was created in. ``null`` when still pending.
3.*``callback`` - ``Function`` (optional): This callback will be fired with the result of the smart contract method execution as the second argument, or with an error object as the first argument.

-------
Returns
-------

``Promise<any>`` - The return value(s) of the smart contract method.
If it returns a single value, it's returned as is. If it has multiple return values they are returned as an object with properties and indices:

-------
Example
-------

.. code-block:: javascript

    // using the callback
    myContract.methods.myMethod(123).call({from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, (error, result) => {
        ...
    });

    // using the promise
    myContract.methods.myMethod(123).call({from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
    .then((result) => {
        ...
    });


    // MULTI-ARGUMENT RETURN:

    // Solidity
    contract MyContract {
        function myFunction() returns(uint256 myNumber, string myString) {
            return (23456, "Hello!%");
        }
    }

    // web3.js
    const MyContract = new web3.eth.Contract(abi, address);
    MyContract.methods.myFunction().call()
    .then(console.log);
    > Result {
        myNumber: '23456',
        myString: 'Hello!%',
        0: '23456', // these are here as fallbacks if the name is not know or given
        1: 'Hello!%'
    }


    // SINGLE-ARGUMENT RETURN:

    // Solidity
    contract MyContract {
        function myFunction() returns(string myString) {
            return "Hello!%";
        }
    }

    // web3.js
    const MyContract = new web3.eth.Contract(abi, address);
    MyContract.methods.myFunction().call()
    .then(console.log);
    > "Hello!%"



------------------------------------------------------------------------------

.. _contract-send:

methods.myMethod.send
=====================

.. code-block:: javascript

    myContract.methods.myMethod([param1[, param2[, ...]]]).send(options[, callback])

Will send a transaction to the smart contract and execute its method. Note this can alter the smart contract state.

----------
Parameters
----------

1. ``options`` - ``Object``: The options used for sending.
    * ``from`` - ``String``: The address the transaction should be sent from.
    * ``gasPrice`` - ``String`` (optional): The gas price in wei to use for this transaction.It is the wei per unit of gas.
    * ``gas`` - ``Number`` (optional): The maximum gas provided for this transaction (gas limit).
    * ``value`` - ``Number|String|BN|BigNumber``(optional): The value transferred for the transaction in wei.
2. ``callback`` - ``Function`` (optional): This callback will be fired first with the "transactionHash", or with an error object as the first argument.

-------
Returns
-------

The **callback** will return the 32 bytes transaction hash.

``PromiEvent``: A :ref:`promise combined event emitter <promiEvent>`. Will be resolved when the transaction *receipt* is available, OR if this ``send()`` is called from a ``someContract.deploy()``, then the promise will resolve with the *new contract instance*. Additionally the following events are available:

- ``"transactionHash"`` returns ``String``: is fired right after the transaction is sent and a transaction hash is available.
- ``"receipt"`` returns ``Object``: is fired when the transaction *receipt* is available. Receipts from contracts will have no ``logs`` property, but instead an ``events`` property with event names as keys and events as properties. See :ref:`getPastEvents return values <contract-events-return>` for details about the returned event object.
- ``"confirmation"`` returns ``Number``, ``Object``: is fired for every confirmation up to the 24th confirmation. Receives the confirmation number as the first and the receipt as the second argument. Fired from confirmation 1 on, which is the block where it's mined.
- ``"error"`` returns ``Error``: is fired if an error occurs during sending. If an out of gas error, the second parameter is the receipt.


-------
Example
-------

.. code-block:: javascript

    // using the callback
    myContract.methods.myMethod(123).send({from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, (error, transactionHash) => {
        ...
    });

    // using the promise
    myContract.methods.myMethod(123).send({from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
    .then((receipt) => {
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    });


    // using the event emitter
    myContract.methods.myMethod(123).send({from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
    .on('transactionHash', (hash) => {
        ...
    })
    .on('confirmation', (confirmationNumber, receipt) => {
        ...
    })
    .on('receipt', (receipt) => {
        // receipt example
        console.log(receipt);
        > {
            "transactionHash": "ds9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
            "transactionIndex": 0,
            "blockHash": "dsef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
            "blockNumber": 3,
            "contractAddress": "ds11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
            "cumulativeGasUsed": 314159,
            "gasUsed": 30234,
            "events": {
                "MyEvent": {
                    returnValues: {
                        myIndexedParam: 20,
                        myOtherIndexedParam: 'ds123456789...',
                        myNonIndexParam: 'My String'
                    },
                    raw: {
                        data: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
                        topics: ['dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
                    },
                    event: 'MyEvent',
                    signature: 'dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
                    logIndex: 0,
                    transactionIndex: 0,
                    transactionHash: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
                    blockHash: 'dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
                    blockNumber: 1234,
                    address: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
                },
                "MyOtherEvent": {
                    ...
                },
                "MyMultipleEvent":[{...}, {...}] // If there are multiple of the same event, they will be in an array
            }
        }
    })
    .on('error', console.error); // If there's an out of gas error the second parameter is the receipt.


------------------------------------------------------------------------------


.. _contract-estimateGas:

methods.myMethod.estimateGas
============================

.. code-block:: javascript

    myContract.methods.myMethod([param1[, param2[, ...]]]).estimateGas(options[, callback])


Will call estimate the gas a method execution will take when executed in the EVM without sending a transaction.
The estimation can differ from the actual gas used when later sending a transaction, as the state of the smart contract can be different at that time.

----------
Parameters
----------

1. ``options`` - ``Object`` (optional): The options used for calling.
    * ``from`` - ``String`` (optional): The address the call "transaction" should be made from.
    * ``gas`` - ``Number`` (optional): The maximum gas provided for this call "transaction" (gas limit). Setting a specific value helps to detect out of gas errors. If all gas is used it will return the same number.
    * ``value`` - ``Number|String|BN|BigNumber``(optional): The value transferred for the call "transaction" in wei.
2. ``callback`` - ``Function`` (optional): This callback will be fired with the result of the gas estimation as the second argument, or with an error object as the first argument.

-------
Returns
-------

``Promise<number>`` - The gas amount estimated.

-------
Example
-------

.. code-block:: javascript

    // using the callback
    myContract.methods.myMethod(123).estimateGas({gas: 5000000}, function(error, gasAmount){
        if(gasAmount == 5000000)
            console.log('Method ran out of gas');
    });

    // using the promise
    myContract.methods.myMethod(123).estimateGas({from: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
    .then(function(gasAmount){
        ...
    })
    .catch(function(error){
        ...
    });


------------------------------------------------------------------------------


.. _contract-encodeABI:

methods.myMethod.encodeABI
==========================

.. code-block:: javascript

    myContract.methods.myMethod([param1[, param2[, ...]]]).encodeABI()

Encodes the ABI for this method. This can be used to send a transaction, call a method, or pass it into another smart contracts method as arguments.


----------
Parameters
----------

none

-------
Returns
-------

``String``: The encoded ABI byte code to send via a transaction or call.

-------
Example
-------

.. code-block:: javascript

    myContract.methods.myMethod(123).encodeABI();
    > 'ds58cf5f1000000000000000000000000000000000000000000000000000000000000007B'


------------------------------------------------------------------------------


= Events =
=========


------------------------------------------------------------------------------


once
=====================

.. code-block:: javascript

    myContract.once(event[, options], callback)

Subscribes to an event and unsubscribes immediately after the first event or error. Will only fire for a single event.

----------
Parameters
----------

1. ``event`` - ``String``: The name of the event in the contract, or ``"allEvents"`` to get all events.
2. ``options`` - ``Object`` (optional): The options used for deployment.
    * ``filter`` - ``Object`` (optional): Lets you filter events by indexed parameters, e.g. ``{filter: {myNumber: [12,13]}}`` means all events where "myNumber" is 12 or 13.
    * ``topics`` - ``Array`` (optional): This allows you to manually set the topics for the event filter. If given the filter property and event signature, (topic[0]) will not be set automatically.
3. ``callback`` - ``Function``: This callback will be fired for the first *event* as the second argument, or an error as the first argument. See :ref:`getPastEvents return values <contract-events-return>` for details about the event structure.

-------
Returns
-------

``undefined``

-------
Example
-------

.. code-block:: javascript

    myContract.once('MyEvent', {
        filter: {myIndexedParam: [20,23], myOtherIndexedParam: 'ds123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0
    }, (error, event) => { console.log(event); });

    // event output example
    > {
        returnValues: {
            myIndexedParam: 20,
            myOtherIndexedParam: 'ds123456789...',
            myNonIndexParam: 'My String'
        },
        raw: {
            data: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
            topics: ['dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
        },
        event: 'MyEvent',
        signature: 'dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        logIndex: 0,
        transactionIndex: 0,
        transactionHash: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: 'dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: 1234,
        address: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    }


------------------------------------------------------------------------------

.. _contract-events:

events
======

.. code-block:: javascript

    myContract.events.MyEvent([options][, callback])

Subscribe to an event

----------
Parameters
----------

1. ``options`` - ``Object`` (optional): The options used for deployment.
    * ``filter`` - ``Object`` (optional): Let you filter events by indexed parameters, e.g. ``{filter: {myNumber: [12,13]}}`` means all events where "myNumber" is 12 or 13.
    * ``fromBlock`` - ``Number`` (optional): The block number from which to get events on.
    * ``topics`` - ``Array`` (optional): This allows to manually set the topics for the event filter. If given the filter property and event signature, (topic[0]) will not be set automatically.
2. ``callback`` - ``Function`` (optional): This callback will be fired for each *event* as the second argument, or an error as the first argument.

.. _contract-events-return:

-------
Returns
-------

``EventEmitter``: The event emitter has the following events:

- ``"data"`` returns ``Object``: Fires on each incoming event with the event object as argument.
- ``"changed"`` returns ``Object``: Fires on each event which was removed from the blockchain. The event will have the additional property ``"removed: true"``.
- ``"error"`` returns ``Object``: Fires when an error in the subscription occurs.


The structure of the returned event ``Object`` looks as follows:

- ``event`` - ``String``: The event name.
- ``signature`` - ``String|Null``: The event signature, ``null`` if it's an anonymous event.
- ``address`` - ``String``: Address this event originated from.
- ``returnValues`` - ``Object``: The return values coming from the event, e.g. ``{myVar: 1, myVar2: 'ds234...'}``.
- ``logIndex`` - ``Number``: Integer of the event index position in the block.
- ``transactionIndex`` - ``Number``: Integer of the transaction's index position the event was created in.
- ``transactionHash`` 32 Bytes - ``String``: Hash of the transaction this event was created in.
- ``blockHash`` 32 Bytes - ``String``: Hash of the block this event was created in. ``null`` when it's still pending.
- ``blockNumber`` - ``Number``: The block number this log was created in. ``null`` when still pending.
- ``raw.data`` - ``String``: The data containing non-indexed log parameter.
- ``raw.topics`` - ``Array``: An array with max 4 32 Byte topics, topic 1-3 contains indexed parameters of the event.

-------
Example
-------

.. code-block:: javascript

    myContract.events.MyEvent({
        filter: {myIndexedParam: [20,23], myOtherIndexedParam: 'ds123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0
    }, (error, event) => { console.log(event); })
    .on('data', (event) => {
        console.log(event); // same results as the optional callback above
    })
    .on('changed', (event) => {
        // remove event from local database
    })
    .on('error', console.error);

    // event output example
    > {
        returnValues: {
            myIndexedParam: 20,
            myOtherIndexedParam: 'ds123456789...',
            myNonIndexParam: 'My String'
        },
        raw: {
            data: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
            topics: ['dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
        },
        event: 'MyEvent',
        signature: 'dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        logIndex: 0,
        transactionIndex: 0,
        transactionHash: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: 'dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: 1234,
        address: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    }


------------------------------------------------------------------------------

events.allEvents
================

.. code-block:: javascript

    myContract.events.allEvents([options][, callback])

Same as :ref:`events <contract-events>` but receives all events from this smart contract.
Optionally the filter property can filter those events.


------------------------------------------------------------------------------


getPastEvents
=============

.. code-block:: javascript

    myContract.getPastEvents(event[, options][, callback])

Gets past events for this contract.

----------
Parameters
----------

1. ``event`` - ``String``: The name of the event in the contract, or ``"allEvents"`` to get all events.
2. ``options`` - ``Object`` (optional): The options used for deployment.
    * ``filter`` - ``Object`` (optional): Lets you filter events by indexed parameters, e.g. ``{filter: {myNumber: [12,13]}}`` means all events where "myNumber" is 12 or 13.
    * ``fromBlock`` - ``Number`` (optional): The block number from which to get events on.
    * ``toBlock`` - ``Number`` (optional): The block number to get events up to (Defaults to ``"latest"``).
    * ``topics`` - ``Array`` (optional): This allows manually setting the topics for the event filter. If given the filter property and event signature, (topic[0]) will not be set automatically.
3. ``callback`` - ``Function`` (optional): This callback will be fired with an array of event logs as the second argument, or an error as the first argument.


-------
Returns
-------

``Promise`` returns ``Array``: An array with the past event ``Objects``, matching the given event name and filter.

For the structure of a returned event ``Object`` see :ref:`getPastEvents return values <contract-events-return>`.

-------
Example
-------

.. code-block:: javascript

    myContract.getPastEvents('MyEvent', {
        filter: {myIndexedParam: [20,23], myOtherIndexedParam: 'ds123456789...'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
        toBlock: 'latest'
    }, (error, events) => { console.log(events); })
    .then((events) => {
        console.log(events) // same results as the optional callback above
    });

    > [{
        returnValues: {
            myIndexedParam: 20,
            myOtherIndexedParam: 'ds123456789...',
            myNonIndexParam: 'My String'
        },
        raw: {
            data: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
            topics: ['dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
        },
        event: 'MyEvent',
        signature: 'dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        logIndex: 0,
        transactionIndex: 0,
        transactionHash: 'ds7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: 'dsfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: 1234,
        address: 'dsde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },{
        ...
    }]

