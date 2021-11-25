const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/api/moviesApiController');

router.get('/', moviesController.list);
router.get('/detail/:id', moviesController.detail);
//Rutas exigidas para la creación del CRUD
router.post('/create', moviesController.create);
router.put('/update/:id', moviesController.update);
router.delete('/delete/:id', moviesController.destroy);

module.exports = router;