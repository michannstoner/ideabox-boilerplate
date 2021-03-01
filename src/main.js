var loggedIdea = [];

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
  storeStar(event);
});

showStarredButton.addEventListener('click',function(event) {
  event.preventDefault();
  viewStarredIdea();
});

errorButton.addEventListener('click', logActivity);

saveButton.addEventListener('click', logActivity);

window.addEventListener('load', function(event) {
  displayCards(event);
});

function createCard() {
  var userTitle = formTitle.value;
  var userBody = formBody.value;
  var newCard = new Idea(userTitle, userBody);
  var checkTitle = formValidation(userTitle);
  var checkBody = formValidation(userBody);

  if (checkTitle || checkBody) {
    loggedIdea.push(newCard);
    cardTemplate(newCard);
  }
  clearForm();
};

function logActivity(event) {
  event.preventDefault();
  createCard();
  var localActivity = JSON.stringify(loggedIdea);
  localStorage.setItem('storedActivities', localActivity);
};

function retrieveActivities(event) {
  event.preventDefault();
  var retrieveActivity = localStorage.getItem('storedActivities');
  var userActivityList = JSON.parse(retrieveActivity);
  return userActivityList; 
};

function displayCards(event) {
  var userInfo = retrieveActivities(event);
  var updateArray = updateIdeaArray(event);
  
  if (userInfo) {
    for (var i = 0; i < userInfo.length; i++) {
      cardTemplate(userInfo[i]);
    }
  }
  return updateArray;
};

function updateIdeaArray(event) {
  if (Array.isArray(retrieveActivities(event))) {
    loggedIdea.concat(retrieveActivities(event));
  }
};

function cardTemplate(element) {
  cardContainer.innerHTML += `
      <article class="card-container" id=${element.id}>
        <div class="card-header">
          <img src="./assets/star.svg" class="star-inactive">
          <img src="./assets/delete.svg" class="card-delete">
        </div>
        <div class="body-container">
          <h2>${element.title}</h2>
          <p class="card-body">${element.body}</p>
        </div>
        <div class="comment-container">
          <img src="./assets/comment.svg" class="comment-img">
          <p class="comment-tag">Comment</p>
        </div>
      </article>
  `
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

function deleteCard(event) {
  var cardToDelete = event.target.closest('.card-container');
  
  if (event.target.classList.contains('card-delete')) {
    for (var i = 0; i < loggedIdea.length; i++) {
      if (parseInt(cardToDelete.id) === loggedIdea[i].id) {
        loggedIdea.splice(i, 1);
      }
    }
    var localActivity = JSON.stringify(loggedIdea);
    localStorage.setItem('storedActivities', localActivity);
    event.target.closest('.card-container').remove();
  }
};

function starImage(event) {
  var ideaId = event.target.parentElement.parentElement.id;
  
  if (event.target.classList.contains("star-inactive")) {
    event.target.src = "./assets/star-active.svg";
  } else {
    event.target.src = "./assets/star.svg";
  }  
  return ideaId;
};

function storeStar(event) {
  var starID = starImage(event);
  for (var i = 0; i < loggedIdea.length; i++) {
    if (parseInt(starID) === loggedIdea[i].id) {
      loggedIdea[i].isStarred = true;
    }
  }
};

function viewStarredIdea() {
// conditional for loggedIdea[i].isStarred === true 
// may be able to use cardTemp to display 
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

