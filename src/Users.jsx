import { useQuery } from "@tanstack/react-query";
import { getVoted } from "./api";
import { useState } from "react";

function Users({ id }) {
    const [voted, setVoted] = useState(false);
    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => getVoted(),
        refetchInterval: 500 * 2,
    });
    if (!voted && query?.data?.data) {
        if (id in query.data.data) {
            setVoted(true);
            if ('Notification' in window) {
                Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        new Notification('From voting system', {
                            body: 'your vote has been registered',
                            //icon: '/path/to/notification/icon.png',
                        });
                    }
                });
            }
        }
    }

    return (<>
        {query?.data?.data ?
            <>{(id in query?.data?.data) ? <div>your vote has been registered!</div> : <div>your vote is not registered</div>}</> : <div>some problem with site!</div>
        }
    </>);
}
export default Users;