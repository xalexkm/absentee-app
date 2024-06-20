function addDaysToDate(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);

    return date.toISOString();
}

export { addDaysToDate }