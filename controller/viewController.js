const catchAsync = require('./../utils/catchAsync');
const { GetHomePage, GetFooter, GetBioPage, getShowPage, getSocialMedia, getGalleryPage, getMusicPage } = require('../utils/graphql');
const { convertToMultipleParagraphs } = require('../utils/dataHelper');



exports.getHomePage = catchAsync ( async (req, res) => {
    const homePage = await GetHomePage();
    const footer = await GetFooter();
    const socialMedia = await getSocialMedia();
    

    res.status(200).render('index', {
        Title: 'Mathew Maciel - Home Page',
        homePage,
        footer,
        socialMedia,
    });
});

exports.getContactPage = catchAsync( async (req, res) => {
    const footer = await GetFooter();
    const socialMedia = await getSocialMedia();
    res.status(200).render('contact',{
        Title: 'Mathew Maciel - Contact Page',
        footer,
        socialMedia,
    });
});


exports.getBioPage = catchAsync ( async (req, res) => {
    const footer = await GetFooter();
    const bioPage = await GetBioPage();
    const socialMedia = await getSocialMedia();
    

    res.status(200).render('bio',{
        Title: 'Mathew Maciel - Bio Page',
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
        Title: 'Mathew Maciel - Music Page',
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
        Title: 'Mathew Maciel - Music Page',
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
        Title: 'Mathew Maciel - About Page',
        footer,
        showPage,
        socialMedia,
        descendingOrder,
    });
});



// exports.postContact = catchAsync( async (req, res) => {

//     const {name, email, message} = req.body;

//     // Check if email exists
//     if(!email || !message){
//         return next(new AppError('Please provide email and message!', 400));
//     }

//     const newContact = await {
//         name: req.body.name,
//         email: req.body.email,
//         message: req.body.message       
//     };

//     const toHost = await {
//         name: req.body.name,
//         email: 'mathewmacielmusic@gmail.com',
//         userEmail: req.body.email,
//         message: req.body.message       
//     };

//       const url = `${req.protocol}://${req.get('host')}/`;
//       await new Email(newContact, url).sendWelcome();
//       await new Email(toHost, url).sendToHost();

//       res.status(200).json({
//         status: 'success',
//         message: 'email sent!'
//       });

// });


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
