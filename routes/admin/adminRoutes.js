const router = require('express').Router();
const Category = require('./categories/models/Category');
const {validationResult} = require('express-validator')
const checkCategory = require('./categories/utils/checkCategory')

router.get('/add-category', (req, res, next) => {
  return res.render('admin/add-category')
})

// const checkCategory = [
//     check('name', 'Category is required').not().isEmpty(),
//   ];


router.post('/add-category',checkCategory, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    // return res.status(422).json({ errors: errors.array() });
    req.flash('errors', errors.errors[0].msg)
    return res.redirect('/api/admin/add-category')
  }
  const category = new Category();
  category.name = req.body.name;
  category
    .save()
    .then((savedCategory) => {
      req.flash('messages', 'Successfully added Category');
      return res.redirect('/api/admin/add-category');
      // res.json({message:'Success',category:savedCategory})
    })
    .catch((err) => {
      if (err.code === 11000) {
        req.flash('errors', 'Category exists');
        return res.redirect('/api/admin/add-category');
      } else {
        return next(err);
      }
    });
});
module.exports = router;
