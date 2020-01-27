// run in browser
if ('undefined' != typeof require) {
    var expect = require('chai').expect,
        IBAN = require('../iban.js');
}

describe('IBAN', function(){

    describe('.isValid', function(){

        it('should return false when input is not a String', function(){
            expect(IBAN.isValid(1)).to.be.false;
            expect(IBAN.isValid([])).to.be.false;
            expect(IBAN.isValid({})).to.be.false;
            expect(IBAN.isValid(true)).to.be.false;
        });

        it('should return false for an unknown country code digit', function(){
            expect(IBAN.isValid('ZZ68539007547034')).to.be.false;
        });

        it('should return true for a valid belgian IBAN', function(){
            expect(IBAN.isValid('BE68539007547034')).to.be.true;
        });

        it('should return true for a valid Dutch IBAN', function(){
            expect(IBAN.isValid('NL86INGB0002445588')).to.be.true;
        });

        it('should return true for a valid Moldovan IBAN', function(){
            expect(IBAN.isValid('MD75EX0900002374642125EU')).to.be.true;
        });

        it('should return true for a valid Saint-Lucia IBAN', function(){
            expect(IBAN.isValid('LC55HEMM000100010012001200023015')).to.be.true;
        });
        
        it('should return false for an incorrect check digit', function(){
            expect(IBAN.isValid('BE68539007547035')).to.be.false;
        });
        
        it('should return true for a valid Côte d\'Ivoire IBAN', function(){
            expect(IBAN.isValid('CI93CI0080111301134291200589')).to.be.true;
        });

        it('should return true for all examples', function(){
            Object.keys(IBAN.countries).forEach(function(countryCode){
                expect(IBAN.isValid(IBAN.countries[countryCode].example)).to.be.true;
            });
        });

        it('should return false for all examples when modifying just one digit', function(){
            Object.keys(IBAN.countries).forEach(function(countryCode){
                var num = IBAN.countries[countryCode].example;
                num = num.slice(0, -1) + ((parseInt(num.slice(-1), 10) + 1) % 10);
                expect(IBAN.isValid(num)).to.be.false;
            });
        });

        it('should return true for a valid Egypt IBAN', function(){
            expect(IBAN.isValid('EG800002000156789012345180002')).to.be.true;
        });
    });

    describe('.electronicFormat', function(){

        it('should format a e-formatted belgian IBAN', function(){
            expect(IBAN.electronicFormat('BE68539007547034')).to.equal('BE68539007547034');
        });

        it('should format a print-formatted belgian IBAN', function(){
            expect(IBAN.electronicFormat('BE68 5390 0754 7034')).to.equal('BE68539007547034');
        });
    });

    describe('.printFormat', function(){

        it('should format a e-formatted belgian IBAN', function(){
            expect(IBAN.printFormat('BE68539007547034')).to.equal('BE68 5390 0754 7034');
        });

        it('should format a print-formatted belgian IBAN', function(){
            expect(IBAN.printFormat('BE68 5390 0754 7034')).to.equal('BE68 5390 0754 7034');
        });
    });

    describe('.toBBAN', function(){

        it('should output the right BBAN from a Belgian IBAN', function(){
            expect(IBAN.toBBAN('BE68 5390 0754 7034', '-')).to.equal('539-0075470-34');
        });

        it('should use space as default separator', function(){
            expect(IBAN.toBBAN('BE68 5390 0754 7034')).to.equal('539 0075470 34');
        });
    });

    describe('.fromBBAN', function(){

        it('should output the right IBAN from a Belgian BBAN', function(){
            expect(IBAN.fromBBAN('BE', '539007547034')).to.equal('BE68539007547034');
        });

        it('should output the right IBAN from a Belgian BBAN, ignoring format', function(){
            expect(IBAN.fromBBAN('BE', '539-0075470-34')).to.equal('BE68539007547034');
        });

        it('should throw an error if the BBAN is invalid', function(){
            expect(function(){
                IBAN.fromBBAN('BE', '1539-0075470-34');
            }).to.throw(Error).and.throw(/Invalid BBAN/);
        });
    });

    describe('.isValidBBAN', function(){

        it('should return false when input is not a String', function(){
            expect(IBAN.isValidBBAN('BE', 1)).to.be.false;
            expect(IBAN.isValidBBAN('BE', {})).to.be.false;
            expect(IBAN.isValidBBAN('BE', [])).to.be.false;
            expect(IBAN.isValidBBAN('BE', true)).to.be.false;
        });

        it('should validate a correct Belgian BBAN', function(){
            expect(IBAN.isValidBBAN('BE', '539007547034')).to.be.true;
        });

        it('should return true for a valid Dutch IBAN', function(){
            expect(IBAN.isValidBBAN('NL', 'INGB0002445588')).to.be.true;
        });

        it('should validate a correct Belgian BBAN, ignoring format', function(){
            expect(IBAN.isValidBBAN('BE', '539-0075470-34')).to.be.true;
        });

        it('should detect invalid BBAN length', function(){
            expect(IBAN.isValidBBAN('BE', '1539-0075470-34')).to.be.false;
        });

        it('should detect invalid BBAN format', function(){
            expect(IBAN.isValidBBAN('BE', 'ABC-0075470-34')).to.be.false;
        });
    });
});