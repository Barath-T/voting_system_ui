import { useQuery } from "@tanstack/react-query";
import { getVoted } from "./api";

function Users({ id }) {
    const query = useQuery({ queryKey: ['users'], queryFn: () => getVoted(), refetchInterval: 20 * 500 });
    return (<>
        {query?.data?.data ?
            <>{(id in query?.data?.data) ? <div>your vote has been registered!</div> : <div>your vote is not registered</div>}</> : <div>some problem with site!</div>
        }
    </>);
}
export default Users;