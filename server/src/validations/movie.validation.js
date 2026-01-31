import Joi from "joi";

const movieValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().min(1),
    genre: Joi.array().items(
        Joi.string().valid(
            'Hành động',
            'Kinh dị',
            'Hài',
            'Tình cảm',
            'Khoa học viễn tưởng',
            'Hoạt hình',
            'Tâm lý',
            'Chiến tranh',
            'Tài liệu',
            'Gia đình',
            'Thần thoại',
            'Thể thao',
            'Kịch tính'
        )
    ),
    director: Joi.string().required(),
    cast: Joi.string([]).required(),
    releaseDate: Joi.date().required(),
})

export default movieValidation;
