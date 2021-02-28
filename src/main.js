var savedIdeas = [];
// will update to local storage 
var starredIdeas = [];

var cardContainer = document.querySelector('.card-placement');
var showStarredButton = document.querySelector('.show-starred');
var errorButton = document.querySelector('.save-button-validation');
var formBody = document.querySelector('.input-body');
var formTitle = document.querySelector('.input-title');
var saveButton = document.querySelector('.save-button');
var showAllButton = document.querySelector('.show-all');
var starredContainer = document.querySelector('.starred-container');

cardContainer.addEventListener('click', function(event) {
  deleteCard(event);
});

cardContainer.addEventListener('click', function(event) {
  updateStar(event);
});

showStarredButton.addEventListener('click',function(event) {
  event.preventDefault();
  viewStarredIdea();
});

errorButton.addEventListener('click', createCard);

saveButton.addEventListener('click', createCard);

window.addEventListener('load', function(event) {
  displayCards();
  event.preventDefault()
});

function createCard(event) {
  event.preventDefault();
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

function displayCards() {

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
};

function clearForm() {
  formTitle.value = "";
  formBody.value = "";
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

function updateStar(event) {
  var ideaId = event.target.parentElement.parentElement.id;
  
  if (event.target.classList.contains("star-inactive")) {
    event.target.src = "./assets/star-active.svg";
  } else {
    event.target.src = "./assets/star.svg";
  }  
  console.log(ideaId);
  starredIdeas.push(ideaId);
  return ideaId;
};

function viewStarredIdea() {
  console.log(starredIdeas);

  hide(showStarredButton);
  hide(cardContainer);
  show(showAllButton);
  show(starredContainer);
};

function show(element) {
  element.classList.remove('visibility-hidden');
};

function hide(element) {
  element.classList.add('visibility-hidden');
};

// function findIdeaIndex(id) {
//   for (var i = 0; i < savedIdeas.length; i++) {
//     if (parseInt(savedIdeas[i].id === parseInt(id))){
//       return i;
//     }
//   }
// };