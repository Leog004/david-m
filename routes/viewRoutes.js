const express = require('express');
const viewController = require('./../controller/viewController.js');
const router = express.Router();


router.get('/', viewController.getHomePage);
router.get('/contact', viewController.getContactPage);
router.get('/bio', viewController.getBioPage);
router.get('/gallery', viewController.getGalleryPage);
router.get('/shows', viewController.getShowPage);
router.get('/music', viewController.getMusicPage);


module.exports = router;


// app.get('/',(req,res)=>{
//     res.render('index');
// });


// app.get('/contact',(req,res)=>{
//     res.render('contact');
// });

// app.get('/bio',(req,res)=>{
//     res.render('bio');
// });

// app.get('/gallery',(req,res)=>{
//     res.render('gallery');
// });

// app.get('/shows',(req,res)=>{
//     res.render('shows');
// });
