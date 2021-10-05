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

// fetch Json data
function fetchData() {
  return fetch("FishEyeData.json").then((response) => {
    return response.json();
  });
}


// get Tags by map
function getTags(data) {
  let tags = [];
  data.media.map(media => {
    if (media.hasOwnProperty('tags')) {
      media.tags.map(tag => {
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
  let photoHtml = photographerPhotos
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
      return (
        `
        <div class="galerie__grid">
            <a href="Documents/Sample Photos/${filteredUser.name}/${photo.image}">
                  <img class="galerie__gridimg" src="Documents/Sample Photos/${filteredUser.name}/${photo.image}" alt="${photo.title}"> 
            </a>

            <div class="galerie__info">
                <p class="galerie__title">${photo.title}</p>
                
                <div class="HeartLIKES">
                    <div class="numberLikes" id="incrementText">${photo.likes} </div>
                    <button id="heart" class="galerie__likes" onclick="incrementButton()"><i class="fas fa-heart color-heart"></i></button>
                </div>
            </div> 
        </div>

        `);
    })
    .join("");
  document.querySelector("#media").innerHTML = photoHtml;
  lightbox();
  // heartLike2();
  heartColor();
}

       
// // LIKES DATA ATRIBUTES
  // <div class="likesHeart">
  // <li id="likebutton" class="likebutton" data-choisi="false" data-calories="10"><i class="fas fa-heart color-heart"></i>HEART</li>
  // <h2>nombre de plats selected: <span id="count">0</span></h2>
  // <h2>Total nombre: <span id="total">0</span></h2>
  // </div> 
// function heartLike2() {

//   const likes = document.querySelectorAll('li');
// // console.log(plats)
//   likes.forEach(like => {
//     like.addEventListener('click', addLike);
//   });

//   function addLike() {
//     this.dataset.choisi = this.dataset.choisi == "true" ? "false" : "true";
//     calculLike();
//     calculTotalLike();
//   }

//   function calculLike(){
//     const likeNumber = document.querySelectorAll('li[data-choisi="true"]').length;
//     document.querySelector('#count').textContent = likeNumber;
//   } 
 
//   function calculTotalLike() {
//     const choseLike = Array.from(document.querySelectorAll('li[data-choisi="true"]'));
//     const totalLikes = choseLike.reduce((total, like) => total + Number(like.dataset.calories), 0);

//     document.querySelector('#total').textContent = totalLikes;
//   }

// }


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
// heartColor();
}

//COUNTER OF LIKES - IncrimentHEART
function incrementButton() {
  let element = document.getElementById("incrementText");
  let value = element.innerHTML;
  ++value;
  console.log(value);
  document.getElementById("incrementText").innerHTML = value;
}

// change button Like Color
function heartColor() {
      // gets a reference to the heartDOm
    const heart = document.getElementById('heart');
    // initialized like to false when user hasnt selected
    let liked = false;
// console.log(heartDOM);
    // create a onclick listener
    heart.onclick = (event) => {
    // check if liked 
    liked = !liked; // toggle the like ( flipping the variable)
    // this is what we clicked on
    const target = event.currentTarget;
      if (liked) {
        // remove empty heart if liked and add the full heart
        target.style.color = "#901c1c";
        target.style.color = "#D3573C";
      } else {
        // remove full heart if unliked and add empty heart
        target.style.color = "#D3573C";
        target.style.color = "#901c1c";
      }
    }
}

// DropDownmenu
function dropDownMenu() {
  let dropDownMenuHtml = 
       `<div class="dropMenu">
            <p>Trier par</p>
            <div class="dropdown">
                <button  class="dropbtn" id="select">Select: <i class="fas fa-angle-up"></i></button>
                <div class="dropdown-content">
                  <a href="#" id="popular">Popularité</a>
                  <a href="#" id="title">Titre</a>
                  <a href="#" id="date">Date</a>
                </div>
            </div>
        </div>     
     `;
  document.getElementById("dropdownmenu").innerHTML = dropDownMenuHtml;
  sortBy();
}

// sort DROPDOWN MENU
function sortBy() {

      // sort by like 
      function sortByLike() {
          let sortLike = document.getElementById("popular");
          console.log(sortLike);
        }

        const sortedByLike = photographerPhotos.sort(function (a, b) {
            return b.likes - a.likes;
        });
        console.log(sortedByLike);
     
      // sort by Date
      function sortByDate() {
        let sortDate = document.getElementById("date");
        console.log(sortDate);
      }

      const sortedByDate = photographerPhotos.sort(function(a,b){
          return new Date(b.date) - new Date(a.date);
      });
      console.log(sortedByDate);
      

      // sort by Title
      function sortByTitle() {
        let sortTitle = document.getElementById("title");
        console.log(sortTitle);
      }

      const sortedByTitle = photographerPhotos.sort(function (a, b) {
        if (a.title < b.title)
         return -1;
         if (a.title > b.title)
           return 1;
           return 0;
          });
      console.log(sortedByTitle);
      // display media gallery by sort
                // document.getElementById(".media").innerHTML = "";
                   
}

// LIGHTBOX

function lightbox() {
/**
 * 
 * @property {HTMLElement} element
 * @property {string[]} images links to the images of the lightbox
 * @property {string} url images showed
 */


 class Lightbox {

  static init () {
      const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
      const gallery = links.map(link => link.getAttribute("href"));
      links.forEach(link => link.addEventListener("click", e => {
              e.preventDefault()
              new Lightbox(e.currentTarget.getAttribute("href"), gallery);
      }));
  }

  /**
   * 
   * @param {string} url  URL of the image
   * @param {string[]} images  links to the images of the Lightbox
   */

  
  constructor(url, images) {
          this.element = this.buildDOM(url);
          this.images = images;
          this.loadImage(url);
          this.onKeyUp = this.onKeyUp.bind(this);
          document.body.appendChild(this.element);
          document.addEventListener("keyup", this.onKeyUp);
  }

   /**
   * 
   * @param {string} url  URL of image
   * 
   */

   loadImage (url) {
       this.url = null;
       const image = new Image();
       const container = this.element.querySelector(".lightbox__container");
       const loader = document.createElement("div");
       loader.classList.add("lightbox__loader");
       container.innerHTML = "";
       container.appendChild(loader);
       image.onload = () => {
         container.removeChild(loader);
         container.appendChild(image);
         this.url = url;
       }
       image.src = url;
   }


  /**
  * 
  * @param {KeyboardEvent} e
  * 
  */

  onKeyUp (e) {
      if (e.key === "Escape") {
          this.close(e);
      } else if (e.key === "ArrowLeft") {
          this.prev(e);
      }else if (e.key === "ArrowRight") {
          this.next(e);
      }
  }

  /**
  * Close lightbbox
  * @param {MouseEvent/KeyboardEvent} e
  * 
  */

  close (e) {
    e.preventDefault();
    this.element.classList.add('fadeOut');
    enableBodyScroll(this.element);
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
      }, 500);
      document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
  * Close lightbbox
  * @param {MouseEvent/KeyboardEvent} e
  * 
  */

  next (e) {
      e.preventDefault();
      let i = this.images.findIndex(image => image === this.url);
      if (i === this.images.length -1){
          i = -1;
      }
      this.loadImage(this.images [i + 1]);
  }

  /**
  * Close lightbbox
  * @param {MouseEvent/KeyboardEvent} e
  * 
  */

    prev (e) {
      e.preventDefault();
      let i = this.images.findIndex(image => image === this.url);
      if (i === 0) {
          i = this.images.length;
      }
      this.loadImage(this.images [i - 1]);
  }

   /**
   * 
   * @param {string} url  url of image
   * @return {HTMLElement}
   */
   
   buildDOM (url) {
      const dom = document.createElement("div");
      dom.classList.add("lightbox");
      dom.innerHTML = `
          <button class="lightbox__close">Close</button>
          <button class="lightbox__next">Next</button>
          <button class="lightbox__prev">Prev</button>
          <div class="lightbox__container">
          <p class="galerie__title">Title</p>
          </div>`;
      dom.querySelector(".lightbox__close").addEventListener("click",
      this.close.bind(this));
      dom.querySelector(".lightbox__next").addEventListener("click",
      this.next.bind(this));
      dom.querySelector(".lightbox__prev").addEventListener("click",
      this.prev.bind(this));
      return dom;
   };
 
}

Lightbox.init();

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

    drawPhotographersHtml();
    drawPhotographersHtmlBox();
    openModal();
    likeInfo();
    incrementButton();
    dropDownMenu();
    sortBy();
    heartColor();
    // heartLike2();
    lightbox();

  })
  .catch((error) => {
    console.log(error);
  });

