// FETCH JSON and display all photographers in inner html

function fetchData() {
  fetch("FishEyeData.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.photographers);

      //make user TAG SEPARATE function + add at const html function(tags)

      function tags(tags) {
        return `
       ${tags.map(function (tag) {
           return `<p class="tags">#${tag}</p>`;
         })
         .join(" ")}
       `;
      }
     

      //make div with all tags

      const html = data.photographers
        .map((user) => {
          return `
          <div class = "user">
             <a href="photographer-page.html?id=${user.id}"> <img id="profile" src="/Documents/Sample Photos/Photographers ID Photos/${user.portrait }" class="profile"  alt=""/> </a>
               <p class="id">${user.id}</p>
              <a href="photographer-page.html"> <h2 class="name">${user.name}</h2></a>
                <p class="country">${user.country}</p>
                <p class="tagline">${user.tagline}</p>
                <p class="price">${user.price}</p>
               <div class="tags__all">${tags(user.tags)}</div>
          </div>

          `;
        })
        .join("");
      console.log(html);
      document.querySelector("#app").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchData();
