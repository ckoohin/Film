import Movie from "../models/movie.model";
import { asyncHandler } from "../utils/asyncHandler";

export const getAllMovie = asyncHandler(async(req, res) => {
    const movie = await Movie.find();
    return movie;
});

export const getMovieById = asyncHandler(async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    return movie;
})

export const deleteMovieById = asyncHandler(async(req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    return movie;
});

export const createMovie = asyncHandler(async(req, res) => {
    const movie = await Movie.create(req.body);
    return movie;
})

export const updateMovieById = asyncHandler(async(req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return movie;
})