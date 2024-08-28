import { useState } from "react";
import { FBRT_SendDataToGroup, useOnlineChannel, useRealtimeData } from "../firebaseRealtimeData/firebaseHooks";
import { Link } from "react-router-dom";

function Home() {
    // const [user1, setUser1] = useState(false);
    // const [user2, setUser2] = useState(false);
    // const [user3, setUser3] = useState(false);
    // const [user4, setUser4] = useState(false);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    useOnlineChannel(111, "group1");
    useOnlineChannel(112, "group1");
    useOnlineChannel(113, "group1");
    useRealtimeData(111, "payment", setData1);
    useRealtimeData(112, "payment", setData2);
    useRealtimeData(113, "payment", setData3);
    const handle = async () => {
        await FBRT_SendDataToGroup("payment", { hello: "Hah1" }, "group1");
    }
    const handle2 = async () => {
        await FBRT_SendDataToGroup("payment", { hello: "Halooooo" }, "group1");
    }
    const handle3 = async () => {
        await FBRT_SendDataToGroup("payment", { hello: "hé lô" }, "group1");
    }
    return (
        <div>
            <h1>Notification 1 - n</h1>
            <button onClick={handle}>user1 Send</button>
            <div>
                <h1>Noti in user 1 {data1.length}</h1>
                <ul>
                    {data1.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li>
                    ))}
                </ul>
            </div>
            <hr/>
            <button onClick={handle2}>user2 Send</button>
            <div>
                <h1>Noti in user 2 {data2.length}</h1>
                <ul>
                    {data2.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li>
                    ))}
                </ul>
            </div>
            <hr/>
            <button onClick={handle3}>user3 Send</button>
            <div>
                <h1>Noti in user 3 {data3.length}</h1>
                <ul>
                    {data3.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li>
                    ))}
                </ul>
            </div>
            <Link to={"/about"}>
                <h2>Go send 1 - 1</h2>
            </Link>
        </div>
    );
}

export default Home;
