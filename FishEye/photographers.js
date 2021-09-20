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

       //TOTTAL LIKES COUNTER - for class="galerie__infoDown"
       //array of numbers

        //price     
        // const reducedPrice = filteredUsers.map((filteredUsers) =>filteredUsers.price);

        // console.log(reducedPrice);

        // const reducedPrice = filteredUsers.map(item => item.price).reduce((prev, curr) => prev + curr);
        // console.log(reducedPrice);

       

        // //likes COUNT

        // const allLikes = filteredUsers.map(item => item.likes).reduce((prev, curr) => prev + curr);
        // console.log(allLikes);

        // const reducedLikes = filteredUsers.map((filteredUser) =>filteredUser.likes);

        // console.log(reducedLikes);
          
 

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
      //BUTTON CONCTACT ME mozda izmedju?

      document.getElementById("photographer").innerHTML =
           `<div class = "filteredUser__info"> 
                <p class="id">${filteredUser.id}</p>
                <a href="photographer-page.html"> <h2 class="name">${filteredUser.name}</h2></a>
                  <p class="country">${filteredUser.country}</p>
                  <p class="tagline">${filteredUser.tagline}</p>
                  <p class="price">${filteredUser.price}</p>
                  <div class="tags__all">`+tagsHtml+`</div>
            </div> 
            <div class="filteredUser__btn"><button class="button">Contatez-moi</button></div>
          <div class = "filteredUser__img">
            <a href="photographer-page.html?id=${filteredUser.id}"> <img id="profile" src="Documents/Sample Photos/Photographers ID Photos/${filteredUser.portrait}" class="profile"  alt=""/> </a>
          </div>`;


      //sort MEDIA BY group  

      let photographerPhotos = data.media.filter((media) => {
        return media.photographerId == photographerId;
      });
      
      //ALL LIKES total 

      let totalLikes = 0;
      photographerPhotos.forEach(item => {
        totalLikes = totalLikes + item.likes;
      });
      console.log(totalLikes);

      


      
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

      //display all  MEDIA PHOTOS VIDEOS in inner html

      //make variable for MEDIAhtml VIDEO if else 

      let photoHtml = photographerPhotos
        .map((photo) => {
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
                      <div class="numberLikes" id="incrimentText">${photo.likes}</div>
                      <button class="galerie__likes" onclick="incrimentButton()" value="Increment"><i class="fas fa-heart"></i></button>
                    </div>


             </div> 

          </div>
          <div class="galerie__infoDown"> 
                 <div class="HeartLIKES">
                  <div class="numberLikes" id="incrimentText">` + totalLikes + ` </div>
                  <button class="galerie__likes" onclick="incrimentButton()" value="Increment"><i class="fas fa-heart"></i></button>
               </div>
                 <p class="galerie__infotitle">${filteredUser.price}€/jour</p>
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

//BUTTON CONCTACT ME

    // // 1. Create the button
    // let button = document.createElement("button");
    // button.innerHTML = "Contatez-moi";

    // // 2. Append somewhere
    // let body = document.getElementById("btn");
    // body.appendChild(button);

    // // 3. Add event handler

    // //get CONTACT ME BUTTON MODAL

    // document.getElementById("btn").addEventListener("click",
    //   function () {
    //     document.querySelector(".bg-modal").style.display = "flex";
    //   });


    // // 4. Close modal by X

    // document.querySelector(".button__send").addEventListener("click",
    // function () {
    //   document.querySelector(".bg-modal").style.display = "none";
    // });


    // // 5. Close modal by send button

    // document.querySelector(".close").addEventListener("click",
    // function () {
    // document.querySelector(".bg-modal").style.display = "none";
    // alert("I am an alert box!");
    // });


  //   //create BUTtONS FOR FILTER GALERY

  //   // 1. Create the button
  //   function menuButton() {
  //     let menuLikes = document.getElementById("btnLikes");
       
  //     // creating button element
  //     let buttonLikes = document.createElement('BUTTON');
       
  //     // creating text to be
  //     //displayed on button
  //     let text = document.createTextNode("Popularité");
       
  //     // appending text to button
  //     button.appendChild(text);
       
  //     // appending button to div
  //     menuLikes(.appendChild(buttonLikes);
  // }


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



// //IncrimentHEART

//       function incrimentButton() {
//         let element = document.getElementById("incrimentText");
//         let value = element.innerHTML;
//         ++value;
//         console.log(value);
//         document.getElementById("incrimentText").innerHTML = value;
//       }