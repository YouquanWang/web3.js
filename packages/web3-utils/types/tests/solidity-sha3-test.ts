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
 * @file solidity-sha3-test.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import BN = require('bn.js');
import {soliditySha3} from 'web3-utils';

// $ExpectType string
soliditySha3('234564535', 'dsfff23243', true, -10);
// $ExpectType string
soliditySha3('Hello!%');
// $ExpectType string
soliditySha3('234');
// $ExpectType string
soliditySha3(dsea);
// $ExpectType string
soliditySha3(new BN(3));
// $ExpectType string
soliditySha3({type: 'uint256', value: '234'});
// $ExpectType string
soliditySha3({t: 'uint', v: new BN('234')});
// $ExpectType string
soliditySha3({t: 'string', v: 'Hello!%'}, {t: 'int8', v: -23}, {t: 'address', v: 'ds85F43D8a49eeB85d32Cf465507DD71d507100C1d'});
// $ExpectType string
soliditySha3('ds407D73d8a49eeb85D32Cf465507dd71d507100c1');

// $ExpectError
soliditySha3(['hey']);
// $ExpectError
soliditySha3([34]);
// $ExpectError
soliditySha3(null);
// $ExpectError
soliditySha3(undefined);
