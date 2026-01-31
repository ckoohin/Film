import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Vui lòng cung cấp tên"],
        trim: true,
        minlength: [2,"Tên phải có ít nhất 2 kí tự"],
        maxlength: [100,"Tên không được quá 100 kí tự"],
    },
    email: {
        type: String,
        required: [true, "Vui lòng cung cấp email"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Vui lòng cung cấp địa chỉ email hợp lệ"],
    },
    password: {
        type: String,
        required: [true, "Vui lòng cung cấp mật khẩu"],
        minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
        select: false, //ko trả về khi query
    },
    passwordChangeAt: Date,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    phone:{
        type:String,
        match: [/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ']
    },
    addresses:[
        {
            street: String,
            city: String,
            isDefault:{
                type: Boolean,
                default: false,
            },
        },
    ],
    avatar:{
        type: String,
        default: "default-avatar.jpg"
    },
    active:{
        type:Boolean,
        default:true,
        select:false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true, 
    versionKey: false,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.virtual('bookings',{
    ref: "Booking",
    localField: "_id",
    foreignField: "user"
});

const User = mongoose.model('User', userSchema);

export default User;