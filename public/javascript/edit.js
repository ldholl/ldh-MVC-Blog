document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.edit-post-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });


//get the clickec edit button
const editButtons = document.getElementsByClassName('edit-button');
let toEdit;


function setInputs(event){
  event.preventDefault();
  toEdit = event.target.id.replace(/[^\d]/g, '');
  // toEdit.replace(/[^\d]/g, '');
  console.log(toEdit)

  //get the values of original post
  const titleContent = document.getElementById(toEdit).getElementsByTagName('p');

  const oldTitle = titleContent[0].innerHTML;
  const oldContent = titleContent[1].innerHTML;

  let titleEdit = document.getElementById('edit-title')
  let contentEdit = document.getElementById('edit-content')
  titleEdit.value = oldTitle;
  contentEdit.value = oldContent;
};

async function makeEditHandler(event){
  console.log('click')
  event.preventDefault();

  const title = document.getElementById('edit-title').value.trim();
  const content = document.getElementById('edit-content').value.trim();
  console.log(title, content)

if(title && content){
    const response = await fetch(`api/posts/${toEdit}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        content: content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
});
if(response.ok){
  document.location.replace('/dashboard');
} else {
  alert(response.statusText);
}}};


document.getElementById('edit-post-modal').addEventListener('submit', makeEditHandler)

for(let editbutton of editButtons){
  editbutton.addEventListener("click", setInputs);
};
