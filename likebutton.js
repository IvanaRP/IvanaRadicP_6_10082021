

// like data atributesHEART

const likes = document.querySelectorAll("li");

likes.forEach((like) => {
  like.addEventListener("click", addLike);
});

function addLike() {
  this.dataset.choisi = this.dataset.choisi == "true" ? "false" : "true";
  calculLike();
  calculTotalLike();
}

// let likeNumber = document.getElementById(".likeNumber");
 function calculLike(){
  const likeNumber = document.querySelectorAll('li[data-choisi="true"]').length;
  document.querySelector("#countheart").textContent = likeNumber;
}





function calculTotalLike() {
  const choseLike = Array.from(
    document.querySelectorAll('li[data-choisi="true"]')
  );

  const totalLikes = choseLike.reduce(
    (total, like) => total + Number(like.dataset.calories),
    0
  );

  document.querySelector("#totalheart").textContent = totalLikes;
}

