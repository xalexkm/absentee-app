import { useQuery } from "@tanstack/react-query";
import { getAbsenceData } from "./lib/api";
import Wrapper from "./components/wrapper";
import Table from "./components/table";
import ErrorNotification from "./components/errorNotification";

function App() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["absence-data"],
    queryFn: getAbsenceData,
  });

  return (
    <Wrapper>
      <div className="w-full rounded-md p-4">
        {(isError && error && error.message) && <ErrorNotification message={error.message}></ErrorNotification>}
        {(!isLoading && data && !isError) && <Table data={data}></Table>}
      </div>
    </Wrapper>
  );
}

export default App;
