const express = require('express');
const heroController = require('../controllers/heroController');
const { protect, restrict } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(protect, restrict('gm'), heroController.createHero)
  .get(protect, heroController.getAllHero)
  .put(heroController.testHeroQuery);

router
  .route('/:id')
  .get(heroController.getOneHero)
  .patch(heroController.updateHero)
  .delete(heroController.deleteHero);

module.exports = router;
