// Import Firebase
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  get,
  push,
  set,
  remove,
  update,
  limitToFirst,
} from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_rVEn4ImOdNFGoUPNCj-UrXE3tygWIEY",
  authDomain: "golden-bee-651eb.firebaseapp.com",
  databaseURL:
    "https://golden-bee-651eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "golden-bee-651eb",
  storageBucket: "golden-bee-651eb.appspot.com",
  messagingSenderId: "616914078130",
  appId: "1:616914078130:web:602db051750307802ebcab",
  measurementId: "G-NWK8EZ7GQX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const ordersRef = ref(database, "/order");

export const OVG_FBRT_ListenOrdersByStatusOrder = (callback) => {
  // Tham chiếu tới node "order" trong database

  // Tạo query để lấy các đơn hàng có StatusOrder = 0
  const ordersQuery = query(ordersRef, orderByChild("StatusOrder"), equalTo(0));

  // Lắng nghe dữ liệu real-time
  onValue(ordersQuery, (snapshot) => {
    const orders = [];
    snapshot.forEach((childSnapshot) => {
      const orderData = childSnapshot.val();
      orders.push({
        id: childSnapshot.key,
        ...orderData,
      });
    });

    // Gọi callback để trả về dữ liệu
    callback(orders);
  });
};

export const OVG_FBRT_GetOrderByBookingCode = async (bookingCode) => {
  const ordersQuery = query(
    ordersRef,
    orderByChild("BookingCode"),
    equalTo(bookingCode)
  );
  const snapshot = await get(ordersQuery);
  const orders = [];
  snapshot.forEach((childSnapshot) => {
    const orderData = childSnapshot.val();
    orders.push({
      id: childSnapshot.key,
      ...orderData,
    });
  });
  return orders;
};
export const OVG_FBRT_AddNewOrder = async (order) => {
  try {
    // Tạo một reference mới với một ID tự động
    const newOrderRef = push(ordersRef);

    // Thêm dữ liệu vào reference vừa tạo
    await set(newOrderRef, order);

    console.log("Order added successfully with ID:", newOrderRef.key);
    return newOrderRef.key; // Trả về ID của đơn hàng vừa được thêm
  } catch (error) {
    console.error("Error adding new order:", error);
    return null; // Trả về null nếu có lỗi
  }
};

export const OVG_FBRT_DeleteOreder = async (bookingCode) => {
  try {
    // Tạo một truy vấn để tìm order với BookingCode cụ thể
    const orderQuery = query(
      ordersRef,
      orderByChild("BookingCode"),
      equalTo(bookingCode)
    );

    // Lấy dữ liệu từ truy vấn
    const snapshot = await get(orderQuery);

    if (snapshot.exists()) {
      // Duyệt qua các order tìm được và xóa từng order
      snapshot.forEach(async (childSnapshot) => {
        const orderRef = ref(database, `/order/${childSnapshot.key}`);
        await remove(orderRef);
        console.log(`Order with BookingCode ${bookingCode} has been deleted.`);
      });
    } else {
      console.log(`No order found with BookingCode: ${bookingCode}`);
    }
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};
export const OVG_DeleteOrdersByBookingCodeAndStaffId = async (
  bookingCode,
  staffId
) => {
  if (typeof bookingCode !== "string" || !bookingCode.trim()) {
    console.error("Invalid BookingCode. It should be a non-empty string.");
    return false;
  }

  if (typeof staffId !== "number") {
    console.error("Invalid StaffId. It should be a number.");
    return false;
  }

  const database = getDatabase();
  const ordersRef = ref(database, "/order");

  try {
    const snapshot = await get(ordersRef);
    const orders = snapshot.val();
    const updates = {};

    if (orders) {
      for (const orderId in orders) {
        const order = orders[orderId];
        if (order.BookingCode === bookingCode && order.StaffId === staffId) {
          updates[orderId] = null;
        }
      }

      if (Object.keys(updates).length > 0) {
        await update(ordersRef, updates);
        console.log(
          `Orders with BookingCode ${bookingCode} and StaffId ${staffId} deleted successfully.`
        );
        return true;
      } else {
        console.log("No orders found with the given BookingCode and StaffId.");
        return false;
      }
    } else {
      console.log("No orders found in the database.");
      return false;
    }
  } catch (error) {
    console.error("Error deleting orders:", error);
    return false;
  }
};

export const OVG_FBRT_AddNewOrderGetKey = async (order) => {
  try {
    // Tạo một reference mới với một ID tự động
    const newOrderRef = push(ordersRef);

    // Thêm dữ liệu vào reference vừa tạo
    await set(newOrderRef, order);

    // In ra ID của đơn hàng vừa được thêm
    console.log("Order added successfully with ID:", newOrderRef.key);

    // Trả về ID của đơn hàng vừa được thêm
    return newOrderRef.key;
  } catch (error) {
    console.error("Error adding new order:", error);

    // Trả về null nếu có lỗi
    return null;
  }
};

export const OVG_FBRT_UpdateOrderToNoStaff = async (orderId) => {
  if (typeof orderId !== "string" || !orderId.trim()) {
    console.error("Invalid Order ID. It should be a non-empty string.");
    return false;
  }

  try {
    const orderRef = ref(database, `/order/${orderId}`);

    await update(orderRef, {
      StaffId: "",
      StaffName: "",
      StaffPhone: "",
      LongitudeStaff: "",
      LatitudeStaff: "",
      StatusOrder: 0,
    });

    console.log(`Order ${orderId} updated successfully`);
    return true;
  } catch (error) {
    console.error("Error updating order status:", error);
    return false;
  }
};

// Hàm xóa tất cả các đơn dịch vụ có BookingCode cụ thể
export const OVG_FBRT_DeleteOrdersByBookingCode = async (bookingCode) => {
  if (typeof bookingCode !== "string" || !bookingCode.trim()) {
    console.error("Invalid BookingCode. It should be a non-empty string.");
    return false;
  }

  try {
    // Tạo truy vấn để tìm các đơn hàng dựa trên BookingCode
    const ordersQuery = query(
      ref(database, "/order"),
      orderByChild("BookingCode"),
      equalTo(bookingCode)
    );

    // Lấy dữ liệu đơn hàng từ Firebase
    const snapshot = await get(ordersQuery);

    // Kiểm tra nếu không có đơn hàng nào tìm thấy
    if (!snapshot.exists()) {
      console.log("No orders found with the given BookingCode.");
      return false;
    }

    const removePromises = [];

    // Duyệt qua các đơn hàng tìm được và xóa từng đơn hàng
    snapshot.forEach((childSnapshot) => {
      const orderRef = ref(database, `/order/${childSnapshot.key}`);
      removePromises.push(remove(orderRef)); // Thêm promise xóa vào mảng
    });

    // Chờ tất cả các lệnh xóa hoàn tất
    await Promise.all(removePromises);

    console.log(`Orders with BookingCode ${bookingCode} deleted successfully.`);
    return true;
  } catch (error) {
    console.error("Error deleting orders:", error);
    return false;
  }
};

// hàm xóa đơn các đơn dịch vụ theo nhân viên và mã bookingCode
export const OVG_FBRT_HandleOrderByBookingCodeAndStaffId = async (
  bookingCode,
  staffId
) => {
  if (typeof bookingCode !== "string" || !bookingCode.trim()) {
    console.error("Invalid BookingCode. It should be a non-empty string.");
    return false;
  }

  if (typeof staffId !== "number") {
    console.error("Invalid StaffId. It should be a number.");
    return false;
  }

  try {
    // Tìm tất cả các đơn hàng với BookingCode tương ứng
    const ordersQuery = query(
      ordersRef,
      orderByChild("BookingCode"),
      equalTo(bookingCode)
    );

    const snapshot = await get(ordersQuery);
    const orders = [];

    snapshot.forEach((childSnapshot) => {
      orders.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });

    if (orders.length > 1) {
      // Nếu có nhiều hơn 1 đơn hàng với BookingCode, tìm và xóa đơn hàng với StaffId tương ứng
      let orderDeleted = false;
      for (const order of orders) {
        if (order.StaffId === staffId) {
          await remove(ref(database, `/order/${order.id}`));
          console.log(order);
          console.log(
            `Order with ID ${order.id} and StaffId ${staffId} deleted.`
          );
          orderDeleted = true;
          break;
        }
      }

      if (!orderDeleted) {
        console.log(`No order found with StaffId ${staffId}.`);
      }
      return orderDeleted;
    } else if (orders.length === 1) {
      // Nếu chỉ còn lại 1 đơn hàng với BookingCode, cập nhật lại đơn dịch vụ thành chưa có nahan viên nhận
      const orderToUpdate = orders[0];
      const orderUpdate = {
        StaffId: "",
        StaffName: "",
        StaffPhone: "",
        LongitudeStaff: "",
        LatitudeStaff: "",
        StatusOrder: 0,
      };
      await update(ref(database, `/order/${orderToUpdate.id}`), orderUpdate);
      console.log(
        `Order with ID ${orderToUpdate.id} updated to StatusOrder: 0.`
      );
      return true;
    } else {
      console.log("No orders found with the given BookingCode.");
      return false;
    }
  } catch (error) {
    console.error("Error handling orders:", error);
    return false;
  }
};
export const OVG_FBRT_GetOrderByBookingCodeLimitToFirst = async (
  bookingCode
) => {
  try {
    const ordersQuery = query(
      ordersRef,
      orderByChild("BookingCode"),
      equalTo(bookingCode),
      limitToFirst(1) // Giới hạn chỉ lấy 1 kết quả
    );

    const snapshot = await get(ordersQuery);

    if (snapshot.size > 0) {
      // Sử dụng size để kiểm tra có dữ liệu không
      // Lấy duy nhất đơn hàng đầu tiên
      const childSnapshot = snapshot.val();
      const firstKey = Object.keys(childSnapshot)[0]; // Lấy key đầu tiên
      const orderData = childSnapshot[firstKey];
      return {
        id: firstKey,
        ...orderData,
      };
    } else {
      console.log("No order found with the given BookingCode.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};
