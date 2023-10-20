import axios from "axios";
import publicHolidaysMock from '../mocks/public-holidays.mock.json';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "../../services/public-holidays.service";

jest.mock('axios');
jest.mock('../../helpers', () => ({
    shortenPublicHoliday: jest.fn().mockImplementation((holiday) => holiday.name),
    validateInput: jest.fn(),
}));

describe('public-holidays.service', () => {
    describe('getListOfPublicHolidays', () => {
        it('should return list of public holidays', async () => {
            axios.get = jest.fn().mockReturnValue({ data: publicHolidaysMock });
            const result = await getListOfPublicHolidays(2023, 'pl');
            expect(result).toEqual(["New Year's Day", "Epiphany"]);
        });

        it('should return empty array if error appeared', async () => {
            axios.get = jest.fn().mockImplementation(() => {
                throw new Error()
            });
            const result = await getListOfPublicHolidays(2023, 'pl');
            expect(result).toEqual([]);
        });
    });

    describe('checkIfTodayIsPublicHoliday', () => {
        it('should return true when current day is public holiday', async () => {
            axios.get = jest.fn().mockReturnValue({ status: 200 });
            const result = await checkIfTodayIsPublicHoliday('pl');
            expect(result).toBe(true);
        });

        it('should return false when current day is not public holiday', async () => {
            axios.get = jest.fn().mockReturnValue({ status: 204 });
            const result = await checkIfTodayIsPublicHoliday('pl');
            expect(result).toBe(false);
        });

        it('should return false if error appeared', async () => {
            axios.get = jest.fn().mockImplementation(() => {
                throw new Error()
            });
            const result = await checkIfTodayIsPublicHoliday('pl');
            expect(result).toBe(false);
        });
    });

    describe('getNextPublicHolidays', () => {
        it('should return list of next public holidays', async () => {
            axios.get = jest.fn().mockReturnValue({ data: publicHolidaysMock });
            const result = await getNextPublicHolidays('pl');
            expect(result).toEqual(["New Year's Day", "Epiphany"]);
        });

        it('should return empty array if error appeared', async () => {
            axios.get = jest.fn().mockImplementation(() => {
                throw new Error()
            });
            const result = await getNextPublicHolidays('pl');
            expect(result).toEqual([]);
        });
    });

})