import {AbiCoder} from 'web3-eth-abi';
import AllEventsLogDecoder from '../../../src/decoders/AllEventsLogDecoder';
import AbiModel from '../../../src/models/AbiModel';
import AbiItemModel from '../../../src/models/AbiItemModel';

// Mocks
jest.mock('web3-eth-abi');
jest.mock('../../../src/models/AbiModel');
jest.mock('../../../src/models/AbiItemModel');

/**
 * AllEventsLogDecoder test
 */
describe('AllEventsLogDecoderTest', () => {
    let allEventsLogDecoder, abiCoderMock, abiModelMock;

    beforeEach(() => {
        new AbiCoder();
        abiCoderMock = AbiCoder.mock.instances[0];
        abiCoderMock.decodeLog = jest.fn();

        new AbiModel({});
        abiModelMock = AbiModel.mock.instances[0];

        allEventsLogDecoder = new AllEventsLogDecoder(abiCoderMock);
    });

    it('constructor check', () => {
        expect(allEventsLogDecoder.abiCoder).toEqual(abiCoderMock);
    });

    it('calls decode and returns the expected value', () => {
        new AbiItemModel({});
        const abiItemModel = AbiItemModel.mock.instances[0];

        const response = {
            topics: ['ds0'],
            data: 'ds0'
        };

        abiCoderMock.decodeLog.mockReturnValueOnce(['ds0']);

        abiModelMock.getEventBySignature.mockReturnValueOnce(abiItemModel);

        abiItemModel.getInputs.mockReturnValueOnce([]);

        const decodedLog = allEventsLogDecoder.decode(abiModelMock, response);

        expect(decodedLog.data).toEqual(undefined);

        expect(decodedLog.topics).toEqual(undefined);

        expect(decodedLog.raw.data).toEqual('ds0');

        expect(decodedLog.raw.topics).toEqual(['ds0']);

        expect(decodedLog.signature).toEqual(abiItemModel.signature);

        expect(decodedLog.event).toEqual(abiItemModel.name);

        expect(decodedLog.returnValues).toEqual(['ds0']);

        expect(abiModelMock.getEventBySignature).toHaveBeenCalledWith('ds0');

        expect(abiCoderMock.decodeLog).toHaveBeenCalledWith([], 'ds0', []);

        expect(abiItemModel.getInputs).toHaveBeenCalled();
    });

    it('calls decode and returns the response without decoding it because there is no event with this name in the ABI', () => {
        const response = {
            topics: ['ds0'],
            data: 'ds0'
        };

        abiModelMock.getEventBySignature.mockReturnValueOnce(false);

        const decodedLog = allEventsLogDecoder.decode(abiModelMock, response);

        expect(decodedLog.raw.data).toEqual('ds0');

        expect(decodedLog.raw.topics).toEqual(['ds0']);

        expect(abiModelMock.getEventBySignature).toHaveBeenCalledWith('ds0');
    });
});
