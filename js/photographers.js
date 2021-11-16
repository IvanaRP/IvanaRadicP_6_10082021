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

// FACTORY METHOD
class media {
  constructor(photo) {
    this.photo = photo;
    if (photo.hasOwnProperty("video")) {
      this.type = "video";
    } else {
      this.type = "image";
    }
  }
  generateImg() {
    return `
      <a href="Documents/Sample Photos/${filteredUser.name}/${this.photo.image}" aria-label=”${this.photo.title}" alt="${this.photo.title}" >
      <img class="galerie__gridimg" src="Documents/Sample Photos/${filteredUser.name}/${this.photo.image}" alt="${this.photo.title}">
      </a>`;
  }

  generateVideo() {
    return `
      <a href="Documents/Sample Photos/${filteredUser.name}/${this.photo.video}" aria-label=”${this.photo.title}" alt="${this.photo.title}">
      <video type="video/mp4" controls class="galerie__gridimg" src="Documents/Sample Photos/${filteredUser.name}/${this.photo.video}" alt="${this.photo.title}">
      </a>`;
  }

  getHtml() {
    if (this.type == "image") {
      return this.generateImg();
    } else if (this.type == "video") {
      return this.generateVideo();
    }
  }
}

// // fetch Json data
// function fetchData() {
//   return fetch("FishEyeData.json").then((response) => {
//     return response.json();
//   });
// }

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
          return `<a href="index.html?tags=${tag}"><p onClick=filterByTag("${tag}") id="tags" class="tags" >#${tag}</p></a>`;
        })
        .join("");
      return `
             <div class = "filteredUser__infoButton"> 
                  <div class = "filteredUser__info"> 
                            <p class="id">${filteredUser.id}</p>
                            <a href="photographer-page.html"><h2 class="filteredUser__name">${filteredUser.name}</h2></a>
                              <p class="filteredUser__location">${filteredUser.city}, ${filteredUser.country}</p>
                              <p class="filteredUser__tagline">${filteredUser.tagline}</p>
                              <div class="tags__all">${tagsHtml}</div>
                  </div> 
                <div class="filteredUser__btn" ><button data-modal-target="#modal" id="open" class="button"  aria-label="contacter le photographe ${filteredUser.id}">Contatez-moi</button></div>
             </div>
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

  // KEYBOARD EVENTS open modal
  document
    .getElementById("open")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter")
        document.querySelector(".modalBox").style.display = "flex";
    });
}

//display all  MEDIA PHOTOS VIDEOS in inner html //add Media factory
function drawPhotographersHtml() {
  let photoHtml = sortedPhotos
    .map((photo) => {
    
      let mediaFile = new media(photo);

      return `
        <div class="galerie__grid">
            
                   ${mediaFile.getHtml()}  

            <div class="galerie__info">
                <p class="galerie__title">${photo.title}</p>
                <div class="HeartLIKES">
                    <div class="numberLikes" >${photo.likes} </div>
                    <button id="heart" class="galerie__likes" onclick="incrementButton(event)" aria-label="button like" ><i class="fas fa-heart"></i></button>
                </div>
            </div> 
        </div>
        `;
    })
    .join("");
  document.querySelector("#media").innerHTML = photoHtml;
}

// //display all LIKES DOWN RIGHT  add down  in mediaID
function likeInfo() {
  // total likes
  const totalL = document.querySelector(".totalLikes");
  // console.log(totalL);
  let totalLikes = 0 + totalL;
  photographerPhotos.forEach((item) => {
    totalLikes = totalLikes + item.likes;
  });

  let likeInfoHtml = ` <div class="galerie__infoDown"> 
                  <div class="HeartLIKES">
                    <div class="totalLikes" >${totalLikes}</div>
                    <div id="heart" class="galerie__likesblack"><i class="fas fa-heart"></i></div>
                  </div>
                  <div class="galerie__likesprice">
                     <p class="galerie__infotitle">${filteredUser.price} € / jour</p>
                  </div>
              </div> 
            `;
  document.getElementById("downright").innerHTML = likeInfoHtml;
}

//COUNTER OF LIKES - IncrimentHEART
function incrementButton(event) {
  console.log(event.target.parentElement.querySelector(".numberLikes"));
  const numberLikes = event.target.parentElement.querySelector(".numberLikes");

  // total likes
  const totalL = document.querySelector(".totalLikes");
  console.log(totalL);

  if (!numberLikes.classList.contains("liked")) {
    console.log(parseInt(numberLikes.innerHTML) + 1);
    numberLikes.innerHTML = parseInt(numberLikes.innerHTML) + 1;
    totalL.innerHTML = parseInt(totalL.innerHTML) + 1;
    numberLikes.classList.add("liked");
    totalL.classList.add("liked");
  } else {
    numberLikes.innerHTML = parseInt(numberLikes.innerHTML) - 1;
    totalL.innerHTML = parseInt(totalL.innerHTML) - 1;
    numberLikes.classList.remove("liked");
    totalL.classList.remove("liked");
  }
}

// DropDownmenu3
function dropDownMenu() {
  let dropDownMenuHtml = `
    <div class="dropMenu">
      <p class="dropMenu__trier" aria-label="trier gallerie par popularite, titre ou date">Trier par</p>

                <div class="containerMenu">
                    <button  class="select" name="select" value = "options">Select:</button>
                    <div class="options">
                        <hr>
                        <a href="#" id="popular" value="BULJA" class="item" aria-label="trier par popularite" onClick="sortByLikes()">Popularité</a>
                        <hr>
                        <a href="#" id="title" class="item" aria-label="trier par titre" onClick="sortByTitle()">Titre</a>
                        <hr>
                        <a href="#" id="date" class="item" aria-label="trier par date" onClick="sortByDate()">Date</a>
                    </div>
                </div>

    </div>
     `;
  document.getElementById("dropdownmenu").innerHTML = dropDownMenuHtml;
  dropDownToggle();

}

function dropDownToggle() {
  // select elements - make contstante
  const select = document.querySelector(".select");
  const optionBox = document.querySelector(".options");
  const options = [...document.querySelectorAll(".options .item")];

  let activeOption = 0; //default shoud be 0

  window.onclick = (e) => {
    if (!e.target.className.includes("select")) {
      select.classList.remove("active");
      optionBox.classList.remove("active");
    } else {
      select.classList.toggle("active");
      optionBox.classList.toggle("active");
    }
  };

  options.forEach((item, i) => {
    item.onmousemove = () => {
      hoverOptions(i);
    };
  });

  // hover
  const hoverOptions = (i) => {
    options[activeOption].classList.remove("active");
    options[i].classList.add("active");
    activeOption = i;
    setValue();
  };

  // KEYBOARD EVENTS
  window.onkeydown = (e) => {
    if (select.className.includes("active")) {
      e.preventDefault();
      if (e.key === "ArrowDown" && activeOption < options.length - 1) {
        hoverOptions(activeOption + 1);
      } else if (e.key === "ArrowUp" && activeOption > 0) {
        hoverOptions(activeOption - 1);
      } else if (e.key === "Enter") {
        select.classList.remove("active");
        optionBox.classList.remove("active");
        // e.target.click();
        console.log(e.target.value);
         switch(e.target.value) {
          case "Titre":
            sortByTitle();
            break;
          case "Popularité":
            sortByLikes();
            break;
            case "Date":
            sortByDate();
            break;
          default:
            // code block
        }
      }
    }
  };

  const setValue = () => {
    select.innerHTML = select.value = options[activeOption].innerHTML;
  };

  setValue();
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


fetch("FishEyeData.json")
  .then((response) => {
    return response.json();
  })
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
    dropDownToggle();
   


  })
  .catch((error) => {
    console.log(error);
  });


