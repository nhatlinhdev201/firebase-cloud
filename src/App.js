import { useEffect, useState } from "react";
import "./messaging_init_in_sw";
import {
  OVG_FBRT_AddNewOrderGetKey,
  OVG_FBRT_DeleteOrdersByBookingCode,
  OVG_FBRT_GetOrderByBookingCode,
  OVG_FBRT_GetOrderByBookingCodeLimitToFirst,
  OVG_FBRT_HandleOrderByBookingCodeAndStaffId,
  OVG_FBRT_UpdateOrderToNoStaff,
} from "./firebaseConfig";
import {
  FBRT_ListenDataRealtime,
  FBRT_SendRealtimeData,
  FBRT_UpdateDataRealtime,
} from "./firebaseRealtimeData/HandleDataRealtime";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Gọi hàm để bắt đầu lắng nghe dữ liệu theo thời gian thực
    // OVG_FBRT_ListenOrdersByStatusOrder((orderList) => {
    //   setOrders(orderList);
    // });
    getOrder();
    // Không cần hàm cleanup vì Firebase tự quản lý kết nối theo thời gian thực
  }, []);

  // console.log("orders: ---------------------", orders[0]);
  // console.log(
  //   "orders after: ---------------------",
  //   DataFormatMiddleware(orders)[0]
  // );

  const getOrder = async () => {
    // const orders = await OVG_FBRT_GetOrderByBookingCode("OGV12082400010");
    FBRT_ListenDataRealtime(1400, "payment", (data) => {
      setOrders(data);
    });
  };
  console.log("-----------", orders);
  const handle = async () => {
    // OVG_DeleteOrdersByBookingCodeAndStaffId("OGV13082400004", 7408);
    // const rs = await OVG_FBRT_AddNewOrderGetKey({
    //   hello: "ok",
    // });
    // console.log(rs);
    // await OVG_FBRT_UpdateOrderToNoStaff("-O4Ew_3hxIQ2pCoF95yA");
    // await OVG_FBRT_HandleOrderByBookingCodeAndStaffId("OGV15082400001", 7424);
    // const haha = await OVG_FBRT_GetOrderByBookingCodeLimitToFirst(
    // "OGV15082400003"
    // );
    // console.log(haha);
    // await OVG_FBRT_DeleteOrdersByBookingCode("OGV15082400009");
    // FBRT_SendRealtimeData(1400, "payment", { hello: "ok" });
    FBRT_UpdateDataRealtime(1400, "payment", { hello: "no" });
  };
  return (
    <div>
      <h1>Orders with StatusOrder = 0</h1>
      <button onClick={handle}>h-100</button>
      <ul>
        {/* {orders.map((order) => (
          <li key={order.id}>
            <strong>Order ID:</strong> {order.id}
            <br />
            <strong>Staff Name:</strong> {order.StaffName}
            <br />
            <strong>Status Order:</strong> {order.StatusOrder}
            <br />
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default App;
