# SOFTWARE REQUIREMENT SPECIFICATION (SRS)

## Ứng dụng đặt vé xem phim (Cinema Booking System)

## 1. Giới thiệu

### 1.1 Mục đích tài liệu

Tài liệu này mô tả chi tiết các yêu cầu chức năng và phi chức năng của hệ thống đặt vé xem phim tại rạp chiếu phim.

### 1.2 Phạm vi

- Hệ thống cho phép người dùng đặt vé xem phim tại rạp chiếu phim.
- Quản lý phim, suất chiếu, phòng chiếu, đặt vé, người dùng và đánh giá phim.

### 1.3 Đối tượng sử dụng

- **Người dùng (User)**: Đặt vé xem phim, quản lý tài khoản, đánh giá phim.
- **Quản trị viên (Admin)**: Quản lý toàn bộ hệ thống bao gồm phim, suất chiếu, phòng chiếu, vé, người dùng và đánh giá.

---

## 2. Mô tả tổng thể

### 2.1 Mô tả hệ thống

Hệ thống là một ứng dụng web xử lý các nghiệp vụ liên quan đến đặt vé xem phim tại rạp chiếu phim. Hệ thống được xây dựng với các thành phần chính:

- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Frontend**: React

### 2.2 Các chức năng chính

1. Quản lý phim (Movie Management)
2. Quản lý phòng chiếu (Room Management)
3. Quản lý suất chiếu (Showtime Management)
4. Quản lý đặt vé (Booking Management)
5. Quản lý người dùng (User Management)
6. Quản lý đánh giá (Review Management)

### 2.3 Các ràng buộc

- Hệ thống phải hoạt động trên nền tảng web.
- Sử dụng MongoDB làm cơ sở dữ liệu.

---

## 3. Mô hình dữ liệu (Data Models)

### 3.1 User (Người dùng)

| Trường           | Kiểu dữ liệu | Mô tả                  | Ràng buộc                                  |
| ---------------- | ------------ | ---------------------- | ------------------------------------------ |
| username         | String       | Tên người dùng         | Bắt buộc, 2-100 ký tự                      |
| email            | String       | Địa chỉ email          | Bắt buộc, duy nhất, định dạng email hợp lệ |
| password         | String       | Mật khẩu               | Bắt buộc, tối thiểu 6 ký tự                |
| passwordChangeAt | Date         | Thời điểm đổi mật khẩu |                                            |
| role             | String       | Vai trò                | Enum: ["user", "admin"], mặc định: "user"  |
| phone            | String       | Số điện thoại          | 10-11 chữ số                               |
| addresses        | Array        | Danh sách địa chỉ      | street, city, isDefault                    |
| avatar           | String       | Ảnh đại diện           | Mặc định: "default-avatar.jpg"             |
| active           | Boolean      | Trạng thái hoạt động   | Mặc định: true                             |
| createdAt        | Date         | Ngày tạo               | Tự động                                    |
| updatedAt        | Date         | Ngày cập nhật          | Tự động                                    |

**Quan hệ**: User có nhiều Booking (1-N)

---

### 3.2 Movie (Phim)

| Trường        | Kiểu dữ liệu  | Mô tả                    | Ràng buộc                                                                                                                                                                               |
| ------------- | ------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title         | String        | Tên phim                 | Bắt buộc, duy nhất                                                                                                                                                                      |
| slug          | String        | URL slug                 | Tự động tạo từ title                                                                                                                                                                    |
| description   | String        | Mô tả phim               | Bắt buộc, tối đa 2000 ký tự                                                                                                                                                             |
| duration      | Number        | Thời lượng (phút)        | Bắt buộc, >= 1                                                                                                                                                                          |
| genre         | Array[String] | Thể loại                 | Bắt buộc, Enum: ["Hành động", "Kinh dị", "Hài", "Tình cảm", "Khoa học viễn tưởng", "Hoạt hình", "Tâm lý", "Chiến tranh", "Tài liệu", "Gia đình", "Thần thoại", "Thể thao", "Kịch tính"] |
| director      | String        | Đạo diễn                 | Bắt buộc                                                                                                                                                                                |
| cast          | Array[String] | Diễn viên                | Bắt buộc                                                                                                                                                                                |
| language      | String        | Ngôn ngữ                 | Mặc định: "Tiếng Việt"                                                                                                                                                                  |
| subtitle      | String        | Phụ đề                   | Mặc định: "Phụ đề Tiếng Việt"                                                                                                                                                           |
| releaseDate   | Date          | Ngày công chiếu          | Bắt buộc                                                                                                                                                                                |
| endDate       | Date          | Ngày kết thúc            |                                                                                                                                                                                         |
| poster        | String        | Ảnh poster               | Mặc định: "default-poster.jpg"                                                                                                                                                          |
| rating        | String        | Phân loại độ tuổi        | Enum: ["P", "C13", "C16", "C18"], mặc định: "P"                                                                                                                                         |
| averageRating | Number        | Điểm đánh giá trung bình | 0-10, mặc định: 0                                                                                                                                                                       |
| totalReviews  | Number        | Tổng số đánh giá         | Mặc định: 0                                                                                                                                                                             |
| isShowing     | Boolean       | Đang chiếu               | Mặc định: true                                                                                                                                                                          |
| isComingSoon  | Boolean       | Sắp chiếu                | Mặc định: false                                                                                                                                                                         |
| createdAt     | Date          | Ngày tạo                 | Tự động                                                                                                                                                                                 |
| updatedAt     | Date          | Ngày cập nhật            | Tự động                                                                                                                                                                                 |

**Quan hệ**: Movie có nhiều Showtime (1-N)

---

### 3.3 Room (Phòng chiếu)

| Trường      | Kiểu dữ liệu | Mô tả                | Ràng buộc                                                                 |
| ----------- | ------------ | -------------------- | ------------------------------------------------------------------------- |
| name        | String       | Tên phòng            | Bắt buộc, duy nhất                                                        |
| capacity    | Number       | Sức chứa             | Bắt buộc, >= 1                                                            |
| roomType    | String       | Loại phòng           | Enum: ["Standard", "VIP", "IMAX", "4DX", "Premium"], mặc định: "Standard" |
| rows        | Number       | Số hàng ghế          | Bắt buộc, >= 1                                                            |
| seatsPerRow | Number       | Số ghế mỗi hàng      | Bắt buộc, >= 1                                                            |
| seatLayout  | Array        | Sơ đồ ghế            | seatNumber, type (Standard/VIP/Couple), isAvailable                       |
| isActive    | Boolean      | Trạng thái hoạt động | Mặc định: true                                                            |
| createdAt   | Date         | Ngày tạo             | Tự động                                                                   |

**Ghi chú**: Sơ đồ ghế được tự động tạo khi tạo phòng mới dựa trên số hàng và số ghế mỗi hàng.

---

### 3.4 Showtime (Suất chiếu)

| Trường         | Kiểu dữ liệu | Mô tả                | Ràng buộc                                            |
| -------------- | ------------ | -------------------- | ---------------------------------------------------- |
| movie          | ObjectId     | Phim                 | Bắt buộc, tham chiếu đến Movie                       |
| room           | ObjectId     | Phòng chiếu          | Bắt buộc, tham chiếu đến Room                        |
| startTime      | Date         | Giờ bắt đầu          | Bắt buộc                                             |
| endTime        | Date         | Giờ kết thúc         | Bắt buộc                                             |
| date           | Date         | Ngày chiếu           | Bắt buộc                                             |
| price          | Object       | Giá vé theo loại ghế | Standard: 80,000đ, VIP: 120,000đ, Couple: 200,000đ   |
| availableSeats | Array        | Ghế còn trống        | seatNumber, type, status (available/booked/selected) |
| totalSeats     | Number       | Tổng số ghế          | Bắt buộc                                             |
| bookedSeats    | Number       | Số ghế đã đặt        | Mặc định: 0                                          |
| isActive       | Boolean      | Trạng thái hoạt động | Mặc định: true                                       |
| createdAt      | Date         | Ngày tạo             | Tự động                                              |

**Quan hệ**:

- Showtime thuộc về một Movie (N-1)
- Showtime thuộc về một Room (N-1)
- Showtime có nhiều Booking (1-N)

---

### 3.5 Booking (Đặt vé)

| Trường        | Kiểu dữ liệu | Mô tả                  | Ràng buộc                                                                     |
| ------------- | ------------ | ---------------------- | ----------------------------------------------------------------------------- |
| user          | ObjectId     | Người đặt              | Bắt buộc, tham chiếu đến User                                                 |
| showtime      | ObjectId     | Suất chiếu             | Bắt buộc, tham chiếu đến Showtime                                             |
| seats         | Array        | Danh sách ghế đặt      | seatNumber, type (Standard/VIP/Couple), price                                 |
| totalPrice    | Number       | Tổng tiền              | Bắt buộc, >= 0                                                                |
| status        | String       | Trạng thái đặt vé      | Enum: ["pending", "confirmed", "cancelled", "completed"], mặc định: "pending" |
| paymentMethod | String       | Phương thức thanh toán | Enum: ["cash", "credit_card", "momo", "zalopay", "vnpay"], mặc định: "cash"   |
| paymentStatus | String       | Trạng thái thanh toán  | Enum: ["unpaid", "paid", "refunded"], mặc định: "unpaid"                      |
| bookingCode   | String       | Mã đặt vé              | Duy nhất, in hoa                                                              |
| qrCode        | String       | Mã QR                  |                                                                               |
| notes         | String       | Ghi chú                | Tối đa 500 ký tự                                                              |
| bookingDate   | Date         | Ngày đặt               | Mặc định: ngày hiện tại                                                       |
| expiresAt     | Date         | Thời hạn thanh toán    |                                                                               |
| createdAt     | Date         | Ngày tạo               | Tự động                                                                       |

**Quan hệ**:

- Booking thuộc về một User (N-1)
- Booking thuộc về một Showtime (N-1)

---

### 3.6 Review (Đánh giá)

| Trường    | Kiểu dữ liệu | Mô tả              | Ràng buộc                      |
| --------- | ------------ | ------------------ | ------------------------------ |
| user      | ObjectId     | Người đánh giá     | Bắt buộc, tham chiếu đến User  |
| movie     | ObjectId     | Phim được đánh giá | Bắt buộc, tham chiếu đến Movie |
| rating    | Number       | Điểm đánh giá      | Bắt buộc, 1-10                 |
| comment   | String       | Nhận xét           | Tối đa 1000 ký tự              |
| createdAt | Date         | Ngày tạo           | Tự động                        |

**Ràng buộc**: Mỗi user chỉ được đánh giá một phim một lần (unique index: user + movie)

---

## 4. Yêu cầu chức năng

### 4.1 Quản lý phim (Movie)

- **Thêm phim**: Nhập đầy đủ thông tin phim (tên, mô tả, thời lượng, thể loại, đạo diễn, diễn viên, ngày công chiếu, poster, phân loại độ tuổi)
- **Sửa phim**: Cập nhật thông tin phim
- **Xóa phim**: Xóa phim khỏi hệ thống
- **Tìm kiếm phim**: Tìm theo tên, mô tả (full-text search)
- **Lọc phim**: Lọc theo thể loại, trạng thái (đang chiếu/sắp chiếu), ngày công chiếu

### 4.2 Quản lý phòng chiếu (Room)

- **Thêm phòng**: Nhập tên phòng, sức chứa, loại phòng, số hàng, số ghế mỗi hàng
- **Sửa phòng**: Cập nhật thông tin phòng
- **Xóa phòng**: Xóa phòng chiếu
- **Quản lý sơ đồ ghế**: Thiết lập loại ghế (Standard/VIP/Couple), trạng thái ghế

### 4.3 Quản lý suất chiếu (Showtime)

- **Thêm suất chiếu**: Chọn phim, phòng, ngày giờ chiếu, thiết lập giá vé
- **Sửa suất chiếu**: Cập nhật thông tin suất chiếu
- **Xóa suất chiếu**: Xóa suất chiếu
- **Quản lý ghế**: Theo dõi trạng thái ghế (available/booked/selected)

### 4.4 Quản lý đặt vé (Booking)

- **Đặt vé**: Chọn suất chiếu, chọn ghế, xác nhận thanh toán
- **Hủy vé**: Hủy đặt vé (trước thời gian chiếu)
- **Xác nhận vé**: Admin xác nhận vé đã thanh toán
- **Tạo mã QR**: Tự động tạo mã QR cho vé
- **Kiểm tra vé**: Quét QR để kiểm tra vé

### 4.5 Quản lý người dùng (User)

- **Đăng ký**: Đăng ký tài khoản mới
- **Đăng nhập**: Đăng nhập vào hệ thống
- **Quản lý hồ sơ**: Cập nhật thông tin cá nhân, đổi mật khẩu
- **Quản lý địa chỉ**: Thêm/sửa/xóa địa chỉ
- **Xem lịch sử đặt vé**: Xem danh sách vé đã đặt

### 4.6 Quản lý đánh giá (Review)

- **Thêm đánh giá**: Đánh giá phim (điểm + nhận xét)
- **Sửa đánh giá**: Cập nhật đánh giá của mình
- **Xóa đánh giá**: Xóa đánh giá
- **Xem đánh giá**: Xem danh sách đánh giá của phim

---

## 5. Yêu cầu phi chức năng

### 5.1 Hiệu năng

- Tối ưu hóa truy vấn database với index phù hợp

### 5.2 Bảo mật

- Mã hóa mật khẩu (bcrypt)
- Xác thực JWT
- Phân quyền theo role (user/admin)
- Bảo vệ API với rate limiting

### 5.3 Khả năng sử dụng

- Giao diện thân thiện, dễ sử dụng
- Responsive trên các thiết bị
- Thông báo lỗi rõ ràng bằng tiếng Việt

### 5.4 Khả năng mở rộng

- Dễ dàng thêm tính năng mới
- Hỗ trợ nhiều rạp chiếu phim

### 5.5 Khả năng bảo trì

- Code sạch, có comment
- Tài liệu API đầy đủ

### 5.6 Khả năng tích hợp

- Tích hợp cổng thanh toán (MoMo, ZaloPay, VNPay)
- API RESTful

---

## 6. Phụ lục

### 6.1 Giá vé mặc định

| Loại ghế | Giá (VND) |
| -------- | --------- |
| Standard | 80,000    |
| VIP      | 120,000   |
| Couple   | 200,000   |

### 6.2 Phân loại phim theo độ tuổi

| Ký hiệu | Mô tả                            |
| ------- | -------------------------------- |
| P       | Phổ biến - Dành cho mọi lứa tuổi |
| C13     | Cấm trẻ em dưới 13 tuổi          |
| C16     | Cấm trẻ em dưới 16 tuổi          |
| C18     | Cấm người dưới 18 tuổi           |

### 6.3 Trạng thái đặt vé

| Trạng thái | Mô tả             |
| ---------- | ----------------- |
| pending    | Đang chờ xác nhận |
| confirmed  | Đã xác nhận       |
| cancelled  | Đã hủy            |
| completed  | Hoàn thành        |

### 6.4 Phương thức thanh toán

| Phương thức | Mô tả        |
| ----------- | ------------ |
| cash        | Tiền mặt     |
| credit_card | Thẻ tín dụng |
| momo        | Ví MoMo      |
| zalopay     | Ví ZaloPay   |
| vnpay       | Ví VNPay     |
