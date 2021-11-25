const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { ok } = require('assert');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: ['genre']
        })
            .then(movies => {
                res.json({
                    meta:{
                        status: 200,
                        total: movies.length,
                        url:'api/movies'
                    },
                    data: movies
                })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,
            {
                include : ['genre']
            })
            .then(movie => {
                res.json({
                    meta:{
                        status: 200,
                        url:'api/movies'
                    },
                    data: movie
                });
            });
    },
    
    //Aqui dispongo las rutas para trabajar con el CRUD
    
    create: function (req,res) {
        Movies
        .create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(()=> {
            return res.json({
                meta: {
                    status: 'ok',
                    url: 'api/movies/create'
                },
                data: req.body
        })})            
        .catch(error => res.send(error))
    },
    
    update: function (req,res) {
        let movieId = req.params.id;
        Movies
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
        .then(()=> {
            return res.json({
                meta: {
                    status: 'ok',
                    url: 'api/movie/update/:id'
                },
                data: req.body
            })
    })},
    
    destroy: function (req,res) {
        let movieId = req.params.id;
        Movies
        .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.json({
                meta: {
                    status: 'ok',
                    url: 'api/movie/delete/:id'
                }
            })})
        .catch(error => res.send(error)) 
    }
}

module.exports = moviesController;