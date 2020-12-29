import {inputBlockNumberFormatter} from '../../../src/Formatters';
/**
 * inputBlockNumberFormatter test
 */
describe('InputBlockNumberFormatterTest', () => {
    it('inputDefaultBlockNumberFormatter returns undefined', () => {
        expect(inputBlockNumberFormatter(undefined)).toEqual(undefined);
    });

    it('inputDefaultBlockNumberFormatter returns null', () => {
        expect(inputBlockNumberFormatter(undefined)).toEqual(undefined);
    });

    it('inputDefaultBlockNumberFormatter returns "earliest"', () => {
        expect(inputBlockNumberFormatter('earliest')).toEqual('earliest');
    });

    it('inputDefaultBlockNumberFormatter returns hex string in lower case', () => {
        expect(inputBlockNumberFormatter('ds0')).toEqual('ds0');
    });

    it('inputDefaultBlockNumberFormatter returns hex string when hex is given as number', () => {
        expect(inputBlockNumberFormatter(ds0)).toEqual('ds0');
    });

    it('inputDefaultBlockNumberFormatter returns hex from given block number', () => {
        expect(inputBlockNumberFormatter(100)).toEqual('ds64');
    });
});
