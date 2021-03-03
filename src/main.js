var loggedIdeas = [];

var cardContainer = document.querySelector('.card-placement');
var formContainer = document.querySelector('.form-container')
var formBody = document.querySelector('.input-body');
var formTitle = document.querySelector('.input-title');
var inputSearch = document.querySelector('#search-input')
var inactiveSaveButton = document.querySelector('.save-button-inactive');
var showAllButton = document.querySelector('.show-all');
var showStarredButton = document.querySelector('.show-starred');
var starredContainer = document.querySelector('.starred-container');
var validSaveButton = document.querySelector('.save-button-validation');
var searchContainer = document.querySelector('.search-card-container');

window.addEventListener('load', function(event) {
  displayCards(event);
});
cardContainer.addEventListener('click', function(event) {
  deleteCard(event);
});
cardContainer.addEventListener('click', function(event) {
  storeStar(event);
});

formTitle.addEventListener('keyup', updateSaveButton);

formBody.addEventListener('keyup', updateSaveButton);

showStarredButton.addEventListener('click',function(event) {
  event.preventDefault();
  viewStarredIdea();
});

showAllButton.addEventListener('click', function(event) {
  event.preventDefault();
  show(formContainer);
  show(cardContainer)
  show(showStarredButton);
  hide(showAllButton);
  hide(starredContainer)
});
inputSearch.addEventListener('keyup', function(event) {
  filterIdeas(event);
});
validSaveButton.addEventListener('click', logActivity);
inactiveSaveButton.addEventListener('click', function(event) {
  event.preventDefault();
});
cardContainer.addEventListener('mouseover', function(event) {
  activeDelete(event);
});
cardContainer.addEventListener('mouseout', function(event) {
  inactiveDelete(event);
});

function createCard() {
  var userTitle = formTitle.value;
  var userBody = formBody.value;
  var newCard = new Idea(userTitle, userBody);
  var checkTitle = validateInput(userTitle);
  var checkBody = validateInput(userBody);

  if (checkTitle || checkBody) {
    loggedIdeas.push(newCard);
    cardTemplate(newCard, cardContainer);
  }
  clearForm();
  return newCard;
};

function logActivity(event) {
  event.preventDefault();
  createCard();
  var localActivity = JSON.stringify(loggedIdeas);
  // // var newCard = createCard();
  // var localActivity = JSON.stringify(loggedIdea);
  localStorage.setItem('storedActivities', localActivity);
};

function retrieveActivities(event) {
  // event.preventDefault();
  var retrieveActivity = localStorage.getItem('storedActivities');
  var userActivityList = JSON.parse(retrieveActivity);
  console.log('log', userActivityList);
  return userActivityList; 
};

function displayCards(event) {
  var userInfo = retrieveActivities(event);
  updateIdeaArray(event);
  if (userInfo) {
    for (var i = 0; i < userInfo.length; i++) {
      cardTemplate(userInfo[i], cardContainer);
    }
  }
  return userInfo;
};

function updateIdeaArray(event) {
  // console.log('number 2', userActivityList);
  if (Array.isArray(retrieveActivities(event))) {
    var combinedArray = loggedIdeas.concat(retrieveActivities(event));
    loggedIdeas = combinedArray;
  }
  //write a for loop for useractivitylist.length, then push index into logged ideas array 
};

function cardTemplate(element, htmlContainer) {
  htmlContainer.innerHTML += `
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

function validateInput(userInput) {
  if (userInput !== "") {
    return true;
  } else {
    return false;
  }
};

function updateSaveButton() {
  var title = validateInput(formTitle.value); 
  var body = validateInput(formBody.value); 
  
  if (title && body) {
    show(validSaveButton);
    hide(inactiveSaveButton);
  } else {
    show(inactiveSaveButton);
    hide(validSaveButton);
  }
};  
  
function clearForm() {
  formTitle.value = "";
  formBody.value = "";
  show(inactiveSaveButton);
  hide(validSaveButton);
};

function deleteCard(event) {
  var cardToDelete = event.target.closest('.card-container');

  if (event.target.classList.contains('card-delete')) {
    event.target.closest('.card-container').remove();
    for (var i = 0; i < loggedIdeas.length; i++) {
      if (parseInt(cardToDelete.id) === parseInt(loggedIdeas[i].id)) {
        loggedIdeas.splice(i, 1);
      }
    }
  }
  var localActivity = JSON.stringify(loggedIdeas);
  localStorage.setItem('storedActivities', localActivity);
  updateIdeaArray(event);
};

function getIdeaID(event) {
  var ideaId = event.target.parentElement.parentElement.id;
  
  
  return ideaId;
}

function starImage(isStarred, event) {
  if (isStarred) {
    event.target.src = "./assets/star-active.svg";
  } else {
    event.target.src = "./assets/star.svg"
  }  
  
};

function storeStar(event) {
  var starID = getIdeaID(event);
  for (var i = 0; i < loggedIdeas.length; i++) {
    if (parseInt(starID) === loggedIdeas[i].id) {
      loggedIdeas[i].isStarred = !loggedIdeas[i].isStarred; 
      starImage(loggedIdeas[i].isStarred, event)
      //grab idea from local storage 
      //update idea isStarred
      //save back to local storage
    }
  } 
  logActivity(event);
};

function viewStarredIdea() {
  var storedIdeas = '';
  for (var i = 0; i < loggedIdeas.length; i++) {
    if (loggedIdeas[i].isStarred === true) {
      
      storedIdeas += `
       <article class="card-container" id=${loggedIdeas[i].id}>
       <div class="card-header">
         <img src="./assets/star.svg" class="star-inactive">
         <img src="./assets/delete.svg" class="card-delete">
       </div>
       <div class="body-container">
         <h2>${loggedIdeas[i].title}</h2>
        <p class="card-body">${loggedIdeas[i].body}</p>
       </div>
       <div class="comment-container">
         <img src="./assets/comment.svg" class="comment-img">
         <p class="comment-tag">Comment</p>
       </div>
     </article>
     `
    } 
  }
  starredContainer.innerHTML = storedIdeas;
  hide(showStarredButton);
  hide(formContainer);
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

function filterIdeas(event) {
  var matchingHTML = '';
  var searchTerm = event.target.value;

  for (var i = 0; i < loggedIdeas.length; i++) {
    if (loggedIdeas[i].title.includes(searchTerm) || loggedIdeas[i].body.includes(searchTerm)) {
      cardContainer.innerHTML = '';
      matchingHTML += `
      <article class="card-container" id=${loggedIdeas[i].id}>
      <div class="card-header">
        <img src="./assets/star.svg" class="star-inactive">
        <img src="./assets/delete.svg" class="card-delete">
      </div>
      <div class="body-container">
        <h2>${loggedIdeas[i].title}</h2>
        <p class="card-body">${loggedIdeas[i].body}</p>
      </div>
      <div class="comment-container">
        <img src="./assets/comment.svg" class="comment-img">
        <p class="comment-tag">Comment</p>
      </div>
    </article>
    `
    } 
  }

  if (matchingHTML.length) {
    cardContainer.innerHTML = matchingHTML;
  } 
};

function activeDelete(event) {
  if (event.target.classList.contains('card-delete')) {
    event.target.src = "./assets/delete-active.svg";
  }
};

function inactiveDelete(event) {
  if (event.target.classList.contains('card-delete')) {
    event.target.src = "./assets/delete.svg";
  }
};

