

export default function Table({ data }) {
    return (
        <table className="table">
            <thead className="table-header-group">
            <tr className="table-row">
                <th className={'table-cell'}>Name</th>
                <th className={'table-cell'}>Absence Type</th>
                <th className={'table-cell'}>Approved/Pending Approval</th>
                <th className={'table-cell'}>Start Date</th>
                <th className={'table-cell'}>End Date</th>
            </tr>
            </thead>
            <tbody className="table-row-group">
            {data.map((row, index) => (
                <tr className="table-row" key={index}>
                    <td className="table-cell">{row.employee.firstName} {row.employee.lastName}</td>
                    <td className="table-cell">{row.absenceType}</td>
                    <td className="table-cell">{row.approved ? 'True' : 'False'}</td>
                    <td className="table-cell">{row.startDate}</td>
                    <td className="table-cell">{row.days}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}