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
      let sortBy = getParam("sort"); //sort for dropdownmenu
      const filteredUsers = data.photographers.filter((user) => {
        return user.id == photographerId;
      });

      let filteredUser = filteredUsers[0];

      //make user TAG SEPARATE in innerHTML
      let tagsHtml = filteredUser.tags
        .map((tag) => {
          return `
          <p class="tags">#${tag}</p>
        `;
        })
        .join("");

      

     
      //make user TAG SEPARATE in innerHTML add this  `+tagsHtml+`
      //make user div in innerHTML
      //BUTTON CONCTACT ME 

      document.getElementById("photographer").innerHTML =
           `<div class = "filteredUser__info"> 
                <p class="id">${filteredUser.id}</p>
                <a href="photographer-page.html"> <h2 class="name">${filteredUser.name}</h2></a>
                  <p class="country">${filteredUser.country}</p>
                  <p class="tagline">${filteredUser.tagline}</p>
                  <p class="price">${filteredUser.price}</p>
                  <div class="tags__all">`+tagsHtml+`</div>
            </div> 
            <div class="filteredUser__btn"><button  data-modal-target="#modal" class="button" onclick="openModalButtons()">Contatez-moi</button></div>
          <div class = "filteredUser__img">
            <a href="photographer-page.html?id=${filteredUser.id}"> <img id="profile" src="Documents/Sample Photos/Photographers ID Photos/${filteredUser.portrait}" class="profile"  alt=""/> </a>
          </div>`;



      // //createMODAL NE RADI
      // document.getElementById("modalBox").innerHTML =
      // `  <div class="modal">
      //         <div class="modalForm" id="modalForm">
      //           <h2 class="contactName">Contactez-moi<br>${filteredUser.name}</h2>
      //           <button data-close-button class="close-button">&times;</button>
      //         </div>
      //     </div>
      //     <div id="overlay"></div>
      // `;

      //   const openModalButtons = document.querySelectorAll("data-modal-target");
      //   const closeModalButtons = document.querySelectorAll("data-close-button");
      //   const overlay = document.getElementById("overlay");

      //   openModalButtons.forEach(button => {
      //     button.addEventListener("click", () => {
      //       const modal = document.querySelector(button.dataset.modalTarget)
      //       openModal(modal)
      //     })
      //   })

      // closeModalButtons.forEach(button => {
      //   button.addEventListener("click", () => {
      //     const modal = button.closest(".modal")
      //     closeModal(modal)
      //   })
      // })
      
      // function openModal(modal) {
      //   if (modal == null) return
      //   modal.classlist.add("active")
      //   overlay.classList.add("active")
      // }

      // function closeModal(modal) {
      //   if (modal == null) return
      //   modal.classlist.remove("active")
      //   overlay.classList.remove("active")
      // }



      //sort MEDIA BY group  

      let photographerPhotos = data.media.filter((media) => {
        return media.photographerId == photographerId;
      });
      
      if (sortBy) {
        photographerPhotos = photographerPhotos.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) {
            return -1;
          }
          if (a[sortBy] > b[sortBy]) {
            return 1;
          }
          return 0;
        });
      }

      console.log(photographerPhotos);


      
      //ALL LIKES total 

      let totalLikes = 0;
      photographerPhotos.forEach(item => {
        totalLikes = totalLikes + item.likes;
      });
      console.log(totalLikes);


      

      // const sortedByPop = filteredUsers.sort(function (a, b){
      //   return a.likes - b.likes;
      // })

      // console.log(sortedByPop);




      //dropdownmenu

      document.getElementById("dropdownmenu").innerHTML =
      `
          <div class="menuDrop">
            <p>Trier par</p>
           <button id="sort__Pop" class="buttonMenu" onclick="myFunctionPop()">Popularité</button>
           <button id="sort__Date" class="buttonMenu">Date</button>
          <button id="sort__Name" class="buttonMenu">Titre</button>
          </div>
      `;

      

      //display all LIKES DOWN RIGHT  add down  in mediaID
      document.getElementById("downright").innerHTML =
      ` <div class="galerie__infoDown"> 
            <div class="HeartLIKES">
            <div class="numberLikes" id="incrimentText">` + totalLikes + ` </div>
            <div class="galerie__likes"><i class="fas fa-heart"></i></div>
            <p class="galerie__infotitle">${filteredUser.price}€/jour</p>
        </div> 
      `;


      //display all  MEDIA PHOTOS VIDEOS in inner html

      //make variable for MEDIAhtml VIDEO if else 

      let photoHtml = photographerPhotos
        .map((photo) => {

        // //display all LIKES counter 
        //   let likeEvery =
        //   ` <div > 
        //         <div class="HeartLIKES">
        //         <div class="numberLikes" id="incrimentText">${photo.likes} </div>
        //         <button class="galerie__likes" onclick="incrimentButton()" value="Increment"><i class="fas fa-heart"></i></button>
        //     </div> 
        //   `;
        //   console.log(likeEvery);


        //If Else show img or video
          let mediaHtml = "";

          if (photo.hasOwnProperty("video")) {
            mediaHtml = `<video id="img" class="galerie__img" src="/Documents/Sample Photos/${filteredUser.name}/${photo.video}"  alt=""/>`;
          } else {
            mediaHtml = `<img id="img" class="galerie__img" src="/Documents/Sample Photos/${filteredUser.name}/${photo.image}"  alt=""/>`;
          }

          return (
            `
          <div class="galerie__user">
            <div class = "galerie__image">
                <p class="pID" >${photo.id}</p>
                <p class="photoID">${photo.photographerId}</p>
                ` + mediaHtml + `
                <p class="photoDate">${photo.date}</p>
                <p class="photoPrice">${photo.price}</p>
            </div>
            <div class="galerie__info"> 
                    <p class="galerie__title">${photo.title}</p>
                <div class="HeartLIKES">
                  <div class="numberLikes" id="incrimentText">${photo.likes} </div>
                  <button class="galerie__likes" onclick="incrimentButton()" value="Increment"><i class="fas fa-heart"></i></button>
                </div> 
              </div> 
          </div>
          `
          );
        })
        .join("");

      document.querySelector("#media").innerHTML = photoHtml;
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchData();

  //

    //LIKES COUNTER


    //add id="likeCount" up
    // let likeCount = document.querySelector("#likeCount");
    // function count(){
    //   likeCount.value = parseInt(likeCount.value) +1;
    // }

    //IncrimentHEART

    function incrimentButton() {
      let element = document.getElementById("incrimentText");
      let value = element.innerHTML;
      ++value;
      console.log(value);
      document.getElementById("incrimentText").innerHTML = value;
    }
    

    // function incrLikes(e) {
    //   let likes = parseInt(e.target.innerHTML);
    //   e.target.innerHTML = likes + 1;
    // }


    // onClick = sortPhotosBy('likes'); 
    //SEARCH SORT BY LIKES
    function sortPhotosBy(sortBy) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("sort", sortBy);
      window.location.search = urlParams;
    }

// //IncrimentHEART

//       function incrimentButton() {
//         let element = document.getElementById("incrimentText");
//         let value = element.innerHTML;
//         ++value;
//         console.log(value);
//         document.getElementById("incrimentText").innerHTML = value;
//       }


//menu FILTER SORT


// function myFunctionPop() {
//   likes.sort();
//   document.getElementById("media").innerHTML = likes;
// };

// const media = totalLikes;

// const sortedByPop = media.sort(function (a, b){
//   return a.likes - b.likes;
// })

// console.log(sortedByPop);




//MODAL
