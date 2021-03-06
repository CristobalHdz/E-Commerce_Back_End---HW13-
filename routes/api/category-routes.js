const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// FIND ALL CATEGORIES
router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'stock', 'price', 'category_id']
    }
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'There were no found categories.' });
      return;
    }
    res.json(dbCategory);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});


// FIND ONE CATEGORY
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'stock', 'price', 'category_id']
    }
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'There were no found categories.' });
      return;
    }
    res.json(dbCategory);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});



// CREATE NEW CATEGORY
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(dbCategory =>
    res.json(dbCategory)).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// UPDATE A CATEGORY
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'There were no found categories with this id.' });
      return;
    }
    res.json(dbCategory);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// DELETE A CATEGORY
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCategory => {
    if (!dbCategory) {
      res.status(404).json({ message: 'There were no found categories with this id.' });
      return;
    }
    res.json(dbCategory);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;
