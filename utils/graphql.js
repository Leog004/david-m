const { request, gql } = require("graphql-request");

const graphqlAPI = process.env.GRAPHCMSAPITOKEN;

// exports.GetAllMusic = async () => {
//   const query = gql`
//     query GetAllMusic {
//       musics(orderBy: releasedDate_DESC) {
//         id
//         title
//         isFeaturedOnHeader
//         lyrics
//         musicHashTags
//         albumImage {
//           url
//         }
//         spotifyUrl
//         releasedDate
//         showOnWeb
//         showOnHomePage
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query); // get our response from api call

//   return result.musics; // return data
// };

// exports.GetFeaturedSong = async () => {
//   const query = gql`
//     query GetFeaturedSong {
//       musics(first: 1, where: { isFeaturedOnHeader: true }) {
//         id
//         title
//         isFeaturedOnHeader
//         lyrics
//         musicHashTags
//         albumImage {
//           url
//         }
//         spotifyUrl
//         releasedDate
//         showOnWeb
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query); // get our response from api call

//   return result.musics; // return data
// };

// exports.GetAllVideos = async () => {
//   const query = gql`
//     query GetAllVideos {
//       videos {
//         id
//         youtubeVideoUrl
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query); // get our response from api call
//   return result.videos; // return data
// };

// exports.GetBio = async () => {
//   const query = gql`
//     query GetBio {
//       bios(first: 1) {
//         bioTitle
//         id
//         performedAt
//         radioPlay {
//           title
//           text
//         }
//         addToBio {
//           text
//           title
//         }
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query); // get our response from api call
//   return result.bios; // return data
// };

// exports.GetAbout = async () => {
//   const query = gql`
//     query GetAbout {
//       abouts(first: 1) {
//         aboutImage {
//           url
//         }
//         aboutParagraphs
//         aboutTitle
//         id
//         images {
//           url
//         }
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query); // get our response from api call
//   return result.abouts; // return data
// };

// exports.GetFeaturedVideos = async () => {
//   const query = gql`
//     query GetFeaturedVideos {
//       video(where: {id: "cl5zx2gyoki9r0dk12n3a0ubt"}) {
//         id
//         featureVideo {
//           videoUrl
//           show
//         }
//       }
//     }
//   `;

//   const result = await request(graphqlAPI, query); // get our response from api call
//   return result.video; // return data
// };

// exports.GetMetaData = async () => {
//   const query = gql`query GetMetaData {
//     metadata(where: {id: "clgrky116zpqz0bim0n2630ei"}) {
//       id
//       photoLink {
//         url
//       }
//       socialMedia {
//         showSocialMedia
//         socialMediaLink
//         socialMediaName
//       }
//     }
//   }`;

//   const result = await request(graphqlAPI, query); // get our response from api call
//   return result.metadata; // retur
  
// };

exports.GetFooter = async () => {
  const query = gql`query Footer {
    footer(where: {id: "clfqeu1sl8cog0biqp6zv2j58"}) {
      id
      left {
        title
        text
      }
      right {
        title
        text
      }
    }
  }`;

  const result = await request(graphqlAPI, query); // get our response from api call
  console.log(result.footer);
  return result.footer; // return
  
};

exports.GetHomePage = async () => {
  const query = gql`query HomePage {
    homePages(where: {id: "clat8bkzrfnm70akbg6hgy77a"}) {
      id
      backgroundImage {
        image {
          url
        }
      }
      heading
      subHeading
      featureVideo {
        youtubeUrl
        image {
          url
        }
      }
      featuredSong {
        song {
          id
        }
      }
      bioCardInformation {
        ... on BioCard {
          id
          paragraph
          stage
          subTitle
          title
          bioCardImage {
            url
          }
        }
      }
      socialMedia {
        instagramUrl
        facebookUrl
        soundCloudUrl
        spotifyUrl
        stage
        twitterUrl
      }
    }
  }
  `;

  const result = await request(graphqlAPI, query); // get our response from api call
  console.log(result.homePages[0])
  return result.homePages[0]; // retur
};


exports.GetBioPage = async () => {
  const query = gql`query BioPage {
    bioPage(where: {id: "clfhrdj9ueald0ajzxnygtudk"}) {
      id
      headerImage {
        url
      }
      achievements {
        subTitle
        title
        achievement {
          image {
            url
          }
          title
        }
      }
      bioImage {
        url
      }
      recentWork {
        subTitle
        title
        videoAndImage {
          youtubeUrl
          image {
            url
          }
        }
      }
      bioInformation {
        ... on BioCard {
          id
          stage
          subTitle
          title
          paragraph
          info {
            text
            title
          }
        }
      }
    }
  }
  `;

  const result = await request(graphqlAPI, query); // get our response from api call
  console.log(result.bioPage)
  return result.bioPage; // retur

}
