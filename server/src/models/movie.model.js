import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Vui lòng nhập tên phim"],
        trim: true,
        unique: true,
        index: true
    }, 
    slug:{
        type: String,
        unique: true,
        lowercase: true,
    },
    description:{
        type: String,
        required:[true, "Vui lòng nhập mô tả phim"],
        maxlength:[2000, "Mô tả không được quá 2000 ký tự"]
    }, 
    duration:{
        type: Number,
        required: [true, "Vui lòng nhập thời lượng phim"],
        min: [1,"Thời lượng phải lớn hơn 0"]
    }, 
    genre:{
        type:[String],
        required: [true," Vui lòng chọn thể loại"],
        enum:[
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
        ]
    }, 
    director:{
        type: String,
        required: [true, "Vui lòng nhập tên đạo diễn"],
        trim: true
    }, 
    cast:{
        type:[String],
        require: [true, "Vui lòng nhập danh sách diễn viên"]
    },
    language:{
        type: String,
        default: 'Tiếng Việt'
    },
    subtitle:{
        type: String,
        default: "Phụ đề Tiếng Việt"
    },
    releaseDate:{
        type: Date,
        required: [true, "Vui lòng nhập ngày công chiếu"]
    },
    endDate:{
        type:Date
    },
    poster:{
        type:String,
        default:'default-poster.jpg'
    },
    rating:{
        type: String,
        enum:['P','C13','C16','C18'],
        default:'P'
    },
    averageRating:{
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    totalReviews:{
        type: Number,
        default:0
    },
    isShowing:{
        type:Boolean,
        default:true
    },
    isComingSoon:{
        type:Boolean,
        default:false
    },createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true, 
    versionKey: false ,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

movieSchema.index({title:'text', description: 'text'});
movieSchema.index({genre:1});
movieSchema.index({releaseDate:-1});

movieSchema.virtual('showtimes',{
    ref: 'Showtime',
    localField: '_id',
    foreignField: 'movie'
});

movieSchema.pre('save',function(next){
    if(this.isModified('title')){
        this.slug = this.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    next();
});
const Movie = mongoose.model('Movie', movieSchema);

export default Movie;