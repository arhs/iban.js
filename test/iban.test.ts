import { iban } from '../src/main';

describe('IBAN', () => {

    describe('.isValid', () => {

        it('should return false when input is not a String', () => {
            // @ts-expect-error test the case of an invalid param type
            expect(iban.isValid(1)).toBe(false);
            // @ts-expect-error test the case of an invalid param type
            expect(iban.isValid([])).toBe(false);
            // @ts-expect-error test the case of an invalid param type
            expect(iban.isValid({})).toBe(false);
            // @ts-expect-error test the case of an invalid param type
            expect(iban.isValid(true)).toBe(false);
        });

        it('should return false for an unknown country code digit', () => {
            expect(iban.isValid('ZZ68539007547034')).toBe(false);
        });

        it('should return true for a valid belgian IBAN', () => {
            expect(iban.isValid('BE68539007547034')).toBe(true);
        });

        it('should return true for a valid Dutch IBAN', () => {
            expect(iban.isValid('NL86INGB0002445588')).toBe(true);
        });

        it('should return true for a valid Moldovan IBAN', () => {
            expect(iban.isValid('MD75EX0900002374642125EU')).toBe(true);
        });

        it('should return true for a valid Saint-Lucia IBAN', () => {
            expect(iban.isValid('LC55HEMM000100010012001200023015')).toBe(true);
        });

        it('should return false for an incorrect check digit', () => {
            expect(iban.isValid('BE68539007547035')).toBe(false);
        });

        it('should return true for a valid Côte d\'Ivoire IBAN', () => {
            expect(iban.isValid('CI93CI0080111301134291200589')).toBe(true);
        });

        it('should return true for all examples', () => {
            const availableCountries = iban.availableCountries()
            Object.keys(availableCountries).forEach((countryCode) => {
                expect(iban.isValid(availableCountries[countryCode].example)).toBe(true);
            });
        });

        it('should return false for all examples when modifying just one digit', () => {
            const availableCountries = iban.availableCountries()
            Object.keys(availableCountries).forEach((countryCode) => {
                let num = availableCountries[countryCode].example;
                num = num.slice(0, -1) + ((parseInt(num.slice(-1), 10) + 1) % 10);
                expect(iban.isValid(num)).toBe(false);
            });
        });

        it('should return true for a valid Egypt IBAN', () => {
            expect(iban.isValid('EG800002000156789012345180002')).toBe(true);
        });
    });

    describe('.electronicFormat', () => {

        it('should format a e-formatted belgian IBAN', () => {
            expect(iban.electronicFormat('BE68539007547034')).toBe('BE68539007547034');
        });

        it('should format a print-formatted belgian IBAN', () => {
            expect(iban.electronicFormat('BE68 5390 0754 7034')).toBe('BE68539007547034');
        });
    });

    describe('.printFormat', () => {

        it('should format a e-formatted belgian IBAN', () => {
            expect(iban.printFormat('BE68539007547034')).toBe('BE68 5390 0754 7034');
        });

        it('should format a print-formatted belgian IBAN', () => {
            expect(iban.printFormat('BE68 5390 0754 7034')).toBe('BE68 5390 0754 7034');
        });
    });

    describe('.toBBAN', () => {

        it('should output the right BBAN from a Belgian IBAN', () => {
            expect(iban.toBBAN('BE68 5390 0754 7034', '-')).toBe('539-0075470-34');
        });

        it('should use space as default separator', () => {
            expect(iban.toBBAN('BE68 5390 0754 7034')).toBe('539 0075470 34');
        });
    });

    describe('.fromBBAN', () => {

        it('should output the right IBAN from a Belgian BBAN', () => {
            expect(iban.fromBBAN('BE', '539007547034')).toBe('BE68539007547034');
        });

        it('should output the right IBAN from a Belgian BBAN, ignoring format', () => {
            expect(iban.fromBBAN('BE', '539-0075470-34')).toBe('BE68539007547034');
        });

        it('should throw an error if the BBAN is invalid', () => {
            expect(() => {
                iban.fromBBAN('BE', '1539-0075470-34');
            }).toThrowError(/Invalid BBAN/);
        });
    });

    describe('.isValidBBAN', () => {

        it('should return false when input is not a String', () => {
            // @ts-expect-error test the case of an invalid param type
            expect(iban.isValidBBAN('BE', 1)).toBe(false);
            // @ts-expect-error test the case of an invalid param type
            expect(iban.isValidBBAN('BE', {})).toBe(false);
            // @ts-expect-error test the case of an invalid param type
            expect(iban.isValidBBAN('BE', [])).toBe(false);
            // @ts-expect-error test the case of an invalid param type
            expect(iban.isValidBBAN('BE', true)).toBe(false);
        });

        it('should validate a correct Belgian BBAN', () => {
            expect(iban.isValidBBAN('BE', '539007547034')).toBe(true);
        });

        it('should return true for a valid Dutch IBAN', () => {
            expect(iban.isValidBBAN('NL', 'INGB0002445588')).toBe(true);
        });

        it('should validate a correct Belgian BBAN, ignoring format', () => {
            expect(iban.isValidBBAN('BE', '539-0075470-34')).toBe(true);
        });

        it('should detect invalid BBAN length', () => {
            expect(iban.isValidBBAN('BE', '1539-0075470-34')).toBe(false);
        });

        it('should detect invalid BBAN format', () => {
            expect(iban.isValidBBAN('BE', 'ABC-0075470-34')).toBe(false);
        });
    });
});