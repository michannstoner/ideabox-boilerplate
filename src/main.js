var saveButton = document.querySelector(".save-button");
var formTitle = document.querySelector('.input-title');
var formBody = document.querySelector('.input-body');
var errorButton = document.querySelector('.save-button-validation');

var cardContainer = document.querySelector('.card-placement');


saveButton.addEventListener('click', function(event){
  event.preventDefault();
  createCard();
});

errorButton.addEventListener('click', function(event){
  event.preventDefault();
  createCard();
});

cardContainer.addEventListener('click', updateStar);

function createCard() {
  var userTitle = formTitle.value;
  var userBody = formBody.value;
  var newCard = new Idea(userTitle, userBody);
  var checkTitle = formValidation(userTitle);
  var checkBody = formValidation(userBody);

  if (checkTitle || checkBody) {
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

function formValidation(formInput) {
  var confirmValid = false;
 
  if (formInput === "") {
    show(errorButton);
    hide(saveButton);
  } else {
    show(saveButton);
    hide(errorButton);
    confirmValid = true;
  }
  return confirmValid;
}

function clearForm() {
  formTitle.value = "";
  formBody.value = "";
}

function updateStar(event) {
  // if active update boo to true 

  if (event.target.classList.contains("star-inactive")) {
    // console.log('i made it')
    // event.target.closest("img").remove()
    event.target.classList.contains("star-inactive").add('visibility-hidden')
    // show(starActive);
    // hide(starInactive);
  }
}

function show(element) {
  element.classList.remove('visibility-hidden');
}

function hide(element) {
  element.classList.add('visibility-hidden');
}

