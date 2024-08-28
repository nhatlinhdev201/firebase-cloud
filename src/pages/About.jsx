import { useState } from "react";
import { useRealtimeData } from "../firebaseRealtimeData/firebaseHooks";
import { FBRT_UpdateDataRealtime } from "../firebaseRealtimeData/firebaseAction";
import { Link } from "react-router-dom";

const About = () => {

    const [data, setData] = useState([]);

    useRealtimeData(123, "status", setData);
  
    const handle = async () => {
        await FBRT_UpdateDataRealtime(123, "status", { hello: "ok" });
    };

    return (
        <div>
            <h1>Notification 1 - 1</h1>
            <button onClick={handle}>Send</button>
            <div>
                <h1>Noti {data.length}</h1>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li>
                    ))}
                </ul>
            </div>
            <Link to={"/"}>
                <h2>Go send 1 -n </h2>
            </Link>
        </div>
    );
}

export default About;

