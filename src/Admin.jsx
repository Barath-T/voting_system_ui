import { useQuery } from "@tanstack/react-query";
import { getCandidateStatus } from "./api";

function Admin() {
    //const [candidates, setCandidates] = useState([]);
    const query = useQuery({ queryKey: ['admin'], queryFn: () => getCandidateStatus(), refetchInterval: 20 * 500 });

    return (<>{
        query?.data?.data ?
            < div > <ul>{query.data.data?.map((el, idx) => <li key={idx}>{idx}: {el}</li>)}</ul></div >
            : <div>some error!</div>
    }</>);
}
export default Admin;