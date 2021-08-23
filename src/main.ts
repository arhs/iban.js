import { IbanValidator } from "./IbanValidator"

export const iban = {
    isValid(iban: string) {
        const ibanValidator = new IbanValidator();
        return ibanValidator.isValid(iban);
    },
    toBBAN(iban: string, separator?: string) {
        const ibanValidator = new IbanValidator();
        return ibanValidator.toBBAN(iban, separator);
    },
    fromBBAN(countryCode: string, bban: string) {
        const ibanValidator = new IbanValidator();
        return ibanValidator.fromBBAN(countryCode, bban);
    },
    isValidBBAN(countryCode: string, bban: string) {
        const ibanValidator = new IbanValidator();
        return ibanValidator.isValidBBAN(countryCode, bban);
    },
    printFormat(iban: string, separator?: string) {
        const ibanValidator = new IbanValidator();
        return ibanValidator.printFormat(iban, separator);
    },
    electronicFormat(iban: string) {
        const ibanValidator = new IbanValidator();
        return ibanValidator.electronicFormat(iban);
    },
    availableCountries() {
        const ibanValidator = new IbanValidator();
        return ibanValidator.countries;
    }
}