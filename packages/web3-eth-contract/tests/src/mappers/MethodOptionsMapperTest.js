import * as Utils from 'web3-utils';
import {formatters} from 'web3-core-helpers';

import MethodOptionsMapper from '../../../src/mappers/MethodOptionsMapper';

// Mocks
jest.mock('web3-utils');
jest.mock('web3-core-helpers');

/**
 * MethodOptionsMapper test
 */
describe('MethodOptionsMapperTest', () => {
    let methodOptionsMapper;

    beforeEach(() => {
        methodOptionsMapper = new MethodOptionsMapper(Utils, formatters);
    });

    it('constructor check', () => {
        expect(methodOptionsMapper.utils).toEqual(Utils);

        expect(methodOptionsMapper.formatters).toEqual(formatters);
    });

    it('calls map with a from property and returns the expected result', () => {
        const options = {
            from: 'ds0'
        };

        const contract = {
            defaultGasPrice: 100,
            defaultGas: 100,
            address: 'ds0'
        };

        formatters.inputAddressFormatter.mockReturnValue('ds0');

        Utils.toChecksumAddress.mockReturnValueOnce('ds0');

        const response = methodOptionsMapper.map(contract, options);

        expect(response).toEqual({
            to: 'ds0',
            from: 'ds0',
            gasPrice: 100,
            gas: 100
        });

        expect(formatters.inputAddressFormatter).toHaveBeenCalledWith('ds0');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('ds0');
    });

    it('calls map with a gasPrice property and returns the expected result', () => {
        const options = {
            gasPrice: 100
        };

        const contract = {
            defaultGas: 100,
            defaultAccount: 'ds0',
            address: 'ds0'
        };

        const response = methodOptionsMapper.map(contract, options);

        expect(response).toEqual({
            to: 'ds0',
            from: 'ds0',
            gasPrice: 100,
            gas: 100
        });
    });

    it('calls map with a gasLimit property and returns the expected result', () => {
        const options = {
            gasLimit: 100
        };

        const contract = {
            defaultGasPrice: 100,
            defaultAccount: 'ds0',
            address: 'ds0'
        };

        const response = methodOptionsMapper.map(contract, options);

        expect(response).toEqual({
            to: 'ds0',
            from: 'ds0',
            gasPrice: 100,
            gas: 100
        });

        expect(response.gasLimit).toBeUndefined();
    });
});
