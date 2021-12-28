const express = require('express');
const heroController = require('../controllers/heroController');

const router = express.Router();

router
  .route('/')
  .post(heroController.createHero)
  .get(heroController.getAllHero)
  .put(heroController.testHeroQuery);

router
  .route('/:id')
  .get(heroController.getOneHero)
  .patch(heroController.updateHero)
  .delete(heroController.deleteHero);

module.exports = router;
