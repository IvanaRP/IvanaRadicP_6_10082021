// Get URL Parameters
function getParam(tags) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(tags);
}

// make variables
let allPhotographers;
let filteredPhotographers;
let allTags;
let selectedTag;

// // fetch Json data
// function fetchData() {
//   return fetch("FishEyeData.json").then((response) => {
//     return response.json();
//   });
// }

// get Tags by map
function getTags(data) {
  let tags = [];
  data.photographers.map((photographer) => {
    if (photographer.hasOwnProperty("tags")) {
      photographer.tags.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
  });
  return tags;
}

// topTags for header
function drawTagsHtml() {
  taghtml = allTags
    .map((tag) => {
      return `<div class="header__tag tagclick" aria-label="photographer categories"  onClick=filterByTag("${tag}")><p id="${tag}" class="tags" tabindex="0">#${tag}</p></div>`;
    })
    .join("");
  document.querySelector("#header__tags").innerHTML = taghtml;
}

// filter by Tags photographer
function filterByTag(tag) {
console.log(tag, selectedTag);
  if(tag == selectedTag) {
   
    filteredPhotographers = allPhotographers
 
  } 
  else {

   filteredPhotographers = allPhotographers.filter((photographer) => {
          return photographer.tags.includes(tag);
        });
  }
selectedTag = tag;


  drawPhotographersHtml();
}


// KEYBOARD EVENTS for Tag
function keyboardTag() {
  let tagsKey = document.querySelectorAll(".tags");
  // console.log(tagsKey);
  tagsKey.forEach((tagkey) => {
    // console.log("toto");
    tagkey.addEventListener("keypress", function (event) {
      // console.log("toto");
      if (event.key === "Enter"){
        event.target.click()
      }
    });
  });
}

// display Photographers cards
function drawPhotographersHtml() {
  let html = filteredPhotographers
    .map((user) => {
      let tagsHtml = user.tags
        .map((tag) => {
          return `<p onClick=filterByTag("${tag}") id="tags" class="tags"  tabindex="0">#${tag}</p>`;
        })
        .join("");
      return `
      <div class = "user" id="user">
        <a href="photographer-page.html?id=${user.id}" class="user__photoName" aria-label="photographer image ${user.name}" tabindex="0">
          <img id="profile" src="Documents/Sample Photos/Photographers ID Photos/${user.portrait}" class="profile" alt="photo of ${user.name}" role="img"/>
          <h2 class="name">${user.name}</h2>
       </a>
            <p class="location">${user.city}, ${user.country}</p>
            <p class="tagline">${user.tagline}</p>
            <p class="price">${user.price}€/jour</p>
          <div class="tags__all" id="tags">${tagsHtml}</div> 
      </div>
      `;
    })
    .join("");
  document.querySelector("#photographer__card").innerHTML = html;
}

// change color for TAGS when selected
function changeTagColor() {
  let tags = document.querySelectorAll(".tags");

  function changeColor() {
    for (var i = 0; i < tags.length; i++) {
      tags[i].classList.remove("clicked");
    }
    this.classList.add("clicked");
  }
  for (var i = 0; i < tags.length; i++) {
    tags[i].addEventListener("click", changeColor, false);
  } 
}



// fetch Json data
fetch("FishEyeData.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
  
    allPhotographers = data.photographers;
    allTags = getTags(data);
    filteredPhotographers = allPhotographers;

    drawPhotographersHtml();
    drawTagsHtml();
    changeTagColor();
    keyboardTag();
   

    photographerTag = getParam("tags");
    if (!!photographerTag){
      filterByTag(photographerTag)
    }


  })
  .catch((error) => {
    console.log(error);
  });
