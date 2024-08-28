import { useState } from "react";
import { useRegisterNotifiChannel, useListenNotifiOnNode } from "../firebaseRealtimeData/firebaseHooks";
import { Link } from "react-router-dom";
import { FBRT_SendDataToGroup } from "../firebaseRealtimeData/firebaseAction";

function Home() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    useRegisterNotifiChannel(111, "group1");
    useRegisterNotifiChannel(112, "group1");
    useRegisterNotifiChannel(113, "group1");
    useListenNotifiOnNode(111, "payment", setData1);
    useListenNotifiOnNode(112, "payment", setData2);
    useListenNotifiOnNode(113, "payment", setData3);
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
            <Link to={"/listen"}>
                <h2>listen</h2>
            </Link>
        </div>
    );
}

export default Home;
