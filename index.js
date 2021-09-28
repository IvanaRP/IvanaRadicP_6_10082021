
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
    return `<div class="topTags" id="tagclick" onClick=filterByTag("${tag}")><p class="tags">#${tag}</p></div>`;
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
        return `<a href="photographer-page.html?id=${user.id}"><p class="tags">#${tag}</p></a>`;
      }).join("");

      return `
      <div class = "user" id="user">
        <a href="photographer-page.html?id=${user.id}"> <img id="profile" src="Documents/Sample Photos/Photographers ID Photos/${user.portrait}" class="profile"  alt=""/> </a>
          <p class="id">${user.id}</p>
          <a href="photographer-page.html"> <h2 class="name">${user.name}</h2></a>
            <p class="country">${user.country}</p>
            <p class="tagline">${user.tagline}</p>
            <p class="price">${user.price}€/jour</p>
          <div class="tags__all">${tagsHtml}</div> 
      </div>
      `;
    })
    .join("");
  document.querySelector("#app").innerHTML = html;
}



fetchData().then((data) => {
  allPhotographers = data.photographers;
  allTags = getTags(data);
  filteredPhotographers = allPhotographers;

  drawPhotographersHtml();
  drawTagsHtml();
})
.catch((error) => {
  console.log(error);
});;