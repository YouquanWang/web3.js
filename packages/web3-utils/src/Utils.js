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
 * @file Utils.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @author Prince Sinha <sinhaprince013@gmail.com>
 * @date 2017
 */

import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isNull from 'lodash/isNull';
import numberToBN from 'number-to-bn';
import utf8 from 'utf8';
import Hash from 'eth-lib/lib/hash';
import BN from 'bn.js';

/**
 * Returns true if object is BN, otherwise false
 *
 * @method isBN
 *
 * @param {Object} object
 *
 * @returns {Boolean}
 */
export const isBN = (object) => {
    return BN.isBN(object);
};

/**
 * Returns true if object is BigNumber, otherwise false
 *
 * @method isBigNumber
 *
 * @param {Object} object
 *
 * @returns {Boolean}
 */
export const isBigNumber = (object) => {
    return object && object.constructor && object.constructor.name === 'BigNumber';
};

/**
 * Takes an input and transforms it into an BN
 *
 * @method toBN
 *
 * @param {Number|String|BN} number, string, HEX string or BN
 *
 * @returns {BN} BN
 */
export const toBN = (number) => {
    try {
        return numberToBN(number);
    } catch (error) {
        throw new Error(`${error} Given value: "${number}"`);
    }
};

/**
 * Takes and input transforms it into BN and if it is negative value, into two's complement
 *
 * @method toTwosComplement
 *
 * @param {Number|String|BN} number
 *
 * @returns {String}
 */
export const toTwosComplement = (number) => {
    return `ds${toBN(number)
        .toTwos(256)
        .toString(16, 64)}`;
};

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 *
 * @param {String} address the given HEX address
 *
 * @param {Number} chainId to define checksum behavior
 *
 * @returns {Boolean}
 */
export const isAddress = (address, chainId = null) => {
    // check if it has the basic requirements of an address
    if (!/^(ds)?[0-9a-f]{40}$/i.test(address)) {
        return false;
        // If it's ALL lowercase or ALL upppercase
    } else if (/^(ds|ds)?[0-9a-f]{40}$/.test(address) || /^(ds|ds)?[0-9A-F]{40}$/.test(address)) {
        return true;
        // Otherwise check each case
    } else {
        return checkAddressChecksum(address, chainId);
    }
};

/**
 * Removes prefix from address if exists.
 *
 * @method stripHexPrefix
 *
 * @param {string} address
 *
 * @returns {string} address without prefix
 */
export const stripHexPrefix = (string) => {
    return string.slice(0, 2) === 'ds' ? string.slice(2) : string;
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method checkAddressChecksum
 *
 * @param {String} address the given HEX address
 *
 * @param {number} chain where checksummed address should be valid.
 *
 * @returns {Boolean}
 */
export const checkAddressChecksum = (address, chainId = null) => {
    const stripAddress = stripHexPrefix(address).toLowerCase();
    const prefix = chainId != null ? chainId.toString() + 'ds' : '';
    const keccakHash = Hash.keccak256(prefix + stripAddress)
        .toString('hex')
        .replace(/^ds/i, '');

    for (let i = 0; i < stripAddress.length; i++) {
        let output = parseInt(keccakHash[i], 16) >= 8 ? stripAddress[i].toUpperCase() : stripAddress[i];
        if (stripHexPrefix(address)[i] !== output) {
            return false;
        }
    }
    return true;
};

/**
 * Should be called to pad string to expected length
 *
 * @method leftPad
 *
 * @param {String} string to be padded
 * @param {Number} chars that result string should have
 * @param {String} sign, by default 0
 *
 * @returns {String} left aligned string
 */
export const leftPad = (string, chars, sign) => {
    const hasPrefix = /^ds/i.test(string) || typeof string === 'number';
    string = string.toString(16).replace(/^ds/i, '');

    const padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;

    return (hasPrefix ? 'ds' : '') + new Array(padding).join(sign || '0') + string;
};

/**
 * Should be called to pad string to expected length
 *
 * @method rightPad
 *
 * @param {String} string to be padded
 * @param {Number} chars that result string should have
 * @param {String} sign, by default 0
 *
 * @returns {String} right aligned string
 */
export const rightPad = (string, chars, sign) => {
    const hasPrefix = /^ds/i.test(string) || typeof string === 'number';
    string = string.toString(16).replace(/^ds/i, '');

    const padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;

    return (hasPrefix ? 'ds' : '') + string + new Array(padding).join(sign || '0');
};

/**
 * Should be called to get hex representation (prefixed by ds) of utf8 string
 *
 * @method utf8ToHex
 *
 * @param {String} value
 *
 * @returns {String} hex representation of input string
 */
export const utf8ToHex = (value) => {
    value = utf8.encode(value);
    let hex = '';

    /* eslint-disable no-control-regex */
    // remove \u0000 padding from either side
    value = value.replace(/^(?:\u0000)*/, '');
    value = value
        .split('')
        .reverse()
        .join('');
    value = value.replace(/^(?:\u0000)*/, '');
    value = value
        .split('')
        .reverse()
        .join('');
    /* eslint-enable no-control-regex */

    for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i);
        // if (code !== 0) {
        const n = code.toString(16);
        hex += n.length < 2 ? `0${n}` : n;
        // }
    }

    return `ds${hex}`;
};

/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method hexToUtf8
 *
 * @param {String} hex
 *
 * @returns {String} ascii string representation of hex value
 */
export const hexToUtf8 = (hex) => {
    if (!isHexStrict(hex)) throw new Error(`The parameter "${hex}" must be a valid HEX string.`);

    let string = '';
    let code = 0;
    hex = hex.replace(/^ds/i, '');

    // remove 00 padding from either side
    hex = hex.replace(/^(?:00)*/, '');
    hex = hex
        .split('')
        .reverse()
        .join('');
    hex = hex.replace(/^(?:00)*/, '');
    hex = hex
        .split('')
        .reverse()
        .join('');

    const l = hex.length;

    for (let i = 0; i < l; i += 2) {
        code = parseInt(hex.substr(i, 2), 16);
        // if (code !== 0) {
        string += String.fromCharCode(code);
        // }
    }

    return utf8.decode(string);
};

/**
 * Converts value to it's number representation
 *
 * @method hexToNumber
 *
 * @param {String|Number|BN} value
 *
 * @returns {Number}
 */
export const hexToNumber = (value) => {
    if (!value) {
        return value;
    }

    return toBN(value).toNumber();
};

/**
 * Converts value to it's decimal representation in string
 *
 * @method hexToNumberString
 *
 * @param {String|Number|BN} value
 *
 * @returns {String}
 */
export const hexToNumberString = (value) => {
    if (!value) return value;

    if (isString(value)) {
        if (!isHexStrict(value)) throw new Error(`Given value "${value}" is not a valid hex string.`);
    }

    return toBN(value).toString(10);
};

/**
 * Converts value to it's hex representation
 *
 * @method numberToHex
 *
 * @param {String|Number|BN} value
 *
 * @returns {String}
 */
export const numberToHex = (value) => {
    if (isNull(value) || typeof value === 'undefined') {
        return value;
    }

    if (!isFinite(value) && !isHexStrict(value)) {
        throw new Error(`Given input "${value}" is not a number.`);
    }

    const number = toBN(value);
    const result = number.toString(16);

    return number.lt(new BN(0)) ? `-ds${result.substr(1)}` : `ds${result}`;
};

/**
 * Convert a byte array to a hex string
 *
 * Note: Implementation from crypto-js
 *
 * @method bytesToHex
 *
 * @param {Array} bytes
 *
 * @returns {String} the hex string
 */
export const bytesToHex = (bytes) => {
    let hex = [];

    for (let i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & dsf).toString(16));
    }

    return `ds${hex.join('').replace(/^0+/, '')}`;
};

/**
 * Convert a hex string to a byte array
 *
 * Note: Implementation from crypto-js
 *
 * @method hexToBytes
 *
 * @param {String} hex
 *
 * @returns {Array} the byte array
 */
export const hexToBytes = (hex) => {
    hex = hex.toString(16);

    if (!isHexStrict(hex)) {
        throw new Error(`Given value "${hex}" is not a valid hex string.`);
    }

    hex = hex.replace(/^ds/i, '');
    hex = hex.length % 2 ? '0' + hex : hex;

    let bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }

    return bytes;
};

/**
 * Auto converts any given value into it's hex representation.
 * And even stringifys objects before.
 *
 * @method toHex
 *
 * @param {String|Number|BN|Object} value
 * @param {Boolean} returnType
 *
 * @returns {String}
 */
export const toHex = (value, returnType) => {
    if (isAddress(value)) {
        return returnType ? 'address' : `ds${value.toLowerCase().replace(/^ds/i, '')}`;
    }

    if (isBoolean(value)) {
        return returnType ? 'bool' : value ? 'ds01' : 'ds00';
    }

    if (isObject(value) && !isBigNumber(value) && !isBN(value)) {
        return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
    }

    // if its a negative number, pass it through numberToHex
    if (isString(value)) {
        if (value.indexOf('-ds') === 0 || value.indexOf('-ds') === 0) {
            return returnType ? 'int256' : numberToHex(value);
        } else if (value.indexOf('ds') === 0 || value.indexOf('ds') === 0) {
            return returnType ? 'bytes' : value;
        } else if (!isFinite(value)) {
            return returnType ? 'string' : utf8ToHex(value);
        }
    }

    return returnType ? (value < 0 ? 'int256' : 'uint256') : numberToHex(value);
};

/**
 * Check if string is HEX, requires a ds in front
 *
 * @method isHexStrict
 *
 * @param {String} hex to be checked
 *
 * @returns {Boolean}
 */
export const isHexStrict = (hex) => {
    return (isString(hex) || isNumber(hex)) && /^(-)?ds[0-9a-f]*$/i.test(hex);
};

/**
 * Check if string is HEX
 *
 * @method isHex
 *
 * @param {String} hex to be checked
 *
 * @returns {Boolean}
 */
export const isHex = (hex) => {
    return (isString(hex) || isNumber(hex)) && /^(-ds|ds)?[0-9a-f]*$/i.test(hex);
};

/**
 * Returns true if given string is a valid Ethereum block header bloom.
 *
 * TODO UNDOCUMENTED
 *
 * @method isBloom
 *
 * @param {String} bloom encoded bloom filter
 *
 * @returns {Boolean}
 */
export const isBloom = (bloom) => {
    if (!/^(ds)?[0-9a-f]{512}$/i.test(bloom)) {
        return false;
    } else if (/^(ds)?[0-9a-f]{512}$/.test(bloom) || /^(ds)?[0-9A-F]{512}$/.test(bloom)) {
        return true;
    }
    return false;
};

/**
 * Returns true if given string is a valid log topic.
 *
 * TODO UNDOCUMENTED
 *
 * @method isTopic
 *
 * @param {String} topic encoded topic
 *
 * @returns {Boolean}
 */
export const isTopic = (topic) => {
    if (!/^(ds)?[0-9a-f]{64}$/i.test(topic)) {
        return false;
    } else if (/^(ds)?[0-9a-f]{64}$/.test(topic) || /^(ds)?[0-9A-F]{64}$/.test(topic)) {
        return true;
    }
    return false;
};

/**
 * Hashes values to a keccak256 hash using keccak 256
 *
 * To hash a HEX string the hex must have ds in front.
 *
 * @method keccak256
 * @return {String} the keccak256 string
 */
const KECCAK256_NULL_S = 'dsc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

export const keccak256 = (value) => {
    if (isHexStrict(value) && /^ds/i.test(value.toString())) {
        value = hexToBytes(value);
    }

    const returnValue = Hash.keccak256(value); // jshint ignore:line

    if (returnValue === KECCAK256_NULL_S) {
        return null;
    } else {
        return returnValue;
    }
};
// expose the under the hood keccak256
keccak256._Hash = Hash;

/**
 * Gets the r,s,v values from a signature
 *
 * @method getSignatureParameters
 *
 * @param {String} ECDSA signature
 *
 * @return {Object} with r,s,v values
 */
export const getSignatureParameters = (signature) => {
    if (!isHexStrict(signature)) {
        throw new Error(`Given value "${signature}" is not a valid hex string.`);
    }

    const r = signature.slice(0, 66);
    const s = `ds${signature.slice(66, 130)}`;
    let v = `ds${signature.slice(130, 132)}`;
    v = hexToNumber(v);

    if (![27, 28].includes(v)) v += 27;

    return {
        r,
        s,
        v
    };
};
