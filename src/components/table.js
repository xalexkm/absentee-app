import {useCallback, useState} from "react";
import {IoArrowDownOutline} from "react-icons/io5";
import AbsenceConflictLabel from "./absenceConflictLabel";
import Button from "./button";

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
            <div className="table">
                <div className="table-header-group">
                <div className="table-row">
                    <div className={'table-cell'}><div onClick={() => handleSort('name')} className="flex justify-center items-center underline underline-offset-1 cursor-pointer">Name { sortedColumn === 'name' && <IoArrowDownOutline/>}</div></div>
                    <div className={'table-cell'}><div onClick={() => handleSort('absenceType')} className="flex gap-2 justify-center items-center underline underline-offset-1 cursor-pointer">Absence Type { sortedColumn === 'absenceType' && <IoArrowDownOutline/>}</div></div>
                    <div className={'table-cell text-xs max-w-32'}><div>Approved/Pending Approval</div></div>
                    <div className={'table-cell'}><div onClick={() => handleSort('startDate')} className="flex gap-2 justify-center items-center underline underline-offset-1 cursor-pointer">Start Date { sortedColumn === 'startDate' && <IoArrowDownOutline/>}</div></div>
                    <div className={'table-cell'}><div onClick={() => handleSort('endDate')} className="flex gap-2 justify-center items-center underline underline-offset-1 cursor-pointer">End Date { sortedColumn === 'endDate' && <IoArrowDownOutline/>}</div></div>
                </div>
                </div>
                <div className="table-row-group">
                {view.map((row, index) => (
                    <div className="table-row" key={index}>
                        <div className="table-cell text-start" onClick={() => handleNameClick(row.employee.id)}><div className="flex gap-2 items-center"><span className="underline underline-offset-1 cursor-pointer">{row.employee.firstName} {row.employee.lastName}</span> <AbsenceConflictLabel employeeId={row.employee.id}></AbsenceConflictLabel></div></div>
                        <div className="table-cell">{row.absenceType ? absenceTypeMap[row.absenceType] : "N/A"}</div>
                        <div className="table-cell">{row.approved ? 'Approved' : 'Pending Approval'}</div>
                        <div className="table-cell">{row.startDate ? new Date(row.startDate).toDateString() : "N/A"}</div>
                        <div className="table-cell">{row.endDate ? new Date(row.endDate).toDateString() : "N/A"}</div>
                    </div>
                ))}
                </div>
            </div>
            {
                isFiltered && <div className="w-40 ml-auto my-4"><Button onClick={() => handleBackClick()}>Go Back</Button></div>
            }
        </>
    );
}