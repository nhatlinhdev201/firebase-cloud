export const DataFormatMiddleware = (firebaseDataArray) => {
  return firebaseDataArray.map((data) => {
    return {
      Id: data.OrderId || null, // Lấy OrderId từ dữ liệu gốc
      CustomerId: data.DataService?.CustomerId || null, // Lấy CustomerId từ DataService
      CustomerName: data.DataService?.CustomerName || null, // Lấy CustomerName từ DataService
      ServiceId: data.DataService?.ServiceId || null, // Lấy ServiceId từ DataService
      ServiceName: data.DataService?.ServiceName || null, // Lấy ServiceName từ DataService
      BookingTime: data.CreateAt || null, // Lấy thời gian đặt dịch vụ
      Note: data.DataService?.NoteBooking || "", // Lấy ghi chú từ DataService
      TotalMoney: data.TotalMoney || 0, // Lấy tổng số tiền từ dữ liệu gốc
      GroupUserId: data.DataService?.GroupUserId || null, // Lấy GroupUserId từ DataService
      IsConfirm: 0, // Giá trị mặc định
      TotalStaff: data.DataService?.TotalStaff || 0, // Lấy số lượng nhân viên từ DataService
      Is_Confirm: "Mới tạo", // Giá trị mặc định
      Service_Detail:
        data.DataService?.SelectOption.map((option) => {
          return {
            ServiceId: option.ServiceId || null, // Lấy ServiceId từ SelectOption
            ServiceDetailName: option.OptionName || "", // Lấy tên chi tiết dịch vụ từ SelectOption
          };
        }) || [], // Nếu không có SelectOption, trả về mảng rỗng
      Address: "", // Giá trị mặc định
      BookingServiceCode: data.DataService?.BookingCode || null, // Lấy BookingCode từ DataService
      LatService: data.LatitudeCustomer || null, // Lấy tọa độ latitude của khách hàng
      LngService: data.LongitudeCustomer || null, // Lấy tọa độ longitude của khách hàng
      AddressService: data.DataService?.Address || "", // Lấy địa chỉ từ DataService
    };
  });
};
