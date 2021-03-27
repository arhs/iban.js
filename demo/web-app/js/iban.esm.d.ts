declare class Specification {
    countryCode: string;
    private length;
    private structure;
    example: string;
    constructor(countryCode?: string, length?: number, structure?: string, example?: string);
    private cachedRegex;
    private A;
    private Z;
    isValid(iban: string): boolean;
    toBBAN(iban: string, separator: string): string;
    fromBBAN(bban: string): string;
    isValidBBAN(bban: string): boolean;
    private parseStructure;
    private iso13616Prepare;
    private iso7064Mod97_10;
    private regex;
}
declare const iban: {
    isValid(iban: string): boolean;
    toBBAN(iban: string, separator?: string | undefined): string;
    fromBBAN(countryCode: string, bban: string): string;
    isValidBBAN(countryCode: string, bban: string): boolean;
    printFormat(iban: string, separator?: string | undefined): string;
    electronicFormat(iban: string): string;
    availableCountries(): {
        [key: string]: Specification;
    };
};
export { iban };
