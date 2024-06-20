import { addDaysToDate } from '../utils'

export const getAbsenceData = async () => {
    try {
        const response = await fetch('https://front-end-kata.brighthr.workers.dev/api/absences');

        if (!response.ok) {
            throw new Error(`Failed to fetch all absences data, status: ${response.status}`);
        }

        const data = await response.json();

        const sanitizedData = data.map((item) => ({
            ...item,
            endDate: item.startDate ? addDaysToDate(item.startDate, item.days) : null
        }))

        return sanitizedData;
    } catch (error) {
        console.error('Error fetching absence data:', error);
        throw error;
    }
};