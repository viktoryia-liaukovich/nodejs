import axios from "axios";
import { PUBLIC_HOLIDAYS_API_URL } from "../../config";
import { PublicHoliday } from "../../types";

describe('PublicHolidays', () => {
    describe('/api/v3/PublicHolidays', () => {
        it('should return list of public holidays for PL in 2023', async () => {
            const { data: publicHolidays } = await axios.get<PublicHoliday[]>(
                `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2023/pl`,
            );

            expect(publicHolidays.length).toBe(13);
        });

        it('should return status 404 if country is not valid', async () => {
            const { response: { status  } } = await axios.get<PublicHoliday[]>(
                `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2023/qewwqewq`,
            ).catch((error) => error);

            expect(status).toEqual(404);
        });
    });

    describe('/api/v3/CountryInfo', () => {
        it('should return country details for PL', async () => {
            const { data: countryDetails } = await axios.get(
                `${PUBLIC_HOLIDAYS_API_URL}/CountryInfo/pl`,
            );

            expect(countryDetails.officialName).toBe('Republic of Poland');
        });

        it('should return status 404 if country is not valid', async () => {
            const { response: { status  } } = await axios.get(
                `${PUBLIC_HOLIDAYS_API_URL}/CountryInfo/qewwqewq`,
            ).catch((error) => error);

            expect(status).toEqual(404);
        });
    });
})