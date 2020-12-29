.. _eth-txpool:

.. include:: include_announcement.rst

=============
TxPool Module
=============


The ``web3-eth-txpool`` package gives you access to several non-standard RPC methods to inspect the contents of the transaction pool containing all the currently pending transactions as well as the ones queued for future processing.


.. code-block:: javascript

    import Web3 from 'web3';
    import {TxPool} from 'web3-eth-txpool';

    // "Web3.givenProvider" will be set if in an Ethereum supported browser.
    const txPool = new TxPool(Web3.givenProvider || 'ws://some.local-or-remote.node:8546', null, options);


------------------------------------------------------------------------------


.. include:: include_package-core.rst



------------------------------------------------------------------------------

.. _txpool-content:

getContent
==========

.. code-block:: javascript

    txPool.getContent([callback])

This API can be used to list the exact details of all the transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future executions.
The RPC method used is ``txpool_content``.

----------
Parameters
----------

1. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.

-------
Returns
-------

``Promise<Object>`` - The list of pending as well as queued transactions.

    - ``pending`` - ``Object``: List of pending transactions with transaction details.
    - ``queued`` - ``Object``: List of queued transactions with transaction details.

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

    txPool.getContent().then(console.log);
    > {
        pending: {
            ds0216d5032f356960cd3749c31ab34eeff21b3395: {
            806: [{
                blockHash: "ds0000000000000000000000000000000000000000000000000000000000000000",
                blockNumber: null,
                from: "ds0216d5032f356960cd3749c31ab34eeff21b3395",
                gas: "ds5208",
                gasPrice: "dsba43b7400",
                hash: "dsaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586",
                input: "ds",
                nonce: "ds326",
                to: "ds7f69a91a3cf4be60020fb58b893b7cbb65376db8",
                transactionIndex: null,
                value: "ds19a99f0cf456000"
            }]
            },
            ds24d407e5a0b506e1cb2fae163100b5de01f5193c: {
            34: [{
                blockHash: "ds0000000000000000000000000000000000000000000000000000000000000000",
                blockNumber: null,
                from: "ds24d407e5a0b506e1cb2fae163100b5de01f5193c",
                gas: "ds44c72",
                gasPrice: "ds4a817c800",
                hash: "dsb5b8b853af32226755a65ba0602f7ed0e8be2211516153b75e9ed640a7d359fe",
                input: "dsb61d27f600000000000000000000000024d407e5a0b506e1cb2fae163100b5de01f5193c00000000000000000000000000000000000000000000000053444835ec580000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                nonce: "ds22",
                to: "ds7320785200f74861b69c49e4ab32399a71b34f1a",
                transactionIndex: null,
                value: "ds0"
            }]
            }
        },
        queued: {
            ds976a3fc5d6f7d259ebfb4cc2ae75115475e9867c: {
                3: [{
                    blockHash: "ds0000000000000000000000000000000000000000000000000000000000000000",
                    blockNumber: null,
                    from: "ds976a3fc5d6f7d259ebfb4cc2ae75115475e9867c",
                    gas: "ds15f90",
                    gasPrice: "ds4a817c800",
                    hash: "ds57b30c59fc39a50e1cba90e3099286dfa5aaf60294a629240b5bbec6e2e66576",
                    input: "ds",
                    nonce: "ds3",
                    to: "ds346fb27de7e7370008f5da379f74dd49f5f2f80f",
                    transactionIndex: null,
                    value: "ds1f161421c8e0000"
                }]
            },
            ds9b11bf0459b0c4b2f87f8cebca4cfc26f294b63a: {
                2: [{
                    blockHash: "ds0000000000000000000000000000000000000000000000000000000000000000",
                    blockNumber: null,
                    from: "ds9b11bf0459b0c4b2f87f8cebca4cfc26f294b63a",
                    gas: "ds15f90",
                    gasPrice: "dsba43b7400",
                    hash: "ds3a3c0698552eec2455ed3190eac3996feccc806970a4a056106deaf6ceb1e5e3",
                    input: "ds",
                    nonce: "ds2",
                    to: "ds24a461f25ee6a318bdef7f33de634a67bb67ac9d",
                    transactionIndex: null,
                    value: "dsebec21ee1da40000"
                }]
            }
        }
    }

------------------------------------------------------------------------------


getInspection
=============

.. code-block:: javascript

    txPool.getInspection([, callback])

The property can be queried to list a textual summary of all the transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future executions. 
The RPC method used is ``txpool_inspect``.

----------
Parameters
----------


1. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------


``Promise<Object>`` - The List of pending and queued transactions summary.

    - ``pending`` - ``Object``: List of pending transactions with transaction details.
    - ``queued`` - ``Object``: List of queued transactions with transaction details.

-------
Example
-------


.. code-block:: javascript

    txPool.getInspection().then(console.log);
    > {
        pending: {
            ds26588a9301b0428d95e6fc3a5024fce8bec12d51: {
            31813: ["ds3375ee30428b2a71c428afa5e89e427905f95f7e: 0 wei + 500000 × 20000000000 gas"]
            },
            ds2a65aca4d5fc5b5c859090a6c34d164135398226: {
            563662: ["ds958c1fa64b34db746925c6f8a3dd81128e40355e: 1051546810000000000 wei + 90000 × 20000000000 gas"],
            563663: ["ds77517b1491a0299a44d668473411676f94e97e34: 1051190740000000000 wei + 90000 × 20000000000 gas"],
            563664: ["ds3e2a7fe169c8f8eee251bb00d9fb6d304ce07d3a: 1050828950000000000 wei + 90000 × 20000000000 gas"],
            563665: ["dsaf6c4695da477f8c663ea2d8b768ad82cb6a8522: 1050544770000000000 wei + 90000 × 20000000000 gas"],
            563666: ["ds139b148094c50f4d20b01caf21b85edb711574db: 1048598530000000000 wei + 90000 × 20000000000 gas"],
            563667: ["ds48b3bd66770b0d1eecefce090dafee36257538ae: 1048367260000000000 wei + 90000 × 20000000000 gas"],
            563668: ["ds468569500925d53e06dd0993014ad166fd7dd381: 1048126690000000000 wei + 90000 × 20000000000 gas"],
            563669: ["ds3dcb4c90477a4b8ff7190b79b524773cbe3be661: 1047965690000000000 wei + 90000 × 20000000000 gas"],
            563670: ["ds6dfef5bc94b031407ffe71ae8076ca0fbf190963: 1047859050000000000 wei + 90000 × 20000000000 gas"]
            },
            ds9174e688d7de157c5c0583df424eaab2676ac162: {
            3: ["dsbb9bc244d798123fde783fcc1c72d3bb8c189413: 30000000000000000000 wei + 85000 × 21000000000 gas"]
            },
            dsb18f9d01323e150096650ab989cfecd39d757aec: {
            777: ["dscd79c72690750f079ae6ab6ccd7e7aedc03c7720: 0 wei + 1000000 × 20000000000 gas"]
            },
            dsb2916c870cf66967b6510b76c07e9d13a5d23514: {
            2: ["ds576f25199d60982a8f31a8dff4da8acb982e6aba: 26000000000000000000 wei + 90000 × 20000000000 gas"]
            },
            dsbc0ca4f217e052753614d6b019948824d0d8688b: {
            0: ["ds2910543af39aba0cd09dbb2d50200b3e800a63d2: 1000000000000000000 wei + 50000 × 1171602790622 gas"]
            },
            dsea674fdde714fd979de3edf0f56aa9716b898ec8: {
            70148: ["dse39c55ead9f997f7fa20ebe40fb4649943d7db66: 1000767667434026200 wei + 90000 × 20000000000 gas"]
            }
        },
        queued: {
            ds0f6000de1578619320aba5e392706b131fb1de6f: {
            6: ["ds8383534d0bcd0186d326c993031311c0ac0d9b2d: 9000000000000000000 wei + 21000 × 20000000000 gas"]
            },
            ds5b30608c678e1ac464a8994c3b33e5cdf3497112: {
            6: ["ds9773547e27f8303c87089dc42d9288aa2b9d8f06: 50000000000000000000 wei + 90000 × 50000000000 gas"]
            },
            ds976a3fc5d6f7d259ebfb4cc2ae75115475e9867c: {
            3: ["ds346fb27de7e7370008f5da379f74dd49f5f2f80f: 140000000000000000 wei + 90000 × 20000000000 gas"]
            },
            ds9b11bf0459b0c4b2f87f8cebca4cfc26f294b63a: {
            2: ["ds24a461f25ee6a318bdef7f33de634a67bb67ac9d: 17000000000000000000 wei + 90000 × 50000000000 gas"],
            6: ["ds6368f3f8c2b42435d6c136757382e4a59436a681: 17990000000000000000 wei + 90000 × 20000000000 gas", "ds8db7b4e0ecb095fbd01dffa62010801296a9ac78: 16998950000000000000 wei + 90000 × 20000000000 gas"],
            7: ["ds6368f3f8c2b42435d6c136757382e4a59436a681: 17900000000000000000 wei + 90000 × 20000000000 gas"]
            }
        }
    }


------------------------------------------------------------------------------


getStatus
=========

.. code-block:: javascript

    txPool.getStatus([, callback])

This will provide the number of transactions currently pending for inclusion in the next block(s), as well as the ones that are being scheduled for future executions.
The RPC method used is ``txpool_status``.

----------
Parameters
----------


1. ``Function`` - (optional) Optional callback, returns an error object as first parameter and the result as second.


-------
Returns
-------


``Promise<Object>`` - A list of number of pending and queued transactions.

    - ``pending`` - ``number``: Number of pending transactions.
    - ``queued`` - ``number``: Number of queued transactions.

-------
Example
-------


.. code-block:: javascript

    txPool.getStatus().then(console.log);
    > {
        pending: 10,
        queued: 7
    }

------------------------------------------------------------------------------
