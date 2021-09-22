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
            <div class="filteredUser__btn"><button data-modal-target="#modal" id="open" class="button">Contatez-moi</button></div>
          <div class = "filteredUser__img">
            <a href="photographer-page.html?id=${filteredUser.id}"> <img id="profile" src="Documents/Sample Photos/Photographers ID Photos/${filteredUser.portrait}" class="profile"  alt=""/> </a>
          </div>`;



      //MODAL

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


      // 

      let photographerPhotos = data.media.filter((media) => {
        return media.photographerId == photographerId;
      });
      

     
      
      //ALL LIKES total 

      let totalLikes = 0;
      photographerPhotos.forEach(item => {
        totalLikes = totalLikes + item.likes;
      });
      console.log(totalLikes);

      //DROPDOWN MENU
      document.getElementById("dropdownmenu").innerHTML =
      `

      <div class="dropMenu">
          <div>
             <p>Trier par</p>
          </div>
                <div class="dropdown">
                  <button id="target2" class="dropbtn">Popularité <i class="fas fa-angle-up"></i></button>
                  <div class="dropdown-content">
                    <a href="#">Date</a>
                    <a href="#">Titre</a>
                  </div>
                </div>
      </div>          



          <div class="menuDrop">
            <p>Trier par</p>
            <select id="target" class="buttonMenu" >
                <option id="sortPop" class="buttonMenu" value="content_1">Popularité</option>
                <option id="sortDate" class="buttonMenu" value="content_2">Date</option>
                <option id="sortName" class="buttonMenu" value="content_3">Titre</option>
            <select>
          </div>
          <div id="content_1" class="sortedRes">Content 1</div>
          <div id="content_2" class="sortedRes">Content 2</div>
          <div id="content_3" class="sortedRes">Content 3</div>
      `;

 

      // //dropdown 
      document.getElementById('target').addEventListener('change', function () {
        'use strict';
          let sort = document.querySelector('.sort'),   
             target = document.getElementById(this.value);
              if (sort !== null) {
                sort.className = 'sortedRes';
              }
              if (target !== null ) {
                target.className = 'sort';
              }
          });
         

    
       // //sort MEDIA BY group  
  
      //  const sortGallery = document.querySelector(".media");

      //  const sortPop = document.getElementById("sortPop");
      //  const sortDate = document.querySelector(".sortDate");
      //  const sortName = document.querySelector(".sortName");


      //  let desc = false;
      //  sortPop.addEventListener("click", () => {
      //     let arraytitle = sortarrayBy(filteredUser,"title", desc);
      //     displayMedia(title);
      //     desc = !desc;
      //  });
      
      //  function sortarrayBy (title, sort, desc) {
      //    title.sort (function (a, b) {
      //      if(a[sort]< b[sort]) return -1;
      //      if(a[sort]> b[sort]) return 1;
      //      return 0;
      //    });
      //    if (desc) title.reverse();
      //    return title;
      //   }

        // console.log(displaySort);




      //  document.getElementById("sort__Pop").addEventListener("click",
      //  function() {
      //      document.querySelector(".modalBox").style.display = "flex";
      //  });
 


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
 
     

      // on click shows sorted by likes date and title

      // document.getElementById("sort__Pop").addEventListener("click",
      // function() {
      //   const sortedByPop = filteredUsers.sort(function (a, b){
      //       return a.likes - b.likes;
      //     })
      // });

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

      //If Else show img or video
          let mediaHtml = "";

          if (photo.hasOwnProperty("video")) {
            mediaHtml = `<video id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.video}"  alt=""/>`;
          } else {
            mediaHtml = `<img id="img" class="galerie__img" src="Documents/Sample Photos/${filteredUser.name}/${photo.image}"  alt=""/>`;
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

      //LIKES COUNTER class="INCRIMENT"
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
