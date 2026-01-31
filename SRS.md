SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
Dự án: Cinema Booking System (Backend API) Môn học: Backend API Development with Node.js & MongoDB

1. Giới thiệu chung
1.1. Mục tiêu
Xây dựng hệ thống RESTful API phục vụ việc đặt vé xem phim online. Hệ thống đảm bảo tính bảo mật, toàn vẹn dữ liệu và phân quyền rõ ràng giữa Quản trị viên (Admin) và Khách hàng (User).

1.2. Công nghệ sử dụng
Runtime: Node.js

Framework: Express.js

Database: MongoDB (sử dụng Mongoose ODM)

Authentication: JWT (JSON Web Token)

Security: Bcrypt (mã hóa mật khẩu), Helmet/Cors (bảo mật header - tùy chọn thêm).

Validation: Joi (kiểm tra dữ liệu đầu vào).

2. Phân tích tác nhân (Actors)
Hệ thống có 2 loại người dùng chính với quyền hạn khác biệt:

Admin (Quản trị viên): Người chịu trách nhiệm vận hành hệ thống, quản lý dữ liệu phim và lịch chiếu.

User (Khách hàng): Người dùng cuối, sử dụng hệ thống để tìm kiếm phim và đặt vé.

3. Thiết kế Cơ sở dữ liệu (Database Schema)
Dựa trên gợi ý và logic thực tế, đây là thiết kế Schema chi tiết (dùng cho Mongoose):

3.1. Users Collection
Lưu trữ thông tin người dùng.

name (string, required): Tên hiển thị.

email (string, required, unique): Dùng để đăng nhập.

password (string, required): Đã mã hóa bằng bcrypt.

role (string, enum: ['admin', 'user'], default: 'user'): Phân quyền.

phone (string): Số điện thoại (tùy chọn).

3.2. Movies Collection
Lưu trữ thông tin phim.

title (string, required): Tên phim.

description (string): Mô tả nội dung.

director (string): Đạo diễn.

genre (string): Thể loại (Hành động, Tình cảm...).

duration (number): Thời lượng (phút).

cast (array string): Danh sách diễn viên.

releaseDate (date): Ngày công chiếu.

posterUrl (string): Link ảnh poster.

3.3. Showtimes Collection
Lưu trữ lịch chiếu. Logic: Một phim có nhiều lịch chiếu, một lịch chiếu thuộc về một phim.

movieId (ObjectId, ref: 'Movie'): Liên kết tới bảng Movie.

room (string, required): Tên phòng chiếu (Ví dụ: "Room 1").

startTime (date, required): Thời gian bắt đầu chiếu.

price (number): Giá vé cơ bản.

3.4. Bookings Collection
Lưu trữ thông tin đặt vé.

userId (ObjectId, ref: 'User'): Người đặt.

showtimeId (ObjectId, ref: 'Showtime'): Suất chiếu nào.

seats (array string): Danh sách ghế (Ví dụ: ["A1", "A2"]).

totalPrice (number): Tổng tiền.

status (string, enum: ['booked', 'cancelled'], default: 'booked'): Trạng thái vé.

createdAt (date): Thời gian đặt.

4. Đặc tả luồng nghiệp vụ & API (Functional Requirements)
4.1. Module Authentication & Authorization
Đăng ký (Register):

Input: Name, Email, Password.

Validation (Joi): Email đúng định dạng, Password tối thiểu 6 ký tự.

Logic: Kiểm tra email tồn tại chưa -> Mã hóa pass (bcrypt) -> Lưu DB.

Đăng nhập (Login):

Input: Email, Password.

Logic: Tìm user theo email -> So sánh pass (bcrypt.compare) -> Nếu đúng, tạo JWT token (chứa id và role).

Middleware Phân quyền:

authMiddleware: Kiểm tra Token có hợp lệ không.

adminMiddleware: Kiểm tra role trong Token có phải là 'admin' không.

4.2. Module Movies (Quản lý phim)
Lấy danh sách phim (Get All / Search):

Access: Public (hoặc User/Admin).

Logic: Hỗ trợ query params để tìm kiếm. Ví dụ: ?genre=Action, ?keyword=Batman.

Xem chi tiết phim (Get One):

Access: Public.

Thêm phim (Create):

Access: Admin.

Validation: Các trường bắt buộc không được để trống.

Cập nhật / Xóa phim (Update / Delete):

Access: Admin.

Logic: Xóa phim thì cẩn trọng với các Showtime liên quan (có thể chặn xóa nếu phim đang có lịch chiếu).

4.3. Module Showtimes (Quản lý suất chiếu)
Tạo suất chiếu:

Access: Admin.

Validation: Kiểm tra logic thời gian (không được tạo suất chiếu trùng giờ trong cùng một phòng).

Lấy suất chiếu theo Phim:

Access: Public.

Logic: User chọn phim -> API trả về các khung giờ chiếu của phim đó.

4.4. Module Booking (Đặt vé) - Logic phức tạp nhất
Đặt vé (Create Booking):a

Access: User.

Input: showtimeId, seats (["A1", "A2"]).

Logic:
Kiểm tra showtimeId có tồn tại không.

Quan trọng: Kiểm tra xem các ghế (A1, A2) đã có ai đặt trong suất chiếu đó chưa. (Query bảng Booking với showtimeId và $in seats).

Nếu ghế trống -> Tính tổng tiền -> Lưu Booking -> Trả về success.

Nếu ghế đã có người đặt -> Trả về lỗi 400 (Bad Request).

Hủy vé:

Access: User (chỉ hủy vé của chính mình).

Logic: Chỉ cho phép hủy trước giờ chiếu X tiếng (tùy chọn logic). Update status thành 'cancelled'.

Lịch sử đặt vé (Get My Bookings):

Access: User.

Logic: Tìm trong bảng Booking với userId hiện tại. Populate dữ liệu Movie và Showtime để hiển thị tên phim, giờ chiếu.

Xem toàn bộ vé (Get All Bookings):

Access: Admin.

Mục đích: Thống kê doanh thu.