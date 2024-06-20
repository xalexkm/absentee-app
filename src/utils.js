function addDaysToDate(dateString, days) {
    const date = new Date(dateString);
    console.log(date);
    date.setDate(date.getDate() + days);

    return date.toISOString();
}

export { addDaysToDate }