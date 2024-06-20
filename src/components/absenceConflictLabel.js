import {getAbsenceConflict} from "../lib/api";
import {useQuery} from "@tanstack/react-query";
import {memo} from "react";


const AbsenceConflictLabel = ({ employeeId }) => {
    const { data, isLoading, isError} = useQuery({
        queryKey: ["absence-conflict-label", employeeId],
        queryFn: () => getAbsenceConflict(employeeId)
    })

    return <>{ (!isLoading && !isError && data && data.conflicts) && <div className="p-1 text-sm rounded-md bg-red-500 text-white">Conflicts</div>}</>
}

export default memo(AbsenceConflictLabel)