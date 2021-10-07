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
let allfilteredUsers;
let sortedPhotos;

// fetch Json data
function fetchData() {
  return fetch("FishEyeData.json").then((response) => {
    return response.json();
  });
}

// get Tags by map
function getTags(data) {
  let tags = [];
  data.media.map((media) => {
    if (media.hasOwnProperty("tags")) {
      media.tags.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
  });
  return tags;
}

// filter by Tags photographer
function filterByTag(tag) {
  filteredPhotographers = allfilteredUsers.filter((photographer) => {
    return photographer.tags.includes(tag);
  });
  drawPhotographersHtmlBox();
}

// display Photographers
function drawPhotographersHtmlBox() {
  let filteredUserhtml = filteredUsers
    .map((user) => {
      let tagsHtml = user.tags
        .map((tag) => {
          return `<a href="index.html?id=${tag}"><p onClick=filterByTag("${tag}") id="tags" class="tags">#${tag}</p></a>`;
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

//display all  MEDIA PHOTOS VIDEOS in inner html //make variable for MEDIAhtml VIDEO if else
function drawPhotographersHtml() {
  let photoHtml = sortedPhotos
    .map((photo) => {
      let tagsPhotoHtml = photo.tags
        .map((tag) => {
          return `<p onClick=filterByTag("${tag}") id="tags" class="tags">#${tag}</p>`;
        })
        .join("");
      // let mediaHtml = ""; //If Else show img or video
      // if (photo.hasOwnProperty("video")) {
      //   mediaHtml = `<video id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.video}"  alt="${photo.title}"/>`;
      // } else {
      //   mediaHtml = `<img id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.image}"  alt="${photo.title}"/>`;
      // }
      return `
        <div class="galerie__grid">
            <a href="Documents/Sample Photos/${filteredUser.name}/${photo.image}" aria-label=”image closeup view”>
                  <img class="galerie__gridimg" src="Documents/Sample Photos/${filteredUser.name}/${photo.image}" alt="${photo.title}"> 
            </a>

            <div class="galerie__info">
                <p class="galerie__title">${photo.title}</p>
                
                <div class="HeartLIKES">
                    <div class="numberLikes" id="incrementText">${photo.likes} </div>
                    <button id="heart" class="galerie__likes" onclick="incrementButton(event)"><i class="fas fa-heart"></i></button>
                </div>
            </div> 
        </div>
        `;
    })
    .join("");
  document.querySelector("#media").innerHTML = photoHtml;
}


//COUNTER OF LIKES - IncrimentHEART
function incrementButton(event) {
  console.log(event.target.parentElement.querySelector(".numberLikes"));
  const element = event.target.parentElement.querySelector(".numberLikes");
  console.log(event.target.querySelector(".galerie__likes"));
  if (!element.classList.contains("liked")) {
    console.log(parseInt(element.innerHTML) + 1);
    element.innerHTML = parseInt(element.innerHTML) + 1;
    element.classList.add("liked");
   
  } else {
    element.innerHTML = parseInt(element.innerHTML) - 1;
    element.classList.remove("liked");
  }

}

// //display all LIKES DOWN RIGHT  add down  in mediaID
function likeInfo() {
  let totalLikes = 0;
  photographerPhotos.forEach((item) => {
    totalLikes = totalLikes + item.likes;
  });
  let likeInfoHtml = ` <div class="galerie__infoDown"> 
                  <div class="HeartLIKES">
                  <div class="numberLikes">${totalLikes}</div>
                  <div id="heart" class="galerie__likes"><i class="fas fa-heart"></i></div>
                  <p class="galerie__infotitle">${filteredUser.price}€/jour</p>
              </div> 
            `;
  document.getElementById("downright").innerHTML = likeInfoHtml;
}


// DropDownmenu
function dropDownMenu() {
  let dropDownMenuHtml = `<div class="dropMenu">
            <p>Trier par</p>
            <div class="dropdown">
                <button  class="dropbtn" id="select">Select: <i class="fas fa-angle-up"></i></button>
                <div class="dropdown-content">
                  <a href="#" id="popular" onClick="sortByLikes()">Popularité</a>
                  <a href="#" id="title" onClick="sortByTitle()">Titre</a>
                  <a href="#" id="date" onClick="sortByDate()">Date</a>
                </div>
            </div>
        </div>     
     `;
  document.getElementById("dropdownmenu").innerHTML = dropDownMenuHtml;
}



// dropdownSort gallery
function sortByLikes() {
  sortedPhotos = photographerPhotos.sort(function (a, b) {
    return b.likes - a.likes;
  });
  drawPhotographersHtml();
}

function sortByTitle() {
  sortedPhotos = photographerPhotos.sort(function (a, b) {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
  drawPhotographersHtml();
}

function sortByDate() {
  sortedPhotos = photographerPhotos.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  drawPhotographersHtml();
}


fetchData()
  .then((data) => {
    photographerId = getParam("id");
    allfilteredUsers = data.photographers;
    filteredUsers = data.photographers.filter((user) => {
      return user.id == photographerId;
    });
    filteredUser = filteredUsers[0];
    // Display photographer MEDIA by id
    photographerPhotos = data.media.filter((media) => {
      return media.photographerId == photographerId;
    });

    sortedPhotos = photographerPhotos;

    drawPhotographersHtml();
    drawPhotographersHtmlBox();
    openModal();
    likeInfo();
    dropDownMenu();

  })
  .catch((error) => {
    console.log(error);
  });
