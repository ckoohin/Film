import Joi from "joi";

const stringReq = Joi.string().required().trim();
const emailRule = Joi.string().email().required().trim();
const passwordRule = Joi.string().min(6).required();

export const signupValidation = Joi.object({
    username: stringReq.min(2).max(100).messages({
        "string.min": "Tên phải từ 2 ký tự",
        "string.max": "Tên tối đa 100 ký tự",
        "any.required": "Chưa nhập tên"
    }),

    email: emailRule.messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Chưa nhập email"
    }),

    password: passwordRule.messages({
        "string.min": "Mật khẩu phải từ 6 ký tự",
        "any.required": "Chưa nhập mật khẩu"
    }),

    phone: Joi.string().pattern(/^[0-9]{10,11}$/).messages({
        "string.pattern.base": "SĐT phải là 10-11 số"
    }),

    avatar: Joi.string().uri().messages({
        "string.uri": "Avatar phải là đường dẫn hợp lệ"
    })
});

export const signinValidation = Joi.object({
    email: emailRule.messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Vui lòng nhập email"
    }),

    password: passwordRule.messages({
        "string.min": "Mật khẩu quá ngắn",
        "any.required": "Vui lòng nhập mật khẩu"
    })
});