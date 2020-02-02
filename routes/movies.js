const express = require('express')
const joi = require('@hapi/joi')
const MoviesService = require('../services/movies')

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies')

const validationHandler = require('../utils/middleware/validationHandler')

function moviesApi(app){

    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService()

    router.get('/', async (req, res, next) => {
        const {tags} = req.query

        try{
            const movies = await moviesService.getMovies({tags})
            
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch(err){
            next(err);
        }
    })

    router.get('/:movieId', 
        // validationHandler(joi.object({movieId: movieIdSchema}), 'params'), 
        async (req, res, next) => {
        
            const movieId = req.params.movieId

        try{
            const movie = await moviesService.getMovie({movieId})

            res.status(200).json({
                data: movie,
                message: 'movie retrieve'
            })
        } catch(err){
            next(err);
        }
    })

    router.post('/', 
    // validationHandler(joi.object(createMovieSchema)),
     async (req, res, next) => {
        const movie = req.body;

        try{
            const createdMovieId = await moviesService.createMovie({movie})

            res.status(200).json({
                data: createdMovieId,
                message: 'movie created'
            })
        } catch(err){
            next(err);
        }
    })

    router.put('/:movieId',
    //  validationHandler({movieId: movieIdSchema}, 'params'), validationHandler(updateMovieSchema), 
    async (req, res, next) => {
        const movieId = req.params.movieId
        const movie = req.body

        try{
            const updatedMovieId = await moviesService.updateMovie({movieId, movie})

            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            })
        } catch(err){
            next(err);
        }
    })


    router.delete('/:movieId',
    //  validationHandler({movieId: movieIdSchema}, 'params'), 
     async (req, res, next) => {
        const movieId = req.params.movieId

        try{
            const deletedMovieId = await moviesService.deleteMovie({movieId})

            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            })
        } catch(err){
            next(err);
        }
    })

}

module.exports = moviesApi