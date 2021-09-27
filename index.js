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
      };

   

// all tags of [0] photographer
let tags0 = data.photographers[0].tags;
console.log(tags0);
let tags1 = data.photographers[1].tags;
 console.log(tags1);
let tags2 = data.photographers[2].tags;
console.log(tags2);
let tags3 = data.photographers[3].tags;
console.log(tags3);
let tags4 = data.photographers[4].tags;
console.log(tags4);
let tags5 = data.photographers[5].tags;
console.log(tags5);



// // document.getElementById(".tagclick").addEventListener("click", equals);
// let userBlock = document.getElementById("user");
// console.log(userBlock);
// function equals() {
//   if(tags0.value == tags1.value) {
//       userBlock.style.display = 'flex';
     
//   }
//   else {
//       userBlock.style.display = 'none';
      
//   }
// };
// // firstField.onkeyup = equals;
// // secField.onkeyup = equals;






// on click tag - show only photographers with  chosen tag

// function object_equals( tags0, tags1 ) {
//   if ( tags0 === tags1 ) return true;
//     // if both x and y are null or undefined and exactly the same
// }
// console.log(object_equals);


// const objectsEqual = (o1, o2) =>
//     Object.keys(o1).length === Object.keys(o2).length;

// const obj0 = tags0;
// const obj1 = tags1;
// const obj2 = tags2;
// const obj3 = tags3;
// const obj4 = tags4;
// const obj5 = tags5;
        
// console.log(objectsEqual(obj0, obj1)); // true
// console.log(objectsEqual(obj0, obj2)); // false
// console.log(objectsEqual(obj0, obj3)); // true
// console.log(objectsEqual(obj0, obj4)); // false
// console.log(objectsEqual(obj0, obj5)); // true


// try again






     
      //write InnerHTML topTags with all photographers
      const taghtml = data.photographers
        .map((user) => {
          return `
               <div class="topTags" id="tagclick" onclick="equals();">${tags(user.tags)}</div>
          `;
        })
        .join("");
      console.log(taghtml);
      document.querySelector("#topTags").innerHTML = taghtml;

      
      //write InnerHTML with all photographers
      const html = data.photographers
        .map((user) => {
          return `
          <div class = "user" id="user">
             <a href="photographer-page.html?id=${user.id}"> <img id="profile" src="Documents/Sample Photos/Photographers ID Photos/${user.portrait }" class="profile"  alt=""/> </a>
               <p class="id">${user.id}</p>
              <a href="photographer-page.html"> <h2 class="name">${user.name}</h2></a>
                <p class="country">${user.country}</p>
                <p class="tagline">${user.tagline}</p>
                <p class="price">${user.price}€/jour</p>
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



