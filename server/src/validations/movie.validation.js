import Joi from "joi";

const movieValidation = Joi.object({
    title: Joi.string().required().trim().messages({
        "string.empty": "Tên phim không được để trống",
        "any.required": "Vui lòng nhập tên phim"
    }),
    
    description: Joi.string().required().max(2000).messages({
        "string.max": "Mô tả không được quá 2000 ký tự",
        "any.required": "Vui lòng nhập mô tả phim"
    }),
    
    duration: Joi.number().min(1).required().messages({
        "number.min": "Thời lượng phim phải lớn hơn 0",
        "any.required": "Vui lòng nhập thời lượng phim"
    }),
    
    genre: Joi.array().items(
        Joi.string().valid(
            'Hành động', 'Kinh dị', 'Hài', 'Tình cảm', 'Khoa học viễn tưởng',
            'Hoạt hình', 'Tâm lý', 'Chiến tranh', 'Tài liệu', 'Gia đình',
            'Thần thoại', 'Thể thao', 'Kịch tính'
        )
    ).required().messages({
        "any.only": "Thể loại phim không hợp lệ",
        "array.base": "Thể loại phải là một danh sách",
        "any.required": "Vui lòng chọn thể loại"
    }),
    
    director: Joi.string().required().trim().messages({
        "any.required": "Vui lòng nhập tên đạo diễn"
    }),
    
    cast: Joi.array().items(Joi.string()).required().messages({
        "array.base": "Danh sách diễn viên phải là dạng mảng",
        "any.required": "Vui lòng nhập danh sách diễn viên"
    }),
    
    releaseDate: Joi.date().required().messages({
        "any.required": "Vui lòng nhập ngày công chiếu"
    }),
    
    endDate: Joi.date().greater(Joi.ref('releaseDate')).messages({
        "date.greater": "Ngày kết thúc phải sau ngày công chiếu"
    }),

    audioLanguage: Joi.string().default('Tiếng Việt'),
    
    subtitle: Joi.string().default('Phụ đề Tiếng Việt'),
    
    poster: Joi.string().default('default-poster.jpg'),
    
    rating: Joi.string().valid('P', 'C13', 'C16', 'C18').default('P'),
    
    isShowing: Joi.boolean().default(true),
    
    isComingSoon: Joi.boolean().default(false),

    averageRating: Joi.number().min(0).max(10).default(0),

    totalReviews: Joi.number().min(0).default(0)

});

export default movieValidation;