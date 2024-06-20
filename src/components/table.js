import {useCallback, useState} from "react";
import {IoArrowDownOutline} from "react-icons/io5";
import AbsenceConflictLabel from "./absenceConflictLabel";

const absenceTypeMap = {
    "ANNUAL_LEAVE": "Annual Leave",
    "SICKNESS": "Sickness",
    "MEDICAL": "Medical"
}

export default function Table({ data }) {
    const [view, setView] = useState(data);
    const [isFiltered, setIsFiltered] = useState(false);
    const [sortedColumn, setSortedColumn] = useState(null)

    const handleNameClick = useCallback((id) => {
        const filteredView = data.filter((employee) => employee.employee.id === id)
        setView(filteredView);
        setIsFiltered(true);
    }, [data])

    const handleBackClick = useCallback(() => {
        setView(data);
        setIsFiltered(false);
    }, [data])

    const handleSort = useCallback((sortingProp) => {
        setSortedColumn(sortingProp);
        const sortedView = [...view].sort((a, b) => {
            let aVal
            let bVal

            if (sortingProp === 'name') {
                aVal = `${ a.employee.firstName } ${ a.employee.lastName }`;
                bVal = `${ b.employee.firstName } ${ b.employee.lastName }`;
            } else {
                aVal = a[sortingProp];
                bVal = b[sortingProp];
            }


            if (aVal !== undefined && bVal !== undefined) {
                return aVal.localeCompare(bVal);
            }

            if (aVal === undefined) return 1;
            if (bVal === undefined) return -1;

            return 0;
        });

        setView(sortedView)
    }, [view])

    return (
        <>
            {
                isFiltered && <button className="p-4" onClick={() => handleBackClick()}>Go Back</button>
            }
            <table className="table">
                <thead className="table-header-group">
                <tr className="table-row">
                    <th className={'table-cell'}><div onClick={() => handleSort('name')} className="flex justify-center items-center">Name { sortedColumn === 'name' && <IoArrowDownOutline/>}</div></th>
                    <th className={'table-cell'}><div onClick={() => handleSort('absenceType')} className="flex gap-2 justify-center items-center">Absence Type { sortedColumn === 'absenceType' && <IoArrowDownOutline/>}</div></th>
                    <th className={'table-cell text-xs max-w-32'}>Approved/Pending Approval</th>
                    <th className={'table-cell'}><div onClick={() => handleSort('startDate')} className="flex gap-2 justify-center items-center">Start Date { sortedColumn === 'startDate' && <IoArrowDownOutline/>}</div></th>
                    <th className={'table-cell'}><div onClick={() => handleSort('endDate')} className="flex gap-2 justify-center items-center">End Date { sortedColumn === 'endDate' && <IoArrowDownOutline/>}</div></th>
                </tr>
                </thead>
                <tbody className="table-row-group">
                {view.map((row, index) => (
                    <tr className="table-row" key={index}>
                        <td className="table-cell text-start" onClick={() => handleNameClick(row.employee.id)}><div className="flex gap-2 items-center">{row.employee.firstName} {row.employee.lastName} <AbsenceConflictLabel employeeId={row.employee.id}></AbsenceConflictLabel></div></td>
                        <td className="table-cell">{row.absenceType ? absenceTypeMap[row.absenceType] : "N/A"}</td>
                        <td className="table-cell">{row.approved ? 'Approved' : 'Pending Approval'}</td>
                        <td className="table-cell">{row.startDate ? new Date(row.startDate).toDateString() : "N/A"}</td>
                        <td className="table-cell">{row.endDate ? new Date(row.endDate).toDateString() : "N/A"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}