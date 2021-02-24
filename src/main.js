var saveButton = document.querySelector("save-button");
var formTitle = document.querySelector('.input-title');
var formBody = document.querySelector('.input-body');
var cardContainer = document.querySelector('.card-placement');

saveButton.addEventListener('click', createCard);

function createCard() {
  var userTitle = formTitle.value;
  var userBody = formBody.value;
  var newCard = new Idea(userTitle, userBody)

  cardContainer.innerHTML = `
    <article class="card-container">
      <div class="card-header">
        <img src="./assets/star.svg" class="star-inactive">
        <img src="./assets/star-active.svg" class="star-active visibility-hidden">
        <img src="./assets/delete.svg" class="card-delete">
      </div>
      <div class="body-container">
        <h2>Idea Box</h2>
        <p class="card-body">Idea body. Don't ever play yourself.</p>
      </div>
      <div class="comment-container">
        <img src="./assets/comment.svg" class="comment-img">
        <p class="comment-tag">Comment</p>
      </div>
    </article>
  
  `
}

