const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// FIND ALL TAGS
router.get('/', (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'stock', 'price', 'category_id']
    }
  }).then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'There were no found tags.' });
      return;
    }
    res.json(dbTag);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});


// FIND ONE TAG
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ['product_name', 'stock', 'price', 'category_id']
    }
  }).then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'There were no found tags.' });
      return;
    }
    res.json(dbTag);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});



// CREATE NEW TAG
router.post('/', (req, res) => {
  Tag.create({
    category_name: req.body.category_name
  }).then(dbTag =>
    res.json(dbTag)).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// UPDATE A TAG
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'There were no found tags with this id.' });
      return;
    }
    res.json(dbTag);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});


// DELETE A TAG
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbTag => {
    if (!dbTag) {
      res.status(404).json({ message: 'There were no found tags with this id.' });
      return;
    }
    res.json(dbTag);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;
