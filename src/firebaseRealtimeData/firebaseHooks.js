import { get, onDisconnect, onValue, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import database from "./config";

/**
 * Hook lắng nghe dữ liệu realtime từ Firebase Realtime Database và xử lý dữ liệu.
 *
 * @param {string} groupId - ID của nhóm dữ liệu.
 * @param {string} id - ID của user hoặc nhóm user.
 * @param {string} key - Tên key con dưới user/group ID mà bạn muốn lắng nghe.
 * @param {function} callback - Hàm callback sẽ được gọi khi dữ liệu thay đổi.
 */
export const useRealtimeData = (id, key, callback) => {
    console.log("------mounted listen data realtime---------")
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!id || !key) {
            console.error("Missing required parameters");
            return;
        }

        const dataRef = ref(database, `realtime_data/${id}/${key}`);

        const handleDataChange = (snapshot) => {
            const newData = snapshot.val();
            if (newData) {
                // Update state with new data and remove from Firebase
                setData((prevData) => {
                    const updatedData = [...prevData, newData];
                    callback(updatedData);
                    return updatedData;
                });

                // Remove the data from Firebase
                remove(dataRef).catch((error) => console.error("Error deleting data:", error));
            }
        };

        // Start listening for data changes
        const unsubscribe = onValue(dataRef, handleDataChange, (error) => {
            console.error("Error listening for data:", error);
        });

        // Cleanup function to remove the listener
        return () => {
            unsubscribe();
            console.log("------unmount listen data realtime---------")
        };
    }, [id, key, callback]);

    return data;
};



/**
 * Hook để đăng ký người dùng vào kênh và duy trì trạng thái online.
 *
 * @param {string || number} id - ID của người dùng.
 * @param {string || number} channel - Kênh mà người dùng đăng ký vào.
 */
export const useOnlineChannel = (id, channel) => {
    useEffect(() => {
        console.log("------mounted online channel---------");

        if (!id || !channel) {
            console.error("Missing required parameters");
            return;
        }

        const userRef = ref(database, `realtime_channel/${channel}/${id}`);

        // Đánh dấu người dùng là online
        set(userRef, { online: true }).catch((error) => console.error("Error setting user online:", error));

        // Xử lý khi ngắt kết nối
        const disconnectRef = onDisconnect(userRef);
        disconnectRef.remove().catch((error) => console.error("Error removing user on disconnect:", error));

        // Cleanup function
        return () => {
            console.log("------unmount online channel---------");

            // Xoá người dùng khỏi kênh khi component unmount
            remove(userRef).catch((error) => console.error("Error removing user from channel:", error));

            // Hủy bỏ xử lý ngắt kết nối
            disconnectRef.cancel().catch((error) => console.error("Error canceling disconnection:", error));
        };
    }, [id, channel]);
};



/**
 * Hàm gửi dữ liệu tới tất cả các user online trong một group.
 *
 * @param {string} key - Key cho dữ liệu.
 * @param {object} data - Dữ liệu cần gửi.
 * @param {string} channel - Kênh (channel) để xác định nhóm người dùng online.
 */
export const FBRT_SendDataToGroup = async (key, data, channel) => {
    if (!key || typeof data !== "object") {
        console.error("Missing required parameters");
        return;
    }

    try {
        const channelRef = ref(database, `realtime_channel/${channel}`);
        const channelSnapshot = await get(channelRef);
        const onlineUsers = channelSnapshot.val() || {};

        const updates = Object.keys(onlineUsers).map(id => {
            return set(ref(database, `realtime_data/${id}/${key}`), data);
        });

        await Promise.all(updates);
        console.log("Data sent successfully to all online users");
    } catch (error) {
        console.error("Error sending data to group:", error);
    }
};