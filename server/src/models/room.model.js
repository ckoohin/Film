import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Vui lòng nhập tên phòng'],
        unique: true,
        trim: true
    },
    capacity:{
        type: Number,
        required:[true, 'Vui lòng nhập sức khỏe'],
        min:[1, 'Sức chứa phải lớn hơn 0']
    },
    roomType:{
        type: String,
        enum: ['Standard','VIP',, 'IMAX', '4DX', 'Premium'],
        default: 'Standard'
    },
    rows:{
        type:Number,
        required: [true, 'Vui lòng nhập số hàng ghế'],
        min: 1
    },
    seatsPerRow:{
        type: Number,
        required: [true, 'Vui lòng nhập số ghế mỗi hàng'],
        min: 1
    },
    seatLayout: [{
        seatNumber: {
            type: String,
            required: true
        },
        type:{
            type:String,
            enum:['Standard','VIP','Couple'],
            default: 'Standard'
        },
        isAvailable:{
            type: Boolean,
            default:true
        }
    }],
    isActive:{
        type:Boolean,
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

roomSchema.pre('save',function(next){
    if(this.isNew && this.seatLayout.length === 0){
        const seats = [];
        const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for(let row = 0; row < this.rows; row++){
            for(let seat = 1; seat <=  this.seatsPerPow; seat++){
                seats.push({
                    seatNumber: `${rowLetters[row]}${seat}`,
                    type:'Standard',
                    isAvailable: true
                });
            }
        }
        this.seatLayout = seats;
    }
    next();
})
const Room = mongoose.model('Room', roomSchema);

export default Room;