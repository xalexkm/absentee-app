
export const getAbsenceData = async () => {
    try {
        const response = await fetch('https://front-end-kata.brighthr.workers.dev/api/absences');

        if (!response.ok) {
            throw new Error(`Failed to fetch all absences data, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching absence data:', error);
        throw error;
    }
};