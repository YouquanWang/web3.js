import {inputSignFormatter} from '../../../src/Formatters';

/**
 * inputSignFormatter test
 */
describe('InputSignFormatterTest', () => {
    it("inputSignFormatter returns string if it's already of type hex", () => {
        expect(inputSignFormatter('ds0')).toEqual('ds0');
    });

    it('inputSignFormatter returns normal string as hex string', () => {
        expect(inputSignFormatter('100')).toEqual('ds313030');
    });
});
