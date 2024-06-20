import {getAbsenceData} from "./api";

describe('getAbsenceData', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch and return data successfully', async () => {
        const mockData = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
        global.fetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: jest.fn().mockResolvedValue(mockData),
        });

        const data = await getAbsenceData();
        expect(data).toEqual(mockData);
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