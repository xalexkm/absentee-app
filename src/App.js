import {useQuery} from "@tanstack/react-query";
import {getAbsenceData} from "./lib/api";
import Wrapper from "./components/wrapper";
import Table from "./components/table";

const AbsenceTypeMap = {
    "ANNUAL_LEAVE": "Annual Leave"
}

function App() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["absence-data"],
    queryFn: getAbsenceData
  })

  return (
    <Wrapper>
      <div className="w-full rounded-md bg-slate-400 p-4">
          {
              isError && <div className={'p-4 bg-slate-200'}>{ error }</div>
          }
          {
              (!isLoading && data && !isError) && <Table data={data}></Table>
          }
      </div>
    </Wrapper>
  );
}

export default App;
