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
      // let sortBy = getParam("sort"); //sort for dropdownmenu
      const filteredUsers = data.photographers.filter((user) => {
        return user.id == photographerId;
      });

      let filteredUser = filteredUsers[0];


      //ON TAG SELECT photos with tag
      let tag1 = filteredUser.tags[0];
      let tag2 = filteredUser.tags[1];
      console.log(tag1);
      console.log(tag2);



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
      //BUTTON CONCTACT ME  and popup MODAL
 
      document.getElementById("photographer").innerHTML =
           `<div class = "filteredUser__info"> 
                <p class="id">${filteredUser.id}</p>
                <a href="photographer-page.html"> <h2 class="name">${filteredUser.name}</h2></a>
                  <p class="country">${filteredUser.country}</p>
                  <p class="tagline">${filteredUser.tagline}</p>
                  <p class="price">${filteredUser.price}</p>
                  <div class="tags__all">`+tagsHtml+`</div>
            </div> 
            <div class="filteredUser__btn"><button data-modal-target="#modal" id="open" class="button">Contatez-moi</button></div>
          <div class = "filteredUser__img">
            <a href="photographer-page.html?id=${filteredUser.id}"> <img id="profile" src="Documents/Sample Photos/Photographers ID Photos/${filteredUser.portrait}" class="profile"  alt=""/> </a>
          </div>`;


      //MODAL open on CONTACT ME button
      document.getElementById("modalBox").innerHTML =
      `  <div class="modal" id="modal">
              <div class="modal-header" id="modal-header">
                <h2 class="contactName">Contactez-moi<br>${filteredUser.name}</h2>
                <button class="close-button">&times;</button>
              </div>
              <div class=modal-body>
              <form action"/" method="GET" id="form" class="form">
              
                <div class="modalplace">
                  <label for="firstname" class="firstname">Prenom</label>
                  <input id="firstname" name="firstname" class="firstname" type="text" placeholder="Prenom"  minlength="2"> 
                  <div id="error1" class="error">Veuillez entrer 2 caractères ou plus pour le champ du prenom.</div>
                </div>
                <div class="modalplace">
                  <label for="lastname" class="lastname">Nom</label>
                  <input id="lastname" name="lastname" class="lastname"type="text" placeholder="Nom" minlength="2">
                  <div id="error2" class="error">Veuillez entrer 2 caractères ou plus pour le champ du nom.</div>
                </div>
                <div class="modalplace">
                  <label for="email" class="email">E-mail</label>
                  <input id="email" name="email" type="text" class="email" placeholder="Email">
                  <div id="error3" class="error">Entrez une adresse valide. Exemple : contact@nom.com</div>
                </div>
                <div class="modalplace">
                  <label for="message" class="message">Votre message</label>
                  <input id="message" name="message" class="messageinput" type="text" placeholder="Votre message" minlength="2">
                  <div id="error4" class="error">Entrez votre message.</div>
                </div>
                <div class="modalplace">
                  <button id="send" class="button" type="submit">Envoyez</button>
                </div>
              </form>
              
              </div>
          </div>
          <div id="overlay" class="overlay"></div>
      `;
      
      document.getElementById("open").addEventListener("click",
      function() {
          document.querySelector(".modalBox").style.display = "flex";
      });

      document.querySelector(".close-button").addEventListener("click",
      function() {
          document.querySelector(".modalBox").style.display = "none";
      });

      const firstname = document.getElementById("firstname");
      const lastname = document.getElementById("lastname");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const form = document.getElementById("form");

      let mailformat = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

      let error1 = document.getElementById("error1");
      let error2 = document.getElementById("error2")
      let error3 = document.getElementById("error3")
      let error4 = document.getElementById("error4")
     
      form.addEventListener("submit", (e) => {
      /*conditin IF ELSE for FIRST name input*/
      if (firstname.value == "" || firstname.value.lenght < 2) {
        e.preventDefault();//stop form from submitting
        error1.style.display = "inline-block"
        
        return false;
      } else {
        
        error1.style.display = "none"
      }

      /*conditin IF ELSE for LAST name input*/

      if (lastname.value == "" || lastname.value.lenght < 2) {
        e.preventDefault();//stop form from submitting
        
        error2.style.display = "inline-block"
        
        return false;
      }  else {
        
        error2.style.display = "none"
      }

      /*conditin IF ELSE for EMAIL input*/

      if (!email.value.match(mailformat)){
        e.preventDefault();//stop form from submitting
        error3.style.display = "inline-block"
        return false;

      } else {
        
        error3.style.display = "none"
      }

      /*conditin IF ELSE for MESSAGE*/

      if (message.value == "" || message.value.lenght < 2) {
        e.preventDefault();//stop form from submitting
        
        error4.style.display = "inline-block"
        
        return false;
        
      }   else {
        
        alert("Merci ! Votre réservation a été reçue.")
        error4.style.display = "none"
        
      }

      });

      // Display photographer MEDIA by id
      let photographerPhotos = data.media.filter((media) => {
        return media.photographerId == photographerId;
      });
      
      // ALL LIKES total 
      let totalLikes = 0;
      photographerPhotos.forEach(item => {
        totalLikes = totalLikes + item.likes;
      });
      console.log(totalLikes);


      //ALL LIKES total 
      // let totalLikesIncr = 0;
      // photographerPhotos.forEach(item => {
      //   totalLikesIncr = totalLikesIncr + item.likes;
      // });
      // console.log(totalLikesIncr);


      

      //DROPDOWN MENU
      document.getElementById("dropdownmenu").innerHTML =
      `<div class="dropMenu">
         
             <p>Trier par</p>
                <div class="dropdown">
                  <button  class="dropbtn" id="popular">Popularité <i class="fas fa-angle-up"></i></button>
                  <div class="dropdown-content">
                    <a href="#" id="date">Date</a>
                    <a href="#" id="title">Titre</a>
                  </div>
                </div>

       </div>          
      `;
 


// filter sort button
  

// show hide div  PROMENA IMENA BUTTONA I DIV CLASSE SHOW HIDE
const btnPopular = document.getElementById("popular");
const btnDate = document.getElementById("date");
const btnTitle = document.getElementById("title");
// const galeriHIDe = document.getElementById("--media");

// btnpop.onclick = function () {
//   if (galeriHIDe.style.display == "none") {
//     galeriHIDe.style.display = "none";
//   } else {
//     galeriHIDe.style.display = "flex";
//     btnpop.innerHTML = "POP";
//   }
//   if (btnpop.innerHTML = "POP") {
//     galeriHIDe.style.display = "flex";
//   } else {
//     galeriHIDe.style.display = "none";
//     btntit.innerHTML = "title";
//   }
// };
// btntit.onclick = function () {
//   if (btnpop.innerHTML = "POP") {
//     galeriHIDe.style.display = "flex";
//   } else {
//     galeriHIDe.style.display = "none";
//     btntit.innerHTML = "title";
//   }
// };
// btndate.onclick = function () {
//   if (galeriHIDe.style.display == "none") {
//     galeriHIDe.style.display = "none";
//   } else {
//     galeriHIDe.style.display = "flex";
//     btnpop.innerHTML = "DAte";
//   }
// };

// proba addlistener sort
// const sortGaler = document.querySelector(".galerie");
// const btn = document.querySelector(".dropbtn");


// almost working

const sortedByLike = photographerPhotos.sort(function (a, b) {
  return b.likes - a.likes;
});

document.getElementById("popular").addEventListener("click", sortPopular);
document.getElementById("date").addEventListener("click", sortDate);
document.getElementById("title").addEventListener("click", sortTitle);
const sortGaler = document.getElementById("media");
// const sortedByLike = photographerPhotos.sort(function (a, b) {
//   return b.likes - a.likes;
//   console.log(sortedByLike);

function sortPopular() {
  btnPopular.innerHTML = "Date";
  // document.getElementById("galerie").innerHTML = sortedByLike;
// sortGaler.innerHTML = sortedByLike;
}
function sortDate() {
  btnPopular.innerHTML = "Popular";
}
function sortTitle() {
  btnPopular.innerHTML = "Date";
}
// console.log(sortGaler);

// function sortLike () {
//   document.getElementById(".media").innerHTML = "YOU CLICKED ME!"
// };
// console.log(sortLike);


     // //SORTED BY LIKES  WORKs!!!
//      const sortedByLike = photographerPhotos.sort(function (a, b) {
//       return b.likes - a.likes;
//  });
    //  console.log(sortedByLike);

//ADD BUTTON TO SORT !!!doesnt work
//       const btnSortPop = document.getElementById("sortPop1");
// // console.log(btnSortPop);
//       const show = document.getElementById("myId");
//       console.log(show);
//       btnSortPop.addEventListener("click", () =>{
//         show.style.display = "block"
//       });

      // const sortedByLike = photographerPhotos.sort(function(a,b){
      //     return new Date(b.date) - new Date(a.date);

      //    });

      //    btnSortPop.addEventListener("click", sortedByLike)

      // btnSortPop.addEventListener("click", () => {
      //  photographerPhotos.sort(function (a, b) {
      //     return b.likes - a.likes;
      // });


    // // //SORTED BY LIKES  WORKs!!!
    //  const sortedByLike = photographerPhotos.sort(function (a, b) {
    //       return b.likes - a.likes;
    //  });
    //  console.log(sortedByLike);

    //SORTED BY title WORKs!!!
    // const sortedByTitle = photographerPhotos.sort(function (a, b) {
    //    if (a.title < b.title)
    //     return -1;
    //     if (a.title > b.title)
    //       return 1;
    //       return 0;
    //      });
    //  console.log(sortedByTitle);
  
    // //SORTED BY DATE WORKs!!!
    
      // const sortedByDate = photographerPhotos.sort(function(a,b){
      //   return new Date(b.date) - new Date(a.date);
      // });
      // console.log(sortedByDate);



      // // //dropdown 
      // document.getElementById('target').addEventListener('change', function () {
      //   'use strict';
      //     let sort = document.querySelector('.sort'),   
      //        target = document.getElementById(this.value);
      //         if (sort !== null) {
      //           sort.className = 'sortedRes';
      //         }
      //         if (target !== null ) {
      //           target.className = 'sort';
      //         }
      //     });
       
     
      //LIKES COUNTER class="INCRIMENT"  TOP OF ALL
      document.getElementById("likesCounter").innerHTML =
      `   <div class="INCRIMENT">
              <h1 id="counter">0</h1>
              <button id="button__increase" class="galerie__likes"><i class="fas fa-heart"></i></button>
          </div>
          
      `;

      let increaseBtn = document.getElementById("button__increase");
      let counter = document.getElementById("counter");
      let count = 0;

      increaseBtn.addEventListener("click", () => {
          count ++;
          counter.innerHTML = count;
      });




      //display all LIKES DOWN RIGHT  add down  in mediaID
      document.getElementById("downright").innerHTML =
      ` <div class="galerie__infoDown"> 
            <div class="HeartLIKES">
            <div class="numberLikes" id="incrimentText">` + totalLikes + ` </div>
            <div class="galerie__likes"><i class="fas fa-heart"></i></div>
            <p class="galerie__infotitle">${filteredUser.price}€/jour</p>
        </div> 
      `;


      
    //let for 1 photo
      // let photographerPhoto = photographerPhotos[0];
      // console.log(photographerPhoto);


      //display all  MEDIA PHOTOS VIDEOS in inner html
      //make variable for MEDIAhtml VIDEO if else 
        let photoHtml = photographerPhotos
          .map((photo) => {

// all likes of [0] photographer
// let likes = photo.likes;
// console.log(likes);
 
//LIKES COUNTER class="INCRIMENT" PROBA3
// document.getElementById("likesAlone").innerHTML =
// `   <div class="HeartLIKES">
//         <div class="numberLikes" id="incrimentText3" value=${photo.likes}>${photo.likes} </div>
//         <button class="galerie__likes" onclick="incrimentButton3()" ><i class="fas fa-heart"></i></button>
//     </div> 
    
// `;




      //If Else show img or video
          let mediaHtml = "";

          if (photo.hasOwnProperty("video")) {
            mediaHtml = `<video id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.video}"  alt=""/>`;
          } else {
            mediaHtml = `<img id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.image}"  alt=""/>`;
          }
   
          return (
            ` <div class="galerie__user">
                <div class = "galerie__image">
                    <p class="pID" >${photo.id}</p>
                    <p class="photoID">${photo.photographerId}</p>
                    ` + mediaHtml + `
                    <p class="photoDate">${photo.date}</p>
                    <p class="photoPrice">${photo.price}</p>
                </div>
                <div class="galerie__info"> 
                          <p class="galerie__title">${photo.title}</p>

                         
                      <div class="LikesEACH">
                         <div class="numberLikes" id="addText" >${photo.likes} </div>
                         <button class="galerie__likes" id="incrimentText" onclick="addLikes()" ><i class="fas fa-heart"></i></button>
                      </div> 

                      <div class="HeartLIKES">
                        <div class="numberLikes" id="incrimentText" >${photo.likes} </div>
                        <button class="galerie__likes" id="incrimentText" onclick="incrimentButton()" ><i class="fas fa-heart"></i></button>
                      </div> 
                 </div> 
              </div>

          
           
          
          `);
        })
        .join("");
      document.querySelector("#media").innerHTML = photoHtml;
    })
    .catch((error) => {
      console.log(error);
    });


   
   
}

fetchData();


      // //display all LIKES DOWN RIGHT  add down  in mediaID
      // document.getElementById("likesEach").innerHTML =
      // ` <div>${likes} </div>
      // `;

    

    // COUNTER OF LIKES - IncrimentHEART TOTALLIKES
    function incrimentButton() {
      let element = document.getElementById("incrimentText");
      let value = element.innerHTML;
      ++value;
      console.log(value);
      document.getElementById("incrimentText").innerHTML = value;
    };



      // COUNTER OF LIKES - IncrimentHEART TOTALLIKES
      function addLikes() {
        let element = document.getElementById("addText");
        let value = element.innerHTML;
        ++value;
        console.log(value);
        document.getElementById("addText").innerHTML = value;
      };
  
       

      // COUNTER OF LIKES - IncrimentHEART like on each photo
      // let increaseBtn1 = document.getElementById("button__increase1");
      // let counter1 = document.getElementById("counter1");
      // let count1 = 0;
      // increaseBtn1.addEventListener("click", () => {
      //       count1 ++;
      //       counter1.innerHTML = count1;
      //  });
      //  console.log(increaseBtn1);
       

    
     
      
       
    
     


 
    // onClick = sortPhotosBy('likes'); 
    //SEARCH SORT BY LIKES
    // function sortPhotosBy(sortBy) {
    //   const urlParams = new URLSearchParams(window.location.search);
    //   urlParams.set("sort", sortBy);
    //   window.location.search = urlParams;
    // };
    


 
// // COUNTER OF LIKES - IncrimentHEART PROBA3
// function incrimentButton3() {
//   let element = document.getElementById("incrimentText3");
//   let value = element.innerHTML;
//   ++value;
//   console.log(value);
//   document.getElementById("incrimentText3").innerHTML = value;
// };