import { useState } from "react";
import { FBRT_DeleteDataRealtime, FBRT_UpdateDataRealtime } from "../firebaseRealtimeData/firebaseAction";
import { useListenRealtimeData } from "../firebaseRealtimeData/firebaseHooks";
import { Link } from "react-router-dom";

const Listen = () => {
    
    // region channel 1
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);

    useListenRealtimeData(123, "change_Status", setData);
    const handleChange = async () => {
        setStatus(!status);
        await FBRT_UpdateDataRealtime(123, "change_Status", { status: status });
    };

    const handleDone = async () => {
        await FBRT_DeleteDataRealtime(123, "change_Status");
    }
    /* ---------------------------------- */
    // region channel 2
    const [data2, setData2] = useState([]);
    const [status2, setStatus2] = useState(false);
    
    useListenRealtimeData(124, "change_Status", setData2);
    const handleChange2 = async () => {
        setStatus2(!status2);
        await FBRT_UpdateDataRealtime(124, "change_Status", { status: status2 });
    };

    const handleDone2 = async() => {
        await FBRT_DeleteDataRealtime(124, "change_Status");
    }

    return (
        <div>
            <button onClick={handleChange}>change data 1</button>
            <h1>Realtime Data 1:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button onClick={handleDone}>done 1</button>
            <hr/>
            <button onClick={handleChange2}>change data 2</button>
            <h1>Realtime Data 2:</h1>
            <pre>{JSON.stringify(data2, null, 2)}</pre>
            <button onClick={handleDone2}>done 2</button>
            <Link to={"/about"}>
                <h2>Go send 1 - 1</h2>
            </Link>
            <Link to={"/"}>
                <h2>send 1 -n</h2>
            </Link>
        </div>
    );
}

export default Listen;