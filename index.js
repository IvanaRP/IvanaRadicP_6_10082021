/*fetch("./FishEyeData.json")
.then(response => {
    return response.json();
})
.then(function jsonread(jsonObj){
    console.log(jsonObj)
    console.log("TOTO")
})*/



/* FETCH API WORKING*/
/*fetch("FishEyeData.json")

.then(function (response) {
    return response.json();
})

.then(function (data) {
    console.log(data);
    
}).catch(function (error) {
    console.error ("Something went wrong");
    console.error (error);
});*/



/*DISPLAY JSON IN HTML?!>!!>!>


/* FETCH API DISPLAY JSON IN HTML==== PROBLEM SHOWS OBJECT*/
 /*fetch("FishEyeData.json")
    .then(response => response.json())
    .then(data => {
        console.log(data.photographers)
        document.getElementById("myData").innerHTML =  data.photographers;
    })*/


/*function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
      mainContainer.appendChild(div);
    }
  }*/






  /* FETCH API*/
  /*function loadJSON() {
      fetch("FishEyeData.json")
      .then (function(response){
          return response.json();
      })
      .then(function(data){
          let html = "";
          data.forEach(function(photographers){
              html += `
              <li>${photographers.name} - $
              {photographers.country} </li>
              `;
          });

          document.getElementById("myData").innerHTML = html;
      })
  }*/






/* JSON AND TEMPLATE LITERALS*/


/* make constante from json photographers*/
/*const  photographers = [
    {
      "name": "Mimi Keel",
      "id": 243,
      "city": "London",
      "country": "UK",
      "tags": ["portrait", "events", "travel", "animals"],
      "tagline": "Voir le beau dans le quotidien",
      "price": 400,
      "portrait": "MimiKeel.jpg"
    },
    {
      "name": "Ellie-Rose Wilkens",
      "id": 930,
      "city": "Paris",
      "country": "France",
      "tags": ["sports", "architecture"],
      "tagline": "Capturer des compositions complexes",
      "price": 250,
      "portrait": "EllieRoseWilkens.jpg"
    },
    {
      "name": "Tracy Galindo",
      "id": 82,
      "city": "Montreal",
      "country": "Canada",
      "tags": ["art", "fashion", "events"],
      "tagline": "Photographe freelance",
      "price": 500,
      "portrait": "TracyGalindo.jpg"
    },
    {
      "name": "Nabeel Bradford",
      "id": 527,
      "city": "Mexico City",
      "country": "Mexico",
      "tags": ["travel", "portrait"],
      "tagline": "Toujours aller de l'avant",
      "price": 350,
      "portrait": "NabeelBradford.jpg"
    },
    {
      "name": "Rhode Dubois",
      "id": 925,
      "city": "Barcelona",
      "country": "Spain",
      "tags": ["sport", "fashion", "events", "animals"],
      "tagline": "Je crée des souvenirs",
      "price": 275,
      "portrait": "RhodeDubois.jpg"
    },
    {
      "name": "Marcel Nikolic",
      "id": 195,
      "city": "Berlin",
      "country": "Germany",
      "tags": ["travel", "architecture"],
      "tagline": "Toujours à la recherche de LA photo",
      "price": 300,
      "portrait": "MarcelNikolic.jpg"
    }
  ];

  

  document.getElementById("template").innerHTML = `
  
  ${photographers.map(function(profile){
      return `
      <div class="profil">
        <img class="photo" ${profile.portrait}>
        <h2 class="name"> ${profile.name}</h2>
        <h3 class="city"> ${profile.city}</h3>
        <h3 class="tagline"> ${profile.tagline}</h3>
        <h3 class="price"> ${profile.price}</h3>
        <h3 class="tags"> ${profile.tags}</h3>

      </div>
      `
  }).join("")}
`
;*/



/* FETCH API DISPLAY EVERYTHING!*/
   /*let request = new Request("FishEyeData.json");

    fetch(request).then(function(response) {
        return response.text();
    }).then(function(text) {
        document.getElementById("myData").innerHTML = text;
    });*/

    // js
   

    
    /*fetch("FishEyeData.json")
    .then(response => response.json())
    .then(data => document.getElementById("myData").innerHTML = data.photographers
    );*/


    // RADI

   


 function fetchData() {
      fetch("FishEyeData.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.photographers);
        const html = data.photographers.map(user => {
          return `
          <div class = "user">
             <a href="photographer-page.html?id=${user.id}"> <img id="profile" src="/Documents/Sample Photos/Photographers ID Photos/${user.portrait}" class="profile"  alt=""/> </a>
               <p class="id">${user.id}</p>
              <a href="photographer-page.html"> <h2 class="name">${user.name}</h2></a>
                <p class="country">${user.country}</p>
                <p class="tagline">${user.tagline}</p>
                <p class="price">${user.price}</p>
                <p class="tags">${user.tags}</p>
          </div>

          `;
        })
        .join("");
        console.log(html)
        document.querySelector("#app").innerHTML = (html)
      })
      .catch(error => {
        console.log(error);
      })
}   

   fetchData();


  // boucle=loop?
  // chaque photographer object  ?
  // deuxieme page?
