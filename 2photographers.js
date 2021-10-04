// Get URL Parameters
function getParam(name) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(name);
}

// make variables
let photographerId;
let photographerPhotos;
let filteredUsers;
let filteredUser;
// let allTags;
let allfilteredUsers;

// fetch Json data
function fetchData() {
  return fetch("FishEyeData.json").then((response) => {
    return response.json();
  });
}


// // get Tags by map
// function getTags(data) {
//   let tags = [];
//   data.media.map(media => {
//     if (media.hasOwnProperty('tags')) {
//       media.tags.map(tag => {
//         if (!tags.includes(tag)) {
//           tags.push(tag);
//         }
//       });
//     }
//   });
//   return tags;
// }



// filter by Tags photographer
function filterByTag(tag) {
  filteredPhotographers = allfilteredUsers.filter(photographer => {
    return photographer.tags.includes(tag);
  })
  drawPhotographersHtmlBox();
}

// display Photographers
function drawPhotographersHtmlBox() {
  let filteredUserhtml = filteredUsers
    .map((user) => {
      let tagsHtml = user.tags.map((tag) => {
          return `<a href="index.html?tag=${tag}"><p onClick=filterByTag("${tag}") id="tags" class="tags">#${tag}</p></a>`;
        })
        .join("");
      return `<div class = "filteredUser__info"> 
            <p class="id">${filteredUser.id}</p>
            <a href="photographer-page.html"><h2 class="name">${filteredUser.name}</h2></a>
              <p class="country">${filteredUser.country}</p>
              <p class="tagline">${filteredUser.tagline}</p>
              <p class="price">${filteredUser.price}</p>
              <div class="tags__all">${tagsHtml}</div>
         </div> 
        <div class="filteredUser__btn"><button data-modal-target="#modal" id="open" class="button">Contatez-moi</button></div>
          <div class = "filteredUser__img">
            <a href="photographer-page.html?id=${filteredUser.id}"> <img id="profile" src="Documents/Sample Photos/Photographers ID Photos/${filteredUser.portrait}" class="profile"  alt=""/> </a>
          </div>  
      `;
    })
    .join("");
  document.querySelector("#photographer").innerHTML = filteredUserhtml;
  openModal();
}

// open MODAL
function openModal() {
  document.getElementById("open").addEventListener("click", function () {
    document.querySelector(".modalBox").style.display = "flex";
  });
}

// DropDownmenu
function dropDownMenu() {
  let dropDownMenuHtml = 
       `<div class="dropMenu">
            <p>Trier par</p>
            <div class="dropdown">
                <button  class="dropbtn" id="select">Select: <i class="fas fa-angle-up"></i></button>
                <div class="dropdown-content">
                  <a href="#" id="title">Titre</a>
                  <a href="#" id="date">Date</a>
                  <a href="#" id="popular">Popularité</a>
                </div>
            </div>
        </div>     
     `;
  document.getElementById("dropdownmenu").innerHTML = dropDownMenuHtml;
}



// Sort gallery 
  

//display all  MEDIA PHOTOS VIDEOS in inner html //make variable for MEDIAhtml VIDEO if else
function drawPhotographersHtml() {
  let photoHtml = photographerPhotos
    .map((photo) => {
      let tagsPhotoHtml = photo.tags
        .map((tag) => {
          return `<p onClick=filterByTag("${tag}") id="tags" class="tags">#${tag}</p>`;
        })
        .join("");
      // let mediaHtml = ""; //If Else show img or video
      // if (photo.hasOwnProperty("video")) {
      //   mediaHtml = `<a href="Documents/Sample Photos/${filteredUser.name}/${photo.video}">
      //                  <video id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.video}"  alt="${photo.title}"/>
      //               </a>`;
      // } else {
      //   mediaHtml = `<a href="Documents/Sample Photos/${filteredUser.name}/${photo.image}">
      //                  <img id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.image}"  alt="${photo.title}"/>
      //                </a>`;
      // }
      // if (photo.hasOwnProperty("video")) {
      //   mediaHtml = `<video id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.video}"  alt=""/>`;
      // } else {
      //   mediaHtml = `<img id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.image}"  alt=""/>`;
      // }
      return (
        ` <div class="grid">
        <a href="Documents/Sample Photos/${filteredUser.name}/${photo.image}">
          <img class="imggrid" src="Documents/Sample Photos/${filteredUser.name}/${photo.image}" alt="${photo.title}">
        </a>
    
    </div>

          `);
    })
    .join("");
  document.querySelector("#media").innerHTML = photoHtml;
}


// MEdiaLIKES

// {/* <div class="galerie__box">
// <div class="galerie__user">
//       <div class = "galerie__image">
//           <p class="pID" >${photo.id}</p>
//           <p class="photoID">${photo.photographerId}</p>
//           ` + mediaHtml + `
//           <p class="photoDate">${photo.date}</p>
//           <p class="photoPrice">${photo.price}</p>
//         </div>
// </div>
// <div class="galerie__info"> 
// <p class="galerie__title">${photo.title}</p>
// <div class="tags__all">${tagsPhotoHtml}</div>
// <div class="HeartLIKES">
// <div data-choisi="false" data-calories="23" class="numberLikes" id="incrementText">${photo.likes} </div>
// <button id="heart" class="galerie__likes" onclick="incrementButton()" ><i class="fas fa-heart"></i></button>
// </div> 
// </div> 
// </div> 

// <div class="media__likes">

// </div>  */}



//display all LIKES DOWN RIGHT  add down  in mediaID
function likeInfo() {
  let totalLikes = 0;
  photographerPhotos.forEach((item) => {
    totalLikes = totalLikes + item.likes;
  });
  let likeInfoHtml = ` <div class="galerie__infoDown"> 
                  <div class="HeartLIKES">
                  <div class="numberLikes">${totalLikes}</div>
                  <div id="btnLike" class="galerie__likes"><i class="fas fa-heart"></i></div>
                  <p class="galerie__infotitle">${filteredUser.price}€/jour</p>
              </div> 
            `;
  document.getElementById("downright").innerHTML = likeInfoHtml;
}

// COUNTER OF LIKES - IncrimentHEART
// function incrementButton(event) {
//   let element = document.getElementById("incrementText");
//   let value = element.innerHTML;
//   ++value;
//   console.log(value);
//   document.getElementById("incrementText").innerHTML = value;
// }

// change buttonLIke 



fetchData()
  .then((data) => {
    photographerId = getParam("id");
    // allTags = getTags(data);
// console.log(allTags);
    allfilteredUsers = data.photographers;
    filteredUsers = data.photographers.filter((user) => {
      return user.id == photographerId;
    });
    filteredUser = filteredUsers[0];
    // Display photographer MEDIA by id
    photographerPhotos = data.media.filter((media) => {
      return media.photographerId == photographerId;
    });

    drawPhotographersHtml();
    drawPhotographersHtmlBox();
    openModal();
    likeInfo();
    // incrementButton();
    dropDownMenu();
    // dropDownMenu2();
    // likePart();
    // likeDataTuto();

  })
  .catch((error) => {
    console.log(error);
  });

// za
//   <a href="Documents/Sample Photos/Ellie-Rose Wilkens/Sport_Next_Hold.jpg">
//   <img class="imggrid" src="Documents/Sample Photos/Ellie-Rose Wilkens/Sport_Next_Hold.jpg" alt="">
// </a>