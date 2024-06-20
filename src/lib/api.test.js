import {getAbsenceData} from "./api";

describe('getAbsenceData', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch and return data successfully', async () => {
        const mockData = [{
            "id": 0,
            "startDate": "2022-05-28T04:39:06.470Z",
            "days": 9,
            "absenceType": "SICKNESS",
            "employee": {
                "firstName": "Rahaf",
                "lastName": "Deckard",
                "id": "2ea05a52-4e31-450d-bbc4-5a6c73167d17"
            },
            "approved": true
        },
            {
                "id": 1,
                "startDate": "2022-02-08T08:02:47.543Z",
                "days": 5,
                "absenceType": "ANNUAL_LEAVE",
                "employee": {
                    "firstName": "Enya",
                    "lastName": "Behm",
                    "id": "84502153-69e6-4561-b2de-8f21f97530d3"
                },
                "approved": true
            }];

        const resultData = [{
            "id": 0,
            "startDate": "2022-05-28T04:39:06.470Z",
            "days": 9,
            "absenceType": "SICKNESS",
            "employee": {
                "firstName": "Rahaf",
                "lastName": "Deckard",
                "id": "2ea05a52-4e31-450d-bbc4-5a6c73167d17"
            },
            "approved": true,
            "endDate": "2022-06-06T04:39:06.470Z"
        },
            {
                "id": 1,
                "startDate": "2022-02-08T08:02:47.543Z",
                "days": 5,
                "absenceType": "ANNUAL_LEAVE",
                "employee": {
                    "firstName": "Enya",
                    "lastName": "Behm",
                    "id": "84502153-69e6-4561-b2de-8f21f97530d3"
                },
                "approved": true,
                "endDate": "2022-02-13T08:02:47.543Z"
            }];

        global.fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue(mockData),
        });

        const data = await getAbsenceData();
        expect(data).toEqual(resultData);
        expect(global.fetch).toHaveBeenCalledWith('https://front-end-kata.brighthr.workers.dev/api/absences');
    });

    it('should throw an error for non-OK responses', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        });

        await expect(getAbsenceData()).rejects.toThrow('Failed to fetch all absences data, status: 404');
        expect(global.fetch).toHaveBeenCalledWith('https://front-end-kata.brighthr.workers.dev/api/absences');
    });

    it('should handle fetch errors', async () => {
        global.fetch.mockRejectedValue(new Error('Some random error'));

        await expect(getAbsenceData()).rejects.toThrow('Some random error');
    });
});