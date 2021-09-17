// Get URL Parameters

function getParam(name) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(name);
}

//fetch json and display all photographers in inner html

function fetchData() {
  fetch("FishEyeData.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let photographerId = getParam("id");
      const filteredUsers = data.photographers.filter((user) => {
        return user.id == photographerId;
      });

      let filteredUser = filteredUsers[0];

      //make user div in innerHTML

//make user TAG SEPARATE in innerHTML

    let tagsHtml = filteredUser.tags.map(tag => {
     return `
    
      <p>${tag.tags}</p>
     
     `;
      console.log(tag);

      })
      .join("");
     document.querySelector("#photographerTags").innerHTML = tagsHtml;


//make user TAG SEPARATE in innerHTML add this  `+tagsHtml+`

      document.getElementById("photographer").innerHTML = `
            <div class = "filteredUser__info"> 
                <p class="id">${filteredUser.id}</p>
                <a href="photographer-page.html"> <h2 class="name">${filteredUser.name}</h2></a>
                  <p class="country">${filteredUser.country}</p>
                  <p class="tagline">${filteredUser.tagline}</p>
                  <p class="price">${filteredUser.price}</p>
                  `+tagsHtml+`

          </div>

          <div class = "filteredUser__img">
          <a href="photographer-page.html?id=${filteredUser.id}"> <img id="profile" src="/Documents/Sample Photos/Photographers ID Photos/${filteredUser.portrait}" class="profile"  alt=""/> </a>
        </div>
              `;

      console.log(filteredUser);

      let photographerPhotos = data.media.filter((media) => {
        return media.photographerId == photographerId;
      });
      console.log(photographerPhotos);


//display all  MEDIA PHOTOS VIDEOS in inner html

      let photoHtml = photographerPhotos
        .map((photo) => {
          return `<div class="galerie__user">
          <div class = "galerie__image">
              <p class="pID" >${photo.id}</p>
              <p class="photoID">${photo.photographerId}</p>
              <img id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.image}"  alt=""/>
             
              <p class="photoDate">${photo.date}</p>
              <p class="photoPrice">${photo.price}</p>
          </div>

          <div class="galerie__info"> 
                  <p class="galerie__title">${photo.title}</p>
                  <p class="galerie__likes">${photo.likes}</p>
          </div>    

          </div>
          `;
        })
        .join("");

      document.querySelector("#media").innerHTML = photoHtml;
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchData();

//BUTTON CONCTACT ME

// 1. Create the button
var button = document.createElement("button");
button.innerHTML = "Contatez-moi";

// 2. Append somewhere
var body = document.getElementById("btn");
body.appendChild(button);

// 3. Add event handler

// !!!change event listenrr to send email!!!
button.addEventListener("click", function () {
  alert("SEND EMAIL");
});

//fetch json and display all  MEDIA in inner html

// function fetchMedia() {
//     fetch("FishEyeData.json")
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data.media);
//       const html = data.media.map(user => {
//         return `
//         <div class="galerie__user">

//                 <div class = "galerie__image">
//                     <p>${user.id}</p>
//                     <p>${user.photographerId}</p>
//                     <img id="img" class="galerie__img" src="Documents/Sample Photos/Tracy/${user.image}"  alt=""/>
//                     <video class="galerie__video"src="Documents/Sample Photos/Tracy/${user.video}" type="video/mp4">controls</video>
//                     <p>${user.tags}</p>
//                     <p>${user.date}</p>
//                     <p>${user.price}</p>
//                 </div>

//                  <div class="galerie__info">
//                         <p class="galerie__title">${user.title}</p>
//                         <p class="galerie__likes">${user.likes}</p>
//                 </div>

//         </div>
//         `;
//       })
//       .join("");
//       console.log(html)
//       document.querySelector("#media").innerHTML = (html)
//     })
//     .catch(error => {
//       console.log(error);
//     })
//   }

//   fetchMedia();

//fetch json and display all photographers in inner html

/*function fetchMedia() {
    fetch("FishEyeData.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let photographerId = getParam("id");
        const filteredMedia = data.media.filter((user) => {
          return user.id == photographerId;
        });
  
        let filteredMed = filteredMedia[0];
  
        //make user div in innerHTML
  
        document.getElementById("media").innerHTML = `
              <div class = "media">
                
              <p>${user.id}</p>
              <p>${user.photographerId}</p>
              <p>${user.title}</p>
              <img id="img" src="Documents/Sample Photos/${user.photographerId}/${user.image}" class="profile"  alt=""/> </a>
              <p>${user.tags}</p>
              <p>${user.likes}</p>
              <p>${user.date}</p>
              <p>${user.price}</p>
        </div>
           
                `;
  
        console.log(filteredMed);
      })
  
      .catch((error) => {
        console.log(error);
      });
  }
  
  fetchMedia();*/
