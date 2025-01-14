import isArray from 'lodash/isArray';
import BN from 'bn.js';
import {soliditySha3} from '../../src/SoliditySha3';

/**
 * soliditySha3 test
 */
describe('SoliditySha3Test', () => {
    const tests = [
        {
            values: [
                true,
                {value: true, type: 'bool'},
                {v: true, t: 'bool'},
                {v: true, type: 'bool'},
                {value: true, t: 'bool'}
            ],
            expected: 'ds5fe7f977e71dba2ea1a68e21057beebb9be2ac30c6410aa38d4f3fbe41dcffd2'
        },
        {
            values: [
                false,
                {value: false, type: 'bool'},
                {v: false, t: 'bool'},
                {v: false, type: 'bool'},
                {value: false, t: 'bool'}
            ],
            expected: 'dsbc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a'
        },
        {
            values: [
                'Hello!%',
                {value: 'Hello!%', type: 'string'},
                {value: 'Hello!%', type: 'string'},
                {v: 'Hello!%', t: 'string'}
            ],
            expected: 'ds661136a4267dba9ccdf6bfddb7c00e714de936674c4bdb065a531cf1cb15c7fc'
        },
        {
            values: [
                2345676856,
                '2345676856',
                new BN('2345676856'),
                new BN('2345676856', 10),
                {v: '2345676856', t: 'uint256'},
                {v: new BN('2345676856'), t: 'uint256'},
                {v: '2345676856', t: 'uint'}
            ],
            expected: 'dsc0a8dac986ad882fff6b05a7792e1259f2fd8fa72d632fb48f54affea59af6fc'
        },
        {
            values: [
                '2342342342342342342345676856',
                new BN('2342342342342342342345676856'),
                new BN('2342342342342342342345676856', 10),
                {v: '2342342342342342342345676856', t: 'uint256'},
                {v: '2342342342342342342345676856', t: 'uint'}
            ],
            expected: 'ds8ac2efaaee0058e1f1fbcb59643f6799c31c27096a347651e40f98daf1905094'
        },
        {
            values: [{v: '56', t: 'uint8'}],
            expected: 'dse4b1702d9298fee62dfeccc57d322a463ad55ca201256d01f62b45b2e1c21c10'
        },
        {
            values: [{v: '256', t: 'uint16'}],
            expected: 'ds628bf3596747d233f1e6533345700066bf458fa48daedaf04a7be6c392902476'
        },
        {
            values: [{v: '3256', t: 'uint32'}],
            expected: 'ds720e835027b41b4b3e057ee9e6d4351ffc726d767652cdb0fc874869df88001c'
        },
        {
            values: [{v: '454256', t: 'uint64'}],
            expected: 'ds5ce6ff175acd532fb4dcef362c829e74a0ce1fde4a43885cca0d257b33d06d07'
        },
        {
            values: [
                {v: '44454256', t: 'uint128'},
                {v: '44454256', t: 'int128'} // should be the same
            ],
            expected: 'ds372b694bc0f2dd9229f39b3892621a6ae3ffe111c5096a0a9253c34558a92ab8'
        },
        {
            values: [{v: '3435454256', t: 'uint160'}],
            expected: 'ds89e0942df3602c010e0252becbbe1b4053bd4a871a021c02d8ab9878f1194b6b'
        },
        {
            values: [
                'ds2345435675432144555ffffffffdd222222222222224444556553522',
                {v: 'ds2345435675432144555ffffffffdd222222222222224444556553522', t: 'bytes'},
                {v: '2345435675432144555ffffffffdd222222222222224444556553522', t: 'bytes'},
                {error: true, v: 'ds2345435675432144555ffffffffdd22222222222222444455655352', t: 'bytes'}
            ],
            expected: 'dsb7ecb0d74e96b792a62b4a9dad28f5b1795417a89679562178b1987e0767e009'
        },
        {
            values: [
                -3435454256,
                new BN(-3435454256),
                new BN('-3435454256'),
                '-3435454256',
                {v: '-3435454256', t: 'int'},
                {v: '-3435454256', t: 'int256'}
            ],
            expected: 'ds858d68fc4ad9f80dc5ee9571c7076298f8139d1d111e0955426de9381b10a061'
        },
        {
            values: [{v: '-36', t: 'int8'}],
            expected: 'dsd1023f33bbf70407fe1e7011c03159e2efe16e44fa97b4a8d50bc4acbfd6ce23'
        },
        {
            values: [{v: 'ds22', t: 'bytes2'}, {v: '22', t: 'bytes2'}, {error: true, v: 'ds222222', t: 'bytes2'}],
            expected: 'dsb07fb0a3471486f9ccb02aab1d525df60d82925cb2d27860f923e655d76f35fc'
        },
        {
            values: [{v: 'ds44222266', t: 'bytes4'}, {v: '44222266', t: 'bytes4'}],
            expected: 'ds7cdb669d75710eb06b9b34618e77206db56f0cc71698f246433ce8339ed8075b'
        },
        {
            values: [
                {v: 'ds44555ffffffffdd222222222222224444556553522', t: 'bytes32'},
                {v: '44555ffffffffdd222222222222224444556553522', t: 'bytes32'}
            ],
            expected: 'ds5aac5a7501e071c3ee062ede777be470acb4cd05a2724146438d7e4518d91677'
        },
        {
            values: [
                'ds407D73d8a49eeb85D32Cf465507dd71d507100c1',
                'ds407d73d8a49eeb85D32Cf465507dd71d507100c1', // invalid checksum, should work as it is interpreted as address
                {v: 'ds407D73d8a49eeb85D32Cf465507dd71d507100c1', t: 'address'},
                {error: true, v: 'ds407d73d8a49eeb85D32Cf465507dd71d507100c1', t: 'address'},
                {v: 'ds407D73d8a49eeb85D32Cf465507dd71d507100c1', t: 'bytes'},
                {v: 'ds407D73d8a49eeb85D32Cf465507dd71d507100c1', t: 'bytes20'}
            ],
            expected: 'ds4e8ebbefa452077428f93c9520d3edd60594ff452a29ac7d2ccc11d47f3ab95b'
        },
        {
            values: [{v: '36', t: 'int8'}],
            expected: 'dsb104e6a8e5e1477c7a8346486401cbd4f10ab4840a4201066d9b59b747cb6f88'
        },
        {
            values: [{v: '36', t: 'int256'}],
            expected: 'ds7cd332d19b93bcabe3cce7ca0c18a052f57e5fd03b4758a09f30f5ddc4b22ec4'
        },
        {
            values: [
                {v: [-12, 243], t: 'int[]'},
                {v: [-12, 243], t: 'int256[]'},
                {v: ['-12', '243'], t: 'int256[]'},
                {v: [new BN('-12'), new BN('243')], t: 'int256[]'},
                {v: ['-12', '243'], t: 'int256[2]'}
            ],
            expected: 'dsa9805b78a6ec1d71c3722498d521fde9d3913c92360e3aed06a9403db25f0351'
        },
        {
            values: [
                {v: [12, 243], t: 'uint[]'},
                {v: [12, 243], t: 'uint256[]'},
                {v: ['12', '243'], t: 'uint256[]'},
                {v: [new BN('12'), new BN('243')], t: 'uint256[]'},
                {v: ['12', '243'], t: 'uint256[2]'},
                {error: true, v: ['12', '243'], t: 'uint256[1]'}
            ],
            expected: 'ds74282b2d1a7a1a70af6f3a43ab576cd6feeaa6ebaa5fb2033b90d5942bf48a60'
        },
        {
            values: [{v: ['ds234656', 'ds23434234234ffff456'], t: 'bytes32[]'}],
            expected: 'ds3f67732837541dd9e3aa29cb99d88839fceccf9486b3ec053d82d339d35c79d5'
        },
        {
            values: [{v: 'ds234656', t: 'bytes16'}, {v: '234656', t: 'bytes16'}],
            expected: 'ds5d0d56c5b556a2dfee96b3de4717b3bd0333b7ffa5932e208fdcc24a03bdf088'
        },
        {
            values: [
                {v: ['ds234656', 'ds23434234234ffff456'], t: 'bytes16[]'},
                {v: ['234656', '23434234234ffff456'], t: 'bytes16[]'}
            ],
            expected: 'ds3f67732837541dd9e3aa29cb99d88839fceccf9486b3ec053d82d339d35c79d5'
        },
        {
            values: [
                {
                    v: ['ds407D73d8a49eeb85D32Cf465507dd71d507100c1', 'ds85F43D8a49eeB85d32Cf465507DD71d507100C1d'],
                    t: 'address[]'
                },
                {
                    v: ['ds407D73d8a49eeb85D32Cf465507dd71d507100c1', 'ds85F43D8a49eeB85d32Cf465507DD71d507100C1d'],
                    t: 'address[2]'
                },
                {
                    error: true,
                    v: ['ds407d73d8a49eeb85D32Cf465507dd71d507100c1', 'ds85F43D8a49eeB85d32Cf465507DD71d507100C1d'],
                    t: 'address[]'
                },
                {
                    error: true,
                    v: ['ds407D73d8a49eeb85D32Cf465507dd71d507100c1', 'ds85F43D8a49eeB85d32Cf465507DD71d507100C1d'],
                    t: 'address[4]'
                }
            ],
            expected: 'ds1dcd26e646452836052e2a57400510aa63e07aede06fa43660cb6054edacfce0'
        },
        {
            values: [{v: 0, t: 'uint'}],
            expected: 'ds290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563'
        },
        {
            values: [
                ['someValue'] // should error
            ],
            expected: ''
        }
    ];

    describe('calls soliditySha3', () => {
        tests.forEach((test) => {
            test.values.forEach((value) => {
                it('should hash "' + JSON.stringify(value) + '" into "' + test.expected + '"', () => {
                    if (value.error || isArray(value)) {
                        expect(soliditySha3.bind(null, value)).toThrow();
                    } else {
                        expect(soliditySha3(value)).toEqual(test.expected);
                    }
                });
            });
        });

        it('should hash mixed boolean values in any order', () => {
            expect(
                soliditySha3(
                    tests[0].values[1], // true
                    tests[1].values[0], // false
                    tests[1].values[2], // false
                    tests[0].values[3] // true
                )
            ).toEqual('ds4ba958c4829ba5d3f9eaa61058ef208aba8bc25c0b6e33044015e0af9fb1c35d');
        });

        it('should hash mixed string and number values in any order', () => {
            expect(
                soliditySha3(
                    tests[2].values[0], // 'Hello!%'
                    tests[3].values[2], // 2345676856
                    tests[4].values[2], // '2342342342342342342345676856'
                    tests[2].values[3], // 'Hello!%'
                    tests[1].values[2] // false
                )
            ).toEqual('ds7eb45eb9a0e1f6904514bc34c8b43e71c2e1f96f21b45ea284a0418cb351ec69');
        });

        it('should hash mixed number types in any order', () => {
            expect(
                soliditySha3(
                    tests[5].values[0], // v: '56', t: 'uint8'
                    tests[6].values[0], // v: '256', t: 'uint16'
                    tests[7].values[0], // v: '3256', t: 'uint32'
                    tests[8].values[0], // v: '454256', t: 'uint64'
                    tests[9].values[0], // v: '44454256', t: 'uint128'
                    tests[10].values[0] // v: '3435454256', t: 'uint160'
                )
            ).toEqual('ds31d6c48574796dfb1a652f2e5c5a261db0677e39fff5c3032449c50eade4b6b6');
        });

        it('should hash mixed number types addresses and boolean in any order', () => {
            expect(
                soliditySha3(
                    tests[5].values[0], // v: '56', t: 'uint8'
                    tests[13].values[0], // v: '-36', t: 'int8'
                    tests[15].values[0], // v: 'ds44222266', t: 'bytes4'
                    tests[0].values[0], // true
                    tests[17].values[1] // v: 'ds407D73d8a49eeb85D32Cf465507dd71d507100c1', t: 'address'
                )
            ).toEqual('ds334086a8fa05e16afb86bed41c614aa74e99ea32eefe8ce0026b4076ce217698');
        });

        it('should hash mixed number arrays addresses and boolean in any order', () => {
            expect(
                soliditySha3(
                    tests[15].values[1], // v: 'ds44222266', t: 'bytes4'
                    tests[25].values[0], // address array
                    tests[0].values[0], // true
                    tests[13].values[0], // v: '-36', t: 'int8'
                    tests[12].values[5], // v: '-3435454256', t: 'int256'
                    tests[17].values[0], // ds407D73d8a49eeb85D32Cf465507dd71d507100c1
                    tests[17].values[1] // v: ds407D73d8a49eeb85D32Cf465507dd71d507100c1 t: address
                )
            ).toEqual('ds61c62b29bbe21d8821a938f7331ac875859cc50331556b3383196b19cfc45aff');
        });
    });
});
