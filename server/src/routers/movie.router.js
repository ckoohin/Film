import { Router } from "express";
import { createMovie, deleteMovieById, getAllMovie, getMovieById, updateMovieById } from "../controllers/movie.controller";
import { validateRequest } from "../middlewares/validateRequest";
import movieValidation from "../validations/movie.validation";

const movieRouter = Router();

movieRouter.get("/", getAllMovie);
movieRouter.get("/:id", getMovieById);
movieRouter.delete("/:id", deleteMovieById);
movieRouter.post("/", validateRequest(movieValidation), createMovie);
movieRouter.put("/", validateRequest(movieValidation), updateMovieById)

export default movieRouter;;
