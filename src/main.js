var savedIdeas = [];

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

cardContainer.addEventListener('click', function(event) {
  updateStar(event);
});

cardContainer.addEventListener('click', function(event) {
  deleteCard(event);
});

function createCard() {
  var userTitle = formTitle.value;
  var userBody = formBody.value;
  var newCard = new Idea(userTitle, userBody);
  var checkTitle = formValidation(userTitle);
  var checkBody = formValidation(userBody);

  if (checkTitle || checkBody) {
    cardContainer.innerHTML += `
      <article class="card-container" id=${newCard.id}>
        <div class="card-header">
          <img src="./assets/star.svg" class="star-inactive">
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
    savedIdeas.push(newCard);
  }
  clearForm();
};

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
};

function clearForm() {
  formTitle.value = "";
  formBody.value = "";
};


function updateStar(event) {
  if (event.target.classList.contains("star-inactive")) {
    event.target.src = "./assets/star-active.svg";
    return true;
  } else {
    event.target.src = "./assets/star.svg";
    return false;
  }  
};

function show(element) {
  element.classList.remove('visibility-hidden');
};

function hide(element) {
  element.classList.add('visibility-hidden');
};

function deleteCard(event) {
  var cardToDelete = event.target.closest('.card-container');

  if (event.target.classList.contains('card-delete')) {
    for (var i = 0; i < savedIdeas.length; i++) {
      if (parseInt(cardToDelete.id) === savedIdeas[i].id) {
        savedIdeas.splice(i, 1);
      }
        event.target.closest('.card-container').remove();
    }
  }
};
