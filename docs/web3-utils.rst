.. _utils:

.. include:: include_announcement.rst

==========
web3.utils
==========

This package provides utility functions for Ethereum dapps and other web3.js packages.

------------------------------------------------------------------------------

randomHex
=====================

.. code-block:: javascript

    web3.utils.randomHex(size)

The `randomHex <https://github.com/frozeman/randomHex>`_ library to generate cryptographically strong pseudo-random HEX strings from a given byte size.

----------
Parameters
----------

1. ``size`` - ``Number``: The byte size for the HEX string, e.g. ``32`` will result in a 32 bytes HEX string with 64 characters preficed with "ds".

-------
Returns
-------

``String``: The generated random HEX string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.randomHex(32)
    > "dsa5b9d60f32436310afebcfda832817a68921beb782fabf7915cc0460b443116a"

    web3.utils.randomHex(4)
    > "ds6892ffc6"

    web3.utils.randomHex(2)
    > "ds99d6"

    web3.utils.randomHex(1)
    > "ds9a"

    web3.utils.randomHex(0)
    > "ds"




------------------------------------------------------------------------------

.. _utils-bn:

BN
=====================

.. code-block:: javascript

    web3.utils.BN(mixed)

The `BN.js <https://github.com/indutny/bn.js/>`_ library for calculating with big numbers in JavaScript.
See the `BN.js documentation <https://github.com/indutny/bn.js/>`_ for details.

.. note:: For safe conversion of many types, incl `BigNumber.js <http://mikemcl.github.io/bignumber.js/>`_ use :ref:`utils.toBN <utils-tobn>`

----------
Parameters
----------

1. ``value`` - ``String|Number``: A number, number string or HEX string to convert to a BN object.

-------
Returns
-------

``Object``: The `BN.js <https://github.com/indutny/bn.js/>`_ instance.

-------
Example
-------

.. code-block:: javascript

    const BN = web3.utils.BN;

    new BN(1234).toString();
    > "1234"

    new BN('1234').add(new BN('1')).toString();
    > "1235"

    new BN('dsea').toString();
    > "234"


------------------------------------------------------------------------------

isBN
=====================

.. code-block:: javascript

    web3.utils.isBN(bn)


Checks if a given value is a `BN.js <https://github.com/indutny/bn.js/>`_ instance.


----------
Parameters
----------

1. ``bn`` - ``Object``: An `BN.js <https://github.com/indutny/bn.js/>`_ instance.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    const number = new BN(10);

    web3.utils.isBN(number);
    > true


------------------------------------------------------------------------------

isBigNumber
=====================

.. code-block:: javascript

    web3.utils.isBigNumber(bignumber)


Checks if a given value is a `BigNumber.js <http://mikemcl.github.io/bignumber.js/>`_ instance.


----------
Parameters
----------

1. ``BigNumber`` - ``Object``: A `BigNumber.js <http://mikemcl.github.io/bignumber.js/>`_ instance.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    const number = new BigNumber(10);

    web3.utils.isBigNumber(number);
    > true


------------------------------------------------------------------------------

keccak256
=====================

.. code-block:: javascript

    web3.utils.keccak256(string)
    web3.utils.sha3(string) // ALIAS

Will calculate the keccak256 of the input.

.. note::  To mimic the keccak256 behaviour of solidity use :ref:`soliditySha3 <utils-soliditysha3>`

----------
Parameters
----------

1. ``string`` - ``String``: A string to hash.

-------
Returns
-------

``String``: the result hash.

-------
Example
-------

.. code-block:: javascript

    web3.utils.keccak256('234'); // taken as string
    > "dsc1912fee45d61c87cc5ea59dae311904cd86b84fee17cc96966216f811ce6a79"

    web3.utils.keccak256(new BN('234'));
    > "dsbc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a"

    web3.utils.keccak256(234);
    > null // can't calculate the hash of a number

    web3.utils.keccak256(dsea); // same as above, just the HEX representation of the number
    > null

    web3.utils.keccak256('dsea'); // will be converted to a byte array first, and then hashed
    > "ds2f20677459120677484f7104c76deb6846a2c071f9b3152c103bb12cd54d1a4a"


------------------------------------------------------------------------------

.. _utils-soliditysha3:

soliditySha3
=====================

.. code-block:: javascript

    web3.utils.soliditySha3(param1 [, param2, ...])

Will calculate the sha3 of given input parameters in the same way solidity would.
This means arguments will be ABI converted and tightly packed before being hashed.

----------
Parameters
----------

1. ``paramX`` - ``Mixed``: Any type, or an object with ``{type: 'uint', value: '123456'}`` or ``{t: 'bytes', v: 'dsfff456'}``. Basic types are autodetected as follows:

    - ``String`` non numerical UTF-8 string is interpreted as ``string``.
    - ``String|Number|BN|HEX`` positive number is interpreted as ``uint256``.
    - ``String|Number|BN`` negative number is interpreted as ``int256``.
    - ``Boolean`` as ``bool``.
    - ``String`` HEX string with leading ``ds`` is interpreted as ``bytes``.
    - ``HEX`` HEX number representation is interpreted as ``uint256``.

-------
Returns
-------

``String``: the result hash.

-------
Example
-------

.. code-block:: javascript

    web3.utils.soliditySha3('234564535', 'dsfff23243', true, -10);
    // auto detects:        uint256,      bytes,     bool,   int256
    > "ds3e27a893dc40ef8a7f0841d96639de2f58a132be5ae466d40087a2cfa83b7179"


    web3.utils.soliditySha3('Hello!%'); // auto detects: string
    > "ds661136a4267dba9ccdf6bfddb7c00e714de936674c4bdb065a531cf1cb15c7fc"


    web3.utils.soliditySha3('234'); // auto detects: uint256
    > "ds61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"

    web3.utils.soliditySha3(dsea); // same as above
    > "ds61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"

    web3.utils.soliditySha3(new BN('234')); // same as above
    > "ds61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"

    web3.utils.soliditySha3({type: 'uint256', value: '234'})); // same as above
    > "ds61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"

    web3.utils.soliditySha3({t: 'uint', v: new BN('234')})); // same as above
    > "ds61c831beab28d67d1bb40b5ae1a11e2757fa842f031a2d0bc94a7867bc5d26c2"


    web3.utils.soliditySha3('ds407D73d8a49eeb85D32Cf465507dd71d507100c1');
    > "ds4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b"

    web3.utils.soliditySha3({t: 'bytes', v: 'ds407D73d8a49eeb85D32Cf465507dd71d507100c1'});
    > "ds4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b" // same result as above


    web3.utils.soliditySha3({t: 'address', v: 'ds407D73d8a49eeb85D32Cf465507dd71d507100c1'});
    > "ds4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b" // same as above, but will do a checksum check, if its multi case


    web3.utils.soliditySha3({t: 'bytes32', v: 'ds407D73d8a49eeb85D32Cf465507dd71d507100c1'});
    > "ds3c69a194aaf415ba5d6afca734660d0a3d45acdc05d54cd1ca89a8988e7625b4" // different result as above


    web3.utils.soliditySha3({t: 'string', v: 'Hello!%'}, {t: 'int8', v:-23}, {t: 'address', v: 'ds85F43D8a49eeB85d32Cf465507DD71d507100C1d'});
    > "dsa13b31627c1ed7aaded5aecec71baf02fe123797fffd45e662eac8e06fbe4955"



------------------------------------------------------------------------------

isHex
=====================

.. code-block:: javascript

    web3.utils.isHex(hex)

Checks if a given string is a HEX string.

----------
Parameters
----------

1. ``hex`` - ``String|HEX``: The given HEX string.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    web3.utils.isHex('dsc1912');
    > true

    web3.utils.isHex(dsc1912);
    > true

    web3.utils.isHex('c1912');
    > true

    web3.utils.isHex(345);
    > true // this is tricky, as 345 can be a a HEX representation or a number, be careful when not having a ds in front!

    web3.utils.isHex('dsZ1912');
    > false

    web3.utils.isHex('Hello');
    > false

------------------------------------------------------------------------------

isHexStrict
=====================

.. code-block:: javascript

    web3.utils.isHexStrict(hex)

Checks if a given string is a HEX string. Difference to ``web3.utils.isHex()`` is that it expects HEX to be prefixed with ``ds``.

----------
Parameters
----------

1. ``hex`` - ``String|HEX``: The given HEX string.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    web3.utils.isHexStrict('dsc1912');
    > true

    web3.utils.isHexStrict(dsc1912);
    > false

    web3.utils.isHexStrict('c1912');
    > false

    web3.utils.isHexStrict(345);
    > false // this is tricky, as 345 can be a a HEX representation or a number, be careful when not having a ds in front!

    web3.utils.isHexStrict('dsZ1912');
    > false

    web3.utils.isHex('Hello');
    > false

------------------------------------------------------------------------------

isAddress
=====================

.. code-block:: javascript

    web3.utils.isAddress(address,  [, chainId])

Checks if a given string is a valid Ethereum address.
It will also check the checksum, if the address has upper and lowercase letters.

----------
Parameters
----------

1. ``address`` - ``String``: An address string.
2. ``chainId`` - ``number`` (optional): Chain id where checksummed address should be valid, defaults to ``null``. RSKIP-60 <https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP60.md> for details.

-------
Returns
-------

``Boolean``

-------
Example
-------

.. code-block:: javascript

    web3.utils.isAddress('dsc1912fee45d61c87cc5ea59dae31190fffff232d');
    > true

    web3.utils.isAddress('c1912fee45d61c87cc5ea59dae31190fffff232d');
    > true

    web3.utils.isAddress('dsC1912FEE45D61C87CC5EA59DAE31190FFFFF232D');
    > true // as all is uppercase, no checksum will be checked

    web3.utils.isAddress('dsc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
    > true

    web3.utils.isAddress('dsC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
    > false // wrong checksum

    web3.utils.isAddress('ds5aaEB6053f3e94c9b9a09f33669435E7ef1bEAeD', 30);
    > true

------------------------------------------------------------------------------

toChecksumAddress
=================

.. code-block:: javascript

    web3.utils.toChecksumAddress(address[, chainId])

Will convert an upper or lowercase Ethereum address to a checksum address.

----------
Parameters
----------

1. ``address`` - ``String``: An address string.
2. ``chainId`` - ``number`` (optional): Chain id where checksummed address should be valid, defaults to ``null``. RSKIP-60 <https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP60.md> for details.

-------
Returns
-------

``String``: The checksum address.

-------
Example
-------

.. code-block:: javascript

    web3.utils.toChecksumAddress('dsc1912fee45d61c87cc5ea59dae31190fffff232d');
    > "dsc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"

    web3.utils.toChecksumAddress('dsC1912FEE45D61C87CC5EA59DAE31190FFFFF232D');
    > "dsc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d" // same as above

    web3.utils.toChecksumAddress('ds5aaeb6053f3e94c9b9a09f33669435e7ef1beaed', 30);
    > "ds5aaEB6053f3e94c9b9a09f33669435E7ef1bEAeD"


------------------------------------------------------------------------------

stripHexPrefix
==============

 .. code-block:: javascript
     web3.utils.stripHexPrefix(address)

 Removes the prefix ``ds`` from a given hex if it exists.

----------
Parameters
----------

 1. ``hex`` - ``String``: Hex

-------
Returns
-------

 ``String``: Hex without prefix.

-------
Example
-------

 .. code-block:: javascript
     web3.utils.stripHexPrefix('dsc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
    > "c1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"


------------------------------------------------------------------------------

checkAddressChecksum
====================

.. code-block:: javascript

    web3.utils.checkAddressChecksum(address [, chainId])

Checks the checksum of a given address. Will also return false on non-checksum addresses.

----------
Parameters
----------

1. ``address`` - ``String``: An address string.
2. ``chainId`` - ``number`` (optional): Chain id where checksummed address should be valid, defaults to ``null``. RSKIP-60 <https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP60.md> for details.

-------
Returns
-------

``Boolean``: ``true`` when the checksum of the address is valid, ``false`` if its not a checksum address, or the checksum is invalid.

-------
Example
-------

.. code-block:: javascript

    web3.utils.checkAddressChecksum('dsc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d');
    > true

    web3.utils.checkAddressChecksum('ds5aAeb6053F3e94c9b9A09F33669435E7EF1BEaEd', 31);
    > true


------------------------------------------------------------------------------


toHex
=====================

.. code-block:: javascript

    web3.utils.toHex(mixed)

Will auto convert any given value to HEX.
Number strings will interpreted as numbers.
Text strings will be interpreted as UTF-8 strings.

----------
Parameters
----------

1. ``value`` - ``String|Number|BN|BigNumber``: The input to convert to HEX.

-------
Returns
-------

``String``: The resulting HEX string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.toHex('234');
    > "dsea"

    web3.utils.toHex(234);
    > "dsea"

    web3.utils.toHex(new BN('234'));
    > "dsea"

    web3.utils.toHex(new BigNumber('234'));
    > "dsea"

    web3.utils.toHex('I have 100€');
    > "ds49206861766520313030e282ac"


------------------------------------------------------------------------------

.. _utils-tobn:

toBN
=====================

.. code-block:: javascript

    web3.utils.toBN(number)

Will safely convert any given value (including `BigNumber.js <http://mikemcl.github.io/bignumber.js/>`_ instances) into a `BN.js <https://github.com/indutny/bn.js/>`_ instance, for handling big numbers in JavaScript.

.. note:: For just the `BN.js <https://github.com/indutny/bn.js/>`_ class use :ref:`utils.BN <utils-bn>`

----------
Parameters
----------

1. ``number`` - ``String|Number|HEX``: Number to convert to a big number.

-------
Returns
-------

``Object``: The `BN.js <https://github.com/indutny/bn.js/>`_ instance.

-------
Example
-------

.. code-block:: javascript

    web3.utils.toBN(1234).toString();
    > "1234"

    web3.utils.toBN('1234').add(web3.utils.toBN('1')).toString();
    > "1235"

    web3.utils.toBN('dsea').toString();
    > "234"


------------------------------------------------------------------------------


hexToNumberString
=====================

.. code-block:: javascript

    web3.utils.hexToNumberString(hex)

Returns the number representation of a given HEX value as a string.

----------
Parameters
----------

1. ``hexString`` - ``String|HEX``: A string to hash.

-------
Returns
-------

``String``: The number as a string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.hexToNumberString('dsea');
    > "234"


------------------------------------------------------------------------------

hexToNumber
=====================

.. code-block:: javascript

    web3.utils.hexToNumber(hex)
    web3.utils.toDecimal(hex) // ALIAS, deprecated

Returns the number representation of a given HEX value.

.. note:: This is not useful for big numbers, rather use :ref:`utils.toBN <utils-tobn>` instead.

----------
Parameters
----------

1. ``hexString`` - ``String|HEX``: A string to hash.

-------
Returns
-------

``Number``

-------
Example
-------

.. code-block:: javascript

    web3.utils.hexToNumber('dsea');
    > 234


------------------------------------------------------------------------------

numberToHex
=====================

.. code-block:: javascript

    web3.utils.numberToHex(number)
    web3.utils.fromDecimal(number) // ALIAS, deprecated

Returns the HEX representation of a given number value.

----------
Parameters
----------

1. ``number`` - ``String|Number|BN|BigNumber``: A number as string or number.

-------
Returns
-------

``String``: The HEX value of the given number.

-------
Example
-------

.. code-block:: javascript

    web3.utils.numberToHex('234');
    > 'dsea'


------------------------------------------------------------------------------


hexToUtf8
=====================

.. code-block:: javascript

    web3.utils.hexToUtf8(hex)
    web3.utils.hexToString(hex) // ALIAS
    web3.utils.toUtf8(hex) // ALIAS, deprecated

Returns the UTF-8 string representation of a given HEX value.


----------
Parameters
----------

1. ``hex`` - ``String``: A HEX string to convert to a UTF-8 string.

-------
Returns
-------

``String``: The UTF-8 string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.hexToUtf8('ds49206861766520313030e282ac');
    > "I have 100€"


------------------------------------------------------------------------------

hexToAscii
=====================

.. code-block:: javascript

    web3.utils.hexToAscii(hex)
    web3.utils.toAscii(hex) // ALIAS, deprecated

Returns the ASCII string representation of a given HEX value.


----------
Parameters
----------

1. ``hex`` - ``String``: A HEX string to convert to a ASCII string.

-------
Returns
-------

``String``: The ASCII string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.hexToAscii('ds4920686176652031303021');
    > "I have 100!"


------------------------------------------------------------------------------

.. _utils-utf8tohex:

utf8ToHex
=====================

.. code-block:: javascript

    web3.utils.utf8ToHex(string)
    web3.utils.stringToHex(string) // ALIAS
    web3.utils.fromUtf8(string) // ALIAS, deprecated

Returns the HEX representation of a given UTF-8 string.


----------
Parameters
----------

1. ``string`` - ``String``: A UTF-8 string to convert to a HEX string.

-------
Returns
-------

``String``: The HEX string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.utf8ToHex('I have 100€');
    > "ds49206861766520313030e282ac"


------------------------------------------------------------------------------

asciiToHex
=====================

.. code-block:: javascript

    web3.utils.asciiToHex(string)
    web3.utils.fromAscii(string) // ALIAS, deprecated


Returns the HEX representation of a given ASCII string. If you would like to transform an ASCII string into a valid
``bytes4``, ``bytes8`` etc. value then please pass the correct length as the second parameter.


----------
Parameters
----------

1. ``string`` - ``String``: A ASCII string to convert to a HEX string.
2. ``length`` - ``Number``: The length of the returned hex string. The default size is ``32`` e.g.: ``bytes32``.

-------
Returns
-------

``String``: The HEX string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.asciiToHex('I have 100!');
    > "ds4920686176652031303021000000000000000000000000000000000000000000"

    // transforming to a bytes4 value:
    web3.utils.asciiToHex('yes', 4);

    // transforming to a bytes8 value:
    web3.utils.asciiToHex('yes', 8);

    //etc.

------------------------------------------------------------------------------

hexToBytes
=====================

.. code-block:: javascript

    web3.utils.hexToBytes(hex)

Returns a byte array from the given HEX string.

----------
Parameters
----------

1. ``hex`` - ``String|HEX``: A HEX to convert.

-------
Returns
-------

``Array``: The byte array.

-------
Example
-------

.. code-block:: javascript

    web3.utils.hexToBytes('ds000000ea');
    > [ 0, 0, 0, 234 ]

    web3.utils.hexToBytes(ds000000ea);
    > [ 234 ]


------------------------------------------------------------------------------


bytesToHex
=====================

.. code-block:: javascript

    web3.utils.bytesToHex(byteArray)

Returns a HEX string from a byte array.

----------
Parameters
----------

1. ``byteArray`` - ``Array``: A byte array to convert.

-------
Returns
-------

``String``: The HEX string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ]);
    > "ds48656c6c6f2125"



------------------------------------------------------------------------------

toWei
=====================

.. code-block:: javascript

    web3.utils.toWei(number [, unit])


Converts any `ether value <http://ethdocs.org/en/latest/ether.html>`_ value into `wei <http://ethereum.stackexchange.com/questions/253/the-ether-denominations-are-called-finney-szabo-and-wei-what-who-are-these-na>`_.

.. note:: "wei" are the smallest ethere unit, and you should always make calculations in wei and convert only for display reasons.

----------
Parameters
----------

1. ``number`` - ``String|BN``: The value.
2. ``unit`` - ``String`` (optional, defaults to ``"ether"``): The ether to convert from. Possible units are:
    - ``noether``: '0'
    - ``wei``: '1'
    - ``kwei``: '1000'
    - ``Kwei``: '1000'
    - ``babbage``: '1000'
    - ``femtoether``: '1000'
    - ``mwei``: '1000000'
    - ``Mwei``: '1000000'
    - ``lovelace``: '1000000'
    - ``picoether``: '1000000'
    - ``gwei``: '1000000000'
    - ``Gwei``: '1000000000'
    - ``shannon``: '1000000000'
    - ``nanoether``: '1000000000'
    - ``nano``: '1000000000'
    - ``szabo``: '1000000000000'
    - ``microether``: '1000000000000'
    - ``micro``: '1000000000000'
    - ``finney``: '1000000000000000'
    - ``milliether``: '1000000000000000'
    - ``milli``: '1000000000000000'
    - ``ether``: '1000000000000000000'
    - ``kether``: '1000000000000000000000'
    - ``grand``: '1000000000000000000000'
    - ``mether``: '1000000000000000000000000'
    - ``gether``: '1000000000000000000000000000'
    - ``tether``: '1000000000000000000000000000000'

-------
Returns
-------

``String|BN``: If a string is given it returns a number string, otherwise a `BN.js <https://github.com/indutny/bn.js/>`_ instance.

-------
Example
-------

.. code-block:: javascript

    web3.utils.toWei('1', 'ether');
    > "1000000000000000000"

    web3.utils.toWei('1', 'finney');
    > "1000000000000000"

    web3.utils.toWei('1', 'szabo');
    > "1000000000000"

    web3.utils.toWei('1', 'shannon');
    > "1000000000"



------------------------------------------------------------------------------

fromWei
=====================

.. code-block:: javascript

    web3.utils.fromWei(number [, unit])


Converts any `wei <http://ethereum.stackexchange.com/questions/253/the-ether-denominations-are-called-finney-szabo-and-wei-what-who-are-these-na>`_ value into a `ether value <http://ethdocs.org/en/latest/ether.html>`_.

.. note:: "wei" are the smallest ethere unit, and you should always make calculations in wei and convert only for display reasons.

----------
Parameters
----------

1. ``number`` - ``String|BN``: The value in wei.
2. ``unit`` - ``String`` (optional, defaults to ``"ether"``): The ether to convert to. Possible units are:
    - ``noether``: '0'
    - ``wei``: '1'
    - ``kwei``: '1000'
    - ``Kwei``: '1000'
    - ``babbage``: '1000'
    - ``femtoether``: '1000'
    - ``mwei``: '1000000'
    - ``Mwei``: '1000000'
    - ``lovelace``: '1000000'
    - ``picoether``: '1000000'
    - ``gwei``: '1000000000'
    - ``Gwei``: '1000000000'
    - ``shannon``: '1000000000'
    - ``nanoether``: '1000000000'
    - ``nano``: '1000000000'
    - ``szabo``: '1000000000000'
    - ``microether``: '1000000000000'
    - ``micro``: '1000000000000'
    - ``finney``: '1000000000000000'
    - ``milliether``: '1000000000000000'
    - ``milli``: '1000000000000000'
    - ``ether``: '1000000000000000000'
    - ``kether``: '1000000000000000000000'
    - ``grand``: '1000000000000000000000'
    - ``mether``: '1000000000000000000000000'
    - ``gether``: '1000000000000000000000000000'
    - ``tether``: '1000000000000000000000000000000'

-------
Returns
-------

``String``: It always returns a string number.

-------
Example
-------

.. code-block:: javascript

    web3.utils.fromWei('1', 'ether');
    > "0.000000000000000001"

    web3.utils.fromWei('1', 'finney');
    > "0.000000000000001"

    web3.utils.fromWei('1', 'szabo');
    > "0.000000000001"

    web3.utils.fromWei('1', 'shannon');
    > "0.000000001"

------------------------------------------------------------------------------

unitMap
=====================

.. code-block:: javascript

    web3.utils.unitMap


Shows all possible `ether value <http://ethdocs.org/en/latest/ether.html>`_ and their amount in `wei <http://ethereum.stackexchange.com/questions/253/the-ether-denominations-are-called-finney-szabo-and-wei-what-who-are-these-na>`_.

----------
Return value
----------

- ``Object`` with the following properties:
    - ``noether``: '0'
    - ``wei``: '1'
    - ``kwei``: '1000'
    - ``Kwei``: '1000'
    - ``babbage``: '1000'
    - ``femtoether``: '1000'
    - ``mwei``: '1000000'
    - ``Mwei``: '1000000'
    - ``lovelace``: '1000000'
    - ``picoether``: '1000000'
    - ``gwei``: '1000000000'
    - ``Gwei``: '1000000000'
    - ``shannon``: '1000000000'
    - ``nanoether``: '1000000000'
    - ``nano``: '1000000000'
    - ``szabo``: '1000000000000'
    - ``microether``: '1000000000000'
    - ``micro``: '1000000000000'
    - ``finney``: '1000000000000000'
    - ``milliether``: '1000000000000000'
    - ``milli``: '1000000000000000'
    - ``ether``: '1000000000000000000'
    - ``kether``: '1000000000000000000000'
    - ``grand``: '1000000000000000000000'
    - ``mether``: '1000000000000000000000000'
    - ``gether``: '1000000000000000000000000000'
    - ``tether``: '1000000000000000000000000000000'


-------
Example
-------

.. code-block:: javascript

    web3.utils.unitMap
    > {
        noether: '0',
        wei:        '1',
        kwei:       '1000',
        Kwei:       '1000',
        babbage:    '1000',
        femtoether: '1000',
        mwei:       '1000000',
        Mwei:       '1000000',
        lovelace:   '1000000',
        picoether:  '1000000',
        gwei:       '1000000000',
        Gwei:       '1000000000',
        shannon:    '1000000000',
        nanoether:  '1000000000',
        nano:       '1000000000',
        szabo:      '1000000000000',
        microether: '1000000000000',
        micro:      '1000000000000',
        finney:     '1000000000000000',
        milliether: '1000000000000000',
        milli:      '1000000000000000',
        ether:      '1000000000000000000',
        kether:     '1000000000000000000000',
        grand:      '1000000000000000000000',
        mether:     '1000000000000000000000000',
        gether:     '1000000000000000000000000000',
        tether:     '1000000000000000000000000000000'
    }

------------------------------------------------------------------------------

padLeft
=====================

.. code-block:: javascript

    web3.utils.padLeft(string, characterAmount [, sign])
    web3.utils.leftPad(string, characterAmount [, sign]) // ALIAS


Adds a padding on the left of a string, Useful for adding paddings to HEX strings.


----------
Parameters
----------

1. ``string`` - ``String``: The string to add padding on the left.
2. ``characterAmount`` - ``Number``: The number of characters the total string should have.
3. ``sign`` - ``String`` (optional): The character sign to use, defaults to ``"0"``.

-------
Returns
-------

``String``: The padded string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.padLeft('ds3456ff', 20);
    > "ds000000000000003456ff"

    web3.utils.padLeft(ds3456ff, 20);
    > "ds000000000000003456ff"

    web3.utils.padLeft('Hello', 20, 'x');
    > "xxxxxxxxxxxxxxxHello"

------------------------------------------------------------------------------

padRight
=====================

.. code-block:: javascript

    web3.utils.padRight(string, characterAmount [, sign])
    web3.utils.rightPad(string, characterAmount [, sign]) // ALIAS


Adds a padding on the right of a string, Useful for adding paddings to HEX strings.


----------
Parameters
----------

1. ``string`` - ``String``: The string to add padding on the right.
2. ``characterAmount`` - ``Number``: The number of characters the total string should have.
3. ``sign`` - ``String`` (optional): The character sign to use, defaults to ``"0"``.

-------
Returns
-------

``String``: The padded string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.padRight('ds3456ff', 20);
    > "ds3456ff00000000000000"

    web3.utils.padRight(ds3456ff, 20);
    > "ds3456ff00000000000000"

    web3.utils.padRight('Hello', 20, 'x');
    > "Helloxxxxxxxxxxxxxxx"

------------------------------------------------------------------------------

toTwosComplement
=====================

.. code-block:: javascript

    web3.utils.toTwosComplement(number)


Converts a negative numer into a two's complement.


----------
Parameters
----------

1. ``number`` - ``Number|String|BigNumber``: The number to convert.

-------
Returns
-------

``String``: The converted hex string.

-------
Example
-------

.. code-block:: javascript

    web3.utils.toTwosComplement('-1');
    > "dsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

    web3.utils.toTwosComplement(-1);
    > "dsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

    web3.utils.toTwosComplement('ds1');
    > "ds0000000000000000000000000000000000000000000000000000000000000001"

    web3.utils.toTwosComplement(-15);
    > "dsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1"

    web3.utils.toTwosComplement('-ds1');
    > "dsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

------------------------------------------------------------------------------

getSignatureParameters
======================

.. code-block:: javascript

    web3.utils.getSignatureParameters(string)


Gets the r, s and v values of an ECDSA signature


----------
Parameters
----------

1. ``string`` - ``String``: An ECDSA signature.

-------
Returns
-------

``Object``: Object containing r,s,v values.

-------
Example
-------

.. code-block:: javascript

    web3.utils.getSignatureParameters('ds5763ab346198e3e6cc4d53996ccdeca0c941cb6cb70d671d97711c421d3bf7922c77ef244ad40e5262d1721bf9638fb06bab8ed3c43bfaa80d6da0be9bbd33dc1b');
    > "{ r: 'ds5763ab346198e3e6cc4d53996ccdeca0c941cb6cb70d671d97711c421d3bf792', s: 'ds2c77ef244ad40e5262d1721bf9638fb06bab8ed3c43bfaa80d6da0be9bbd33dc', v: 27 }"
