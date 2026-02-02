import Movie from "../models/movie.model";
import { asyncHandler } from "../utils/asyncHandler";

export const getAllMovie = asyncHandler(async(req, res) => {
    const movie = await Movie.find();
    return movie;
});

export const getMovieById = asyncHandler(async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) {
        return res.status(404).json({
            message: "Không tìm thấy phim"
        })
    }
    return {
        message: "Lấy phim thành công",
        data: movie,
    };
})

export const deleteMovieById = asyncHandler(async(req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) {
        return res.status(404).json({
            message: "Không tìm thấy phim để xóa"
        })
    }
    return {
        message: "Xóa phim thành công",
        data: movie
    };
});

export const createMovie = asyncHandler(async(req, res) => {
    const movie = await Movie.create(req.body);
    return {
        message: "Tạo phim mới thành công",
        data: movie
    }
})

export const updateMovieById = asyncHandler(async(req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!movie) {
        return res.status(404).json({
            message: "Không tìm thấy phim để cập nhật"
        })
    }
    return {
        message: "Cập nhật phim thành công",
        data: movie
    
    };
})