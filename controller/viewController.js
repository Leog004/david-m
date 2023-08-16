const catchAsync = require('./../utils/catchAsync');
const { GetHomePage, GetFooter, GetBioPage, getShowPage, getSocialMedia, getGalleryPage, getMusicPage, getContactPage } = require('../utils/graphql');
const { convertToMultipleParagraphs } = require('../utils/dataHelper');
const emailController = require('./emailController');
const axios = require('axios');



exports.getHomePage = catchAsync ( async (req, res) => {
    const homePage = await GetHomePage();
    const footer = await GetFooter();
    const socialMedia = await getSocialMedia();
    

    res.status(200).render('index', {
        Title: 'David-M - Home Page',
        homePage,
        footer,
        socialMedia,
    });
});

exports.getContactPage = catchAsync( async (req, res) => {
    const footer = await GetFooter();
    const socialMedia = await getSocialMedia();
    const contactPage = await getContactPage();

    res.status(200).render('contact',{
        Title: 'David-M - Contact Page',
        contactPage,
        footer,
        socialMedia,
    });
});


exports.getBioPage = catchAsync ( async (req, res) => {
    const footer = await GetFooter();
    const bioPage = await GetBioPage();
    const socialMedia = await getSocialMedia();
    

    res.status(200).render('bio',{
        Title: 'David-M - Bio Page',
        footer,
        bioPage,
        socialMedia,
    });
});

exports.getGalleryPage = catchAsync ( async (req, res) => {
    const footer = await GetFooter();
    const socialMedia = await getSocialMedia();
    const galleryPage = await getGalleryPage();


    res.status(200).render('gallery',{
        Title: 'David-M - Gallery Page',
        footer,
        socialMedia,
        galleryPage,
    });  
});

exports.getMusicPage = catchAsync ( async (req, res) => {
    const footer = await GetFooter();
    const socialMedia = await getSocialMedia();
    const musicPage = await getMusicPage();


    res.status(200).render('music',{
        Title: 'David-M - Music Page',
        footer,
        socialMedia,
        musicPage,
    });  
});



exports.getShowPage = catchAsync ( async (req, res) => {
    const footer = await GetFooter();
    const showPage = await getShowPage();
    const socialMedia = await getSocialMedia();

    // Parse query parameter to determine sorting order
    const queryParams = new URLSearchParams(req.query);
    const descendingOrder = queryParams.get('order') === 'descend';

    console.log(descendingOrder);

    // Sort events based on date in ascending order
    showPage.shows.sort((a, b) => new Date(a.date) - new Date(b.date));

    // If descending order is requested, reverse the array
    if (descendingOrder) {
        showPage.shows.reverse();
    }

        
    res.status(200).render('shows',{
        Title: 'David-M - Show Page',
        footer,
        showPage,
        socialMedia,
        descendingOrder,
    });
});



exports.postContact = catchAsync( async (req, res) => {

    const { name, email, message, subject } = req.body;

    try {
      const response = await emailController.sendEmail(name, email, message, subject);

        //  redirect to contact page and also send status message
        res.redirect('/contact?status=success');

    //   res.status(200).json({ message: 'Email sent successfully', response });

    } catch (error) {
        res.redirect('/contact?status=fail');
      //res.status(500).json({ error: 'Error sending email', message: error.message });
    }

});

exports.verifyRecaptcha = catchAsync(async (req, res) => {
    const { token } = req.body;
    const secretKey = process.env.GOOGLE_SECRET_KEY; // Fix typo here (REACAPTHAKEY -> RECAPTCHA_KEY)
    const userIp = req.headers["x-forwarded-for"];
  
    try {
      const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
        params: {
          secret: secretKey,
          response: token,
          remoteip: userIp,
        },
      });
  
      if (response.data.success) {
        return res.send({ success: true });
      } else {
        return res.send({ success: false, error: response.data["error-codes"] });
      }
    } catch (error) {
      return res.send({ success: false, error: error.message });
    }
  });
  
  
  
  
  
  


// exports.postSubscriber = catchAsync( async(req, res) => {

//     const email = req.body.email;
//     console.log(req.body);

//     // Check if email exists
//     if(!email){
//         return next(new AppError('Please provide email and message!', 400));
//     }

//     const newSubscriber = await Subscriber.create(req.body);

//     // const toHost_ = await {
//     //     email: 'mathewmacielmusic@gmail.com',
//     //     userEmail: req.body.email
//     // };

//     // const url = `${req.protocol}://${req.get('host')}/`;
//     // await new Email(toHost_, url).sendToHostSubscriber();

//     res.status(200).json({
//         status: 'success',
//         message: 'email sent!',
//         data:{ 
//             subscriber: newSubscriber
//         }
//       });

// });


// exports.getSubscriber = catchAsync(async(req, res) => {

//     const subscribers = await Subscriber.find();

//     if(!subscribers){
//         return next(new AppError('Can not find any subscribers', 404));
//     }

//     res.status(200).json({
//         status: 'success',
//         results : subscribers.length,
//         data: subscribers
//     })

// });
