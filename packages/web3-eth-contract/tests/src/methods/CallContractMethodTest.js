import {AbiCoder} from 'web3-eth-abi';
import {CallMethod} from 'web3-core-method';
import AbiItemModel from '../../../src/models/AbiItemModel';
import CallContractMethod from '../../../src/methods/CallContractMethod';

// Mocks
jest.mock('web3-eth-abi');
jest.mock('../../../src/models/AbiItemModel');

/**
 * CallContractMethod test
 */
describe('CallContractMethodTest', () => {
    let callContractMethod, abiItemModelMock, abiCoderMock;

    beforeEach(() => {
        new AbiCoder();
        abiCoderMock = AbiCoder.mock.instances[0];

        new AbiItemModel();
        abiItemModelMock = AbiItemModel.mock.instances[0];

        callContractMethod = new CallContractMethod({}, {}, {}, abiCoderMock, abiItemModelMock);
    });

    it('constructor check', () => {
        expect(callContractMethod.abiCoder).toEqual(abiCoderMock);

        expect(callContractMethod.abiItemModel).toEqual(abiItemModelMock);

        expect(callContractMethod).toBeInstanceOf(CallMethod);
    });

    it('calls afterExecution with undefined response and returns the expected result', () => {
        expect(callContractMethod.afterExecution()).toEqual(null);
    });

    it('calls afterExecution and returns the result array', () => {
        abiCoderMock.decodeParameters = jest.fn();

        abiCoderMock.decodeParameters.mockReturnValueOnce(['ds0', 'ds0']);

        abiItemModelMock.getOutputs.mockReturnValueOnce([{name: '', type: 'bytes'}, {name: '', type: 'bytes'}]);

        expect(callContractMethod.afterExecution('ds0')).toEqual(['ds0', 'ds0']);

        expect(abiCoderMock.decodeParameters).toHaveBeenCalledWith(
            [{name: '', type: 'bytes'}, {name: '', type: 'bytes'}],
            'ds0'
        );
    });

    it('calls afterExecution and calls decodeParameter', () => {
        abiCoderMock.decodeParameter = jest.fn();

        abiCoderMock.decodeParameter.mockReturnValueOnce('ds0');

        abiItemModelMock.getOutputs.mockReturnValueOnce([{name: 'result', type: 'bytes'}]);

        expect(callContractMethod.afterExecution('ds0')).toEqual('ds0');

        expect(abiCoderMock.decodeParameter).toHaveBeenCalledWith({name: 'result', type: 'bytes'}, 'ds0');
    });

    it('calls afterExecution and response is empty', () => {
        expect(callContractMethod.afterExecution()).toEqual(null);
    });

    it('calls afterExecution and response has value "ds" is empty', () => {
        expect(callContractMethod.afterExecution('ds')).toEqual(null);
    });
});
