import axios from "axios";
import publicHolidaysGB2023 from './data/gb-holidays.json';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "../../services/public-holidays.service";
import { PUBLIC_HOLIDAYS_API_URL } from "../../config";
import { PublicHoliday } from "../../types";

describe('public-holidays.service', () => {
    describe('getListOfPublicHolidays', () => {
        it('should return list of public holidays', async () => {
            const result = await getListOfPublicHolidays(2023, 'GB');
            expect(result).toEqual(publicHolidaysGB2023);
        });

        it('should throw error if country is not valid', async () => {
            getListOfPublicHolidays(2023, 'pldsadas').catch((error) => {
                expect(error).toEqual(new Error('Country provided is not supported, received: pldsadas'));
            });
        });

        it('should throw error if year is not valid', async () => {
            getListOfPublicHolidays(1000, 'GB').catch((error) => {
                expect(error).toEqual(new Error('Year provided not the current, received: 1000'));
            });
        });
    });

    describe('checkIfTodayIsPublicHoliday', () => {
        it('should return true if today is public holiday, instead false', async () => {
            const { status } = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/GB`);
            const isHoliday = status === 200;

            const result = await checkIfTodayIsPublicHoliday('GB');
            expect(result).toBe(isHoliday);
        });

        it('should return false if error appeared', async () => {
            checkIfTodayIsPublicHoliday('pl').catch((error) => {
                expect(error).toEqual(new Error('Country provided is not supported, received: pl'));
            });
        });
    });

    describe('getNextPublicHolidays', () => {
        it('should return list of next public holidays', async () => {
            const { data: publicHolidays } = await axios.get<PublicHoliday[]>(
                `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/gb`,
            );
            const expected =  publicHolidays.map((holiday) => ({
                name: holiday.name,
                localName: holiday.localName,
                date: holiday.date,
            }));

            const result = await getNextPublicHolidays('GB');
            expect(result).toEqual(expected);
        });

        it('should return empty array if error appeared', async () => {
            await getNextPublicHolidays('pl').catch((error) => {
                expect(error).toEqual(new Error('Country provided is not supported, received: pl'));
            });
        });
    });

})