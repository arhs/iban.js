/**
     * Create a new Specification for a valid IBAN number.
     *
     * @param countryCode the code of the country
     * @param length the length of the IBAN
     * @param structure the structure of the underlying BBAN (for validation and formatting)
     * @param example an example valid IBAN
     * @constructor
     */
export class Specification {
    constructor(public countryCode: string = countryCode, private length: number = length, private structure: string = structure, public example: string = example) { }

    private cachedRegex: any;
    private A = 'A'.charCodeAt(0);
    private Z = 'Z'.charCodeAt(0);

    /**
     * Check if the passed iban is valid according to this specification.
     *
     * @param {String} iban the iban to validate
     * @returns {boolean} true if valid, false otherwise
     */
    public isValid(iban: string): boolean {
        return this.length === iban.length
            && this.countryCode === iban.slice(0, 2)
            && this.regex().test(iban.slice(4))
            && this.iso7064Mod97_10(this.iso13616Prepare(iban)) === 1;
    }

    /**
     * Convert the passed IBAN to a country-specific BBAN.
     *
     * @param iban the IBAN to convert
     * @param separator the separator to use between BBAN blocks
     * @returns {string} the BBAN
     */
    public toBBAN(iban: string, separator: string): string {
        return this.regex().exec(iban.slice(4)).slice(1).join(separator);
    }

    /**
     * Convert the passed BBAN to an IBAN for this country specification.
     * Please note that <i>"generation of the IBAN shall be the exclusive responsibility of the bank/branch servicing the account"</i>.
     * This method implements the preferred algorithm described in http://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits
     *
     * @param bban the BBAN to convert to IBAN
     * @returns {string} the IBAN
     */
    public fromBBAN(bban: string): string {
        if (!this.isValidBBAN(bban)) {
            throw new Error('Invalid BBAN');
        }

        const remainder = this.iso7064Mod97_10(this.iso13616Prepare(`${this.countryCode}00${bban}`))
        const checkDigit = (`0${(98 - remainder)}`).slice(-2);

        return `${this.countryCode}${checkDigit}${bban}`;
    }

    /**
     * Check of the passed BBAN is valid.
     * This function only checks the format of the BBAN (length and matching the letetr/number specs) but does not
     * verify the check digit.
     *
     * @param bban the BBAN to validate
     * @returns {boolean} true if the passed bban is a valid BBAN according to this specification, false otherwise
     */
    public isValidBBAN(bban: string): boolean {
        return this.length - 4 === bban.length
            && this.regex().test(bban);
    }

    /**
     * Parse the BBAN structure used to configure each IBAN Specification and returns a matching regular expression.
     * A structure is composed of blocks of 3 characters (one letter and 2 digits). Each block represents
     * a logical group in the typical representation of the BBAN. For each group, the letter indicates which characters
     * are allowed in this group and the following 2-digits number tells the length of the group.
     *
     * @param {string} structure the structure to parse
     * @returns {RegExp}
     */
    private parseStructure(structure: string): RegExp {
        // split in blocks of 3 chars
        const regex = structure.match(/(.{3})/g)?.map(function (block) {

            // parse each structure block (1-char + 2-digits)
            let format;
            const pattern = block.slice(0, 1);
            const repeats = parseInt(block.slice(1), 10);

            switch (pattern) {
                case "A": format = "0-9A-Za-z"; break;
                case "B": format = "0-9A-Z"; break;
                case "C": format = "A-Za-z"; break;
                case "F": format = "0-9"; break;
                case "L": format = "a-z"; break;
                case "U": format = "A-Z"; break;
                case "W": format = "0-9a-z"; break;
            }

            return `([${format}]{${repeats}})`;
        });

        if (!regex) {
            throw new Error('Something went wrong while parsing the structure');
        }

        return new RegExp(`^${regex.join('')}$`);
    }

    /**
     * Prepare an IBAN for mod 97 computation by moving the first 4 chars to the end and transforming the letters to
     * numbers (A = 10, B = 11, ..., Z = 35), as specified in ISO13616.
     *
     * @param {string} iban the IBAN
     * @returns {string} the prepared IBAN
     */
    private iso13616Prepare(iban: string): string {
        let formattedIban = iban.toUpperCase()
        formattedIban = `${iban.substr(4)}${iban.substr(0, 4)}`;

        return formattedIban.split('').map((n) => {
            const code = n.charCodeAt(0);
            if (code >= this.A && code <= this.Z) {
                // A = 10, B = 11, ... Z = 35
                return code - this.A + 10;
            } else {
                return n;
            }
        }).join('');
    }

    /**
     * Calculates the MOD 97 10 of the passed IBAN as specified in ISO7064.
     *
     * @param {string} iban the IBAN
     * @returns {number}
     */
    private iso7064Mod97_10(iban: string): number {
        let remainder = iban;
        let block;

        while (remainder.length > 2) {
            block = remainder.slice(0, 9);
            remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
        }

        return parseInt(remainder, 10) % 97;
    }

    /**
     * Lazy-loaded regex (parse the structure and construct the regular expression the first time we need it for validation)
     */
    private regex() {
        return this.cachedRegex || (this.cachedRegex = this.parseStructure(this.structure))
    }
}