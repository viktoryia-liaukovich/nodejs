import { SUPPORTED_COUNTRIES } from "../../config";
import { shortenPublicHoliday, validateInput } from "../../helpers";
import publicHolidaysMock from '../mocks/public-holidays.mock.json';

describe('helpers', () => {
    describe('validateInput', () => {
        it('should return true if country and year are valid', () => {
            expect(validateInput({year: new Date().getFullYear(), country: SUPPORTED_COUNTRIES[0]})).toBe(true);
        });

        it('should throw error if country is not valid', () => {
            try {
                validateInput({year: new Date().getFullYear(), country: 'country'});
            } catch(error) {
                expect(error).toEqual(new Error('Country provided is not supported, received: country'));
            }
        });

        it('should throw error if year is not valid', () => {
            try {
                validateInput({year: 1000, country: SUPPORTED_COUNTRIES[0]});
            } catch(error) {
                expect(error).toEqual(new Error('Year provided not the current, received: 1000'));
            }
        });
    });

    describe('shortenPublicHoliday', () => {
        it('should return minified public holiday', () => {
            expect(shortenPublicHoliday(publicHolidaysMock[0])).toEqual({
                date: "2023-01-01",
                localName: "Nowy Rok",
                name: "New Year's Day",
            })
        })
    })
})