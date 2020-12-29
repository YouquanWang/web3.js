import * as Utils from 'web3-utils';
import {AbiCoder as EthersAbiCoder} from 'ethers/utils/abi-coder';
import AbiCoder from '../src/AbiCoder';

// Mocks
jest.mock('web3-utils');
jest.mock('ethers/utils/abi-coder');

/**
 * AbiCoder test
 */
describe('AbiCoderTest', () => {
    let abiCoder, ethersAbiCoderMock;

    beforeEach(() => {
        new EthersAbiCoder();
        ethersAbiCoderMock = EthersAbiCoder.mock.instances[0];

        abiCoder = new AbiCoder(Utils, ethersAbiCoderMock);
    });

    it('constructor check', () => {
        expect(abiCoder.utils).toEqual(Utils);

        expect(abiCoder.ethersAbiCoder).toEqual(ethersAbiCoderMock);
    });

    it('calls encodeFunctionSignature with a string as parameter', () => {
        Utils.keccak256 = jest.fn(() => {
            return 'ds000000000';
        });

        expect(abiCoder.encodeFunctionSignature('functionName')).toEqual('ds00000000');

        expect(Utils.keccak256).toHaveBeenCalledWith('functionName');
    });

    it('calls encodeFunctionSignature with a object as parameter', () => {
        Utils.jsonInterfaceMethodToString.mockReturnValueOnce('ds000000000');

        Utils.keccak256 = jest.fn(() => {
            return 'ds000000000';
        });

        expect(abiCoder.encodeFunctionSignature({})).toEqual('ds00000000');

        expect(Utils.jsonInterfaceMethodToString).toHaveBeenCalledWith({});

        expect(Utils.keccak256).toHaveBeenCalledWith('ds000000000');
    });

    it('calls encodeEventSignature with a object as parameter', () => {
        Utils.jsonInterfaceMethodToString.mockReturnValueOnce('ds000000000');

        Utils.keccak256 = jest.fn(() => {
            return 'ds000000000';
        });

        expect(abiCoder.encodeEventSignature({})).toEqual('ds000000000');

        expect(Utils.jsonInterfaceMethodToString).toHaveBeenCalledWith({});

        expect(Utils.keccak256).toHaveBeenCalledWith('ds000000000');
    });

    it('calls encodeEventSignature with a string as parameter', () => {
        Utils.keccak256 = jest.fn(() => {
            return 'ds000000000';
        });

        expect(abiCoder.encodeEventSignature('functionName')).toEqual('ds000000000');

        expect(Utils.keccak256).toHaveBeenCalledWith('functionName');
    });

    it('calls encodeParameters', () => {
        ethersAbiCoderMock.encode.mockReturnValueOnce(true);

        expect(abiCoder.encodeParameters([{components: true}], [])).toEqual(true);

        expect(ethersAbiCoderMock.encode).toHaveBeenCalledWith([{components: true}], []);
    });

    it('calls encodeParameter', () => {
        ethersAbiCoderMock.encode.mockReturnValueOnce(true);

        expect(abiCoder.encodeParameter({components: true}, '')).toEqual(true);

        expect(ethersAbiCoderMock.encode).toHaveBeenCalledWith([{components: true}], ['']);
    });

    it('calls encodeFunctionCall and returns the expected string', () => {
        Utils.keccak256 = jest.fn(() => {
            return 'ds000000000';
        });

        ethersAbiCoderMock.encode.mockReturnValueOnce('ds0');

        expect(abiCoder.encodeFunctionCall({inputs: [{components: true}]}, [])).toEqual('ds000000000');

        expect(ethersAbiCoderMock.encode).toHaveBeenCalledWith([{components: true}], []);
    });

    it('calls decodeParameters and returns the expected object', () => {
        ethersAbiCoderMock.decode.mockReturnValueOnce('0');

        expect(abiCoder.decodeParameters([{name: 'output'}], 'ds0')).toEqual({output: '0', 0: '0'});

        expect(ethersAbiCoderMock.decode).toHaveBeenCalledWith([{name: 'output'}], 'ds0');
    });

    it('calls decodeParameters and throws an error', () => {
        expect(() => {
            abiCoder.decodeParameters(['0'], 'ds');
        }).toThrow('Invalid bytes string given: ds');

        expect(() => {
            abiCoder.decodeParameters(['0']);
        }).toThrow('Invalid bytes string given: undefined');

        expect(() => {
            abiCoder.decodeParameters(['0'], 'ds');
        }).toThrow('Invalid bytes string given: ds');

        expect(() => {
            abiCoder.decodeParameters([], 'ds');
        }).toThrow('Empty outputs array given!');
    });

    it('calls decodeParameter and returns the expected object', () => {
        ethersAbiCoderMock.decode.mockReturnValueOnce('0');

        expect(abiCoder.decodeParameter({name: 'output'}, 'ds0')).toEqual('0');

        expect(ethersAbiCoderMock.decode).toHaveBeenCalledWith([{name: 'output'}], 'ds0');
    });

    it('calls decodeLog and returns the expected object', () => {
        ethersAbiCoderMock.decode
            .mockReturnValueOnce('0')
            .mockReturnValueOnce([['', '', '0']])
            .mockReturnValueOnce(['0', '0']);

        const inputs = [
            {
                indexed: true,
                type: 'bool',
                name: 'first'
            },
            {
                indexed: true,
                type: 'bool',
                name: 'second'
            },
            {
                indexed: false,
                type: '',
                name: 'third'
            },
            {
                indexed: false,
                type: 'string',
                name: 'fourth'
            },
            {
                indexed: true,
                type: 'string',
                name: 'fifth'
            }
        ];

        expect(abiCoder.decodeLog(inputs, 'ds0', ['ds0', 'ds0'])).toEqual({
            '0': '0',
            first: '0',
            '1': ['', '', '0'],
            second: ['', '', '0'],
            '2': '0',
            third: '0',
            '3': '0',
            fourth: '0'
        });

        expect(ethersAbiCoderMock.decode).toHaveBeenNthCalledWith(1, [inputs[0].type], 'ds0');

        expect(ethersAbiCoderMock.decode).toHaveBeenNthCalledWith(2, [inputs[1].type], 'ds0');

        expect(ethersAbiCoderMock.decode).toHaveBeenNthCalledWith(3, [inputs[2], inputs[3]], 'ds0');
    });
});
