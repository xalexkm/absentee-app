import {useState} from "react";


export default function Table({ data }) {
    const [view, setView] = useState(data);
    const [isFiltered, setIsFiltered] = useState(false);
    const onNameClick = (id) => {
        const filteredView = data.filter((employee) => employee.employee.id === id)
        setView(filteredView);
        setIsFiltered(true);
    }

    const handleBackClick = () => {
        setView(data);
        setIsFiltered(false);
    }

    return (
        <>
            {
                isFiltered && <button className="p-4" onClick={() => handleBackClick()}>Go Back</button>
            }
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
                {view.map((row, index) => (
                    <tr className="table-row" key={index}>
                        <td className="table-cell" onClick={() => onNameClick(row.employee.id)}>{row.employee.firstName} {row.employee.lastName}</td>
                        <td className="table-cell">{row.absenceType}</td>
                        <td className="table-cell">{row.approved ? 'True' : 'False'}</td>
                        <td className="table-cell">{row.startDate}</td>
                        <td className="table-cell">{row.days}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}