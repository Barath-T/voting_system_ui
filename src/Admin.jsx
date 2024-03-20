import { useQuery } from "@tanstack/react-query";
import { endElection, getCandidateStatus, restartElection } from "./api";
import { useState } from "react";

const Container = ({ candidate, no_of_votes, color }) => {
  return (
    <div style={{
      padding: "2em",
      margin: "1em",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h2>{candidate}</h2>
      <h1 style={{ color: color }}>{no_of_votes}</h1>
    </div>
  );

}
function Admin() {
  //const [candidates, setCandidates] = useState([]);
  const [ended, setEnded] = useState(false);
  const [error, setError] = useState(false);
  const query = useQuery({ queryKey: ['admin'], queryFn: () => getCandidateStatus(), refetchInterval: 20 * 500 });

  const handleRestart = async () => {
    const response = await restartElection();
    console.log(response);
    if(response.status == 204){
      setError(true);
    } 
  }
  const handleEnd = async () => {
    await endElection();
    setEnded(true);
  }

  return (<>
    <div>
      {ended ? <h1> Election ended!</h1> : <></>}
    </div>
    {
      query?.data?.data ?
        < div >
          <ul type="none" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}>
            {query.data.data?.map((el, idx) =>
              <li key={idx}>
                {<Container candidate={idx} no_of_votes={el} color={Math.max(...query.data.data) === el ? "green" : "black"} />}
              </li>)}
          </ul>
          {error ? <p> end election to restart one!</p> : null}
          <button onClick={handleRestart}>restart</button>
          <button onClick={handleEnd}>end</button>
        </div >
        : <div>some error!</div>
    }</>);
}
export default Admin;
