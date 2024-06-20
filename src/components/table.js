import {useState} from "react";
import {IoArrowDownOutline} from "react-icons/io5";


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

    const handleSort = (sortingProp) => {
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
    }

    return (
        <>
            {
                isFiltered && <button className="p-4" onClick={() => handleBackClick()}>Go Back</button>
            }
            <table className="table">
                <thead className="table-header-group">
                <tr className="table-row">
                    <th className={'table-cell'}><div onClick={() => handleSort('name')} className="flex items-center">Name <IoArrowDownOutline/></div></th>
                    <th className={'table-cell'}><div onClick={() => handleSort('absenceType')} className="flex gap-2 justify-center items-center">Absence Type <IoArrowDownOutline/></div></th>
                    <th className={'table-cell text-xs max-w-32'}>Approved/Pending Approval</th>
                    <th className={'table-cell'}><div onClick={() => handleSort('startDate')} className="flex gap-2 justify-center items-center">Start Date <IoArrowDownOutline/></div></th>
                    <th className={'table-cell'}><div onClick={() => handleSort('endDate')} className="flex gap-2 justify-center items-center">End Date <IoArrowDownOutline/></div></th>
                </tr>
                </thead>
                <tbody className="table-row-group">
                {view.map((row, index) => (
                    <tr className="table-row" key={index}>
                        <td className="table-cell" onClick={() => onNameClick(row.employee.id)}>{row.employee.firstName} {row.employee.lastName}</td>
                        <td className="table-cell">{row.absenceType}</td>
                        <td className="table-cell">{row.approved ? 'Approved' : 'Pending Approval'}</td>
                        <td className="table-cell">{row.startDate}</td>
                        <td className="table-cell">{row.endDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}