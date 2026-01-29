import mongoose from "mongoose";

const showtimeSchema = mongoose.Schema({
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: [true, "Vui lòng chọn phim"]
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, "Vui lòng chọn phòng chiếu"]
    },
    startTime:{
        type:Date,
        required: [true, 'Vui lòng chọn giờ chiếu']
    },
    endTime:{
        type:Date,
        required:true,
    },
    date:{
        type:Date,
        required: true
    },
    price:{
        Standard:{
            type:Number,
            default: 80000
        },
        VIP:{
            type:Number,
            default: 120000
        },
        Couple:{
            type:Number,
            default:200000
        }
    },
    availableSeats:[{
        seatNumber: String,
        type: String,
        status:{
            type: String,
            enum: ['available', 'booked', 'selected'],
            default: 'available'
        }
    }],
    totalSeats:{
        type:Number,
        require:true
    },
    bookedSeats:{
        type:Number,
        default:0
    },
    isActive:{
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true, 
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
});

showtimeSchema.index({ movie: 1, startTime: 1 });
showtimeSchema.index({ date: 1 });
showtimeSchema.index({ room: 1, startTime: 1 });

showtimeSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'showtime'
});
const ShowTime = mongoose.model('Movie', showtimeSchema);

export default ShowTime;