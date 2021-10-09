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


// fetch Json data 
function fetchData() {
  return fetch("FishEyeData.json")
    .then((response) => {
      return response.json();
    })
}


// get Tags by map
function getTags(data) {
  let tags = [];
  data.photographers.map(photographer => {
    if (photographer.hasOwnProperty('tags')) {
      photographer.tags.map(tag => {
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
  taghtml = allTags.map((tag) => {
    return `<div class="header__tag" id="tagclick" onClick=filterByTag("${tag}")><p id="tags" class="tags">#${tag}</p></div>`;
  }).join("");
  document.querySelector("#topTags").innerHTML = taghtml;
}


// filter by Tags photographer
function filterByTag(tag) {
  filteredPhotographers = allPhotographers.filter(photographer => {
    return photographer.tags.includes(tag);
  })
  drawPhotographersHtml();
}



// display Photographers
function drawPhotographersHtml() {
  let html = filteredPhotographers
    .map((user) => {
      let tagsHtml = user.tags.map(tag => {
        return `<p onClick=filterByTag("${tag}") id="tags" class="tags">#${tag}</p>`;
      }).join("");
      return `
      <div class = "user" id="user">
        <a href="photographer-page.html?id=${user.id}"> <img id="profile" src="Documents/Sample Photos/Photographers ID Photos/${user.portrait}" class="profile"  alt="photo of ${user.name}" role="img"/>
          <p class="id">${user.id}</p>
          <h2 class="name">${user.name}</h2>
       </a>
            <p class="country" aria-label="localité de ${user.name} est ${user.city} en ${user.country}">${user.city}, ${user.country}</p>
            <p class="tagline" aria-label="le tagline du photographe est ${user.tagline}">${user.tagline}</p>
            <p class="price" aria-label="le prix du photographe est de ${user.price} euro par jour">${user.price}€/jour</p>
          <div class="tags__all" id="tags">${tagsHtml}</div> 
      </div>
      `;
    })
    .join("");
  document.querySelector("#app").innerHTML = html;
}


// change color for TAGS
function changeTagColor(){
  let tags = document.querySelectorAll('.tags');

  function changeColor() {
      for (var i = 0; i < tags.length; i++) {
      tags[i].classList.remove('clicked');
      }
      this.classList.add('clicked');
  }
  for (var i = 0; i < tags.length; i++) {
      tags[i].addEventListener('click',changeColor,false);
  }
}  






fetchData().then((data) => {
  photographerId = getParam("tags");
  allPhotographers = data.photographers;
  allTags = getTags(data);
  filteredPhotographers = allPhotographers;

  drawPhotographersHtml();
  drawTagsHtml();
  changeTagColor();
  
})
.catch((error) => {
  console.log(error);
});;


