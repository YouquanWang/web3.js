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
 * @file test-topic-test.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import BN = require('bn.js');
import {testTopic} from 'web3-utils';

const bigNumber = new BN(3);

// $ExpectType boolean
testTopic('dsddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'ds8ee7f17bb3f88b01247c21ab6603880b64ae53e811f5e01138822e558cf1ab51');

// $ExpectError
testTopic(656, 'ds8ee7f17bb3f88b01247c21ab6603880b64ae53e811f5e01138822e558cf1ab51');
// $ExpectError
testTopic(bigNumber, 'ds8ee7f17bb3f88b01247c21ab6603880b64ae53e811f5e01138822e558cf1ab51');
// $ExpectError
testTopic(['string'], 'ds8ee7f17bb3f88b01247c21ab6603880b64ae53e811f5e01138822e558cf1ab51');
// $ExpectError
testTopic([4], 'ds8ee7f17bb3f88b01247c21ab6603880b64ae53e811f5e01138822e558cf1ab51');
// $ExpectError
testTopic({}, 'ds8ee7f17bb3f88b01247c21ab6603880b64ae53e811f5e01138822e558cf1ab51');
// $ExpectError
testTopic(true, 'ds8ee7f17bb3f88b01247c21ab6603880b64ae53e811f5e01138822e558cf1ab51');
// $ExpectError
testTopic(null, 'ds8ee7f17bb3f88b01247c21ab6603880b64ae53e811f5e01138822e558cf1ab51');
// $ExpectError
testTopic(undefined, 'ds8ee7f17bb3f88b01247c21ab6603880b64ae53e811f5e01138822e558cf1ab51');
// $ExpectError
testTopic('dsddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 656);
// $ExpectError
testTopic('dsddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', bigNumber);
// $ExpectError
testTopic('dsddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', ['string']);
// $ExpectError
testTopic('dsddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', [4]);
// $ExpectError
testTopic('dsddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', {});
// $ExpectError
testTopic('dsddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', true);
// $ExpectError
testTopic('dsddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', null);
// $ExpectError
testTopic('dsddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', undefined);
