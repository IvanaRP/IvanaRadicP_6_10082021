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

      //MODAL open on CONTACT ME button
      document.getElementById(
        "modalBox"
      ).innerHTML = `  <div class="modal" id="modal">
                      <div class="modal-header" id="modal-header">
                        <h2 class="contactName">Contactez-moi<br>${filteredUser.name}</h2>
                        <button class="close-button">&times;</button>
                      </div>
                      <div class=modal-body>
                      <form action"/" method="GET" id="form" class="form">
                      
                        <div class="modalplace">
                          <label for="firstname" class="firstname">Prenom</label>
                          <input id="firstname" name="firstname" class="firstname" type="text" placeholder="Prenom" minlength="2"> 
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

      document
        .querySelector(".close-button")
        .addEventListener("click", function () {
          document.querySelector(".modalBox").style.display = "none";
        });

      const firstname = document.getElementById("firstname");
      const lastname = document.getElementById("lastname");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const form = document.getElementById("form");

      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      let error1 = document.getElementById("error1");
      let error2 = document.getElementById("error2");
      let error3 = document.getElementById("error3");
      let error4 = document.getElementById("error4");

      form.addEventListener("submit", (e) => {
        /*conditin IF ELSE for FIRST name input*/
        if (firstname.value == "" || firstname.value.lenght < 2) {
          e.preventDefault(); //stop form from submitting
          error1.style.display = "inline-block";

          return false;
        } else {
          error1.style.display = "none";
        }

        //  /*conditin IF ELSE for LAST name input*/

        if (lastname.value == "" || lastname.value.lenght < 2) {
          e.preventDefault(); //stop form from submitting

          error2.style.display = "inline-block";

          return false;
        } else {
          error2.style.display = "none";
        }

        /*conditin IF ELSE for EMAIL input*/

        if (!email.value.match(mailformat)) {
          e.preventDefault(); //stop form from submitting
          error3.style.display = "inline-block";
          return false;
        } else {
          error3.style.display = "none";
        }

        /*conditin IF ELSE for MESSAGE*/

        if (message.value == "" || message.value.lenght < 2) {
          e.preventDefault(); //stop form from submitting
          error4.style.display = "inline-block";
          return false;
        } else {
          e.preventDefault(); //stop form from submitting
          alert("Merci ! Votre réservation a été reçue.");
          error4.style.display = "none";
          return true;
        }

       
      });


      //  // KEYBOARD EVENTS open modal
      //  newFunction(); 
     




      //    function newFunction() {
      //      form.addEventListener("keypress", function (event) {
      //        if (event.key === "Enter")
      //          event.preventDefault(); //stop form from submitting
      //        error1.style.display = "inline-block";

      //        return false;
      //      });
      //    }
    });
}

fetchData();
