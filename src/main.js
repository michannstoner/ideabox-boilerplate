var saveButton = document.querySelector(".save-button");
var formTitle = document.querySelector('.input-title');
var formBody = document.querySelector('.input-body');
var cardContainer = document.querySelector('.card-placement');

saveButton.addEventListener('click', function(event){
  event.preventDefault();
  createCard();
});

function createCard() {
  var userTitle = formTitle.value;
  var userBody = formBody.value;
  var newCard = new Idea(userTitle, userBody);

  if (userTitle !== "" && userBody !== "") {
    cardContainer.innerHTML += `
      <article class="card-container">
        <div class="card-header">
          <img src="./assets/star.svg" class="star-inactive">
          <img src="./assets/star-active.svg" class="star-active visibility-hidden">
          <img src="./assets/delete.svg" class="card-delete">
        </div>
        <div class="body-container">
          <h2>${newCard.title}</h2>
          <p class="card-body">${newCard.body}</p>
        </div>
        <div class="comment-container">
          <img src="./assets/comment.svg" class="comment-img">
          <p class="comment-tag">Comment</p>
        </div>
      </article>
    `
  }
  clearForm();
}

function clearForm() {
  formTitle.value = "";
  formBody.value = "";
}

