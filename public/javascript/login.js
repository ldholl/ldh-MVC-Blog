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
    (document.querySelectorAll('.signup-modal-trigger') || []).forEach(($trigger) => {
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


  async function signupFormHandler(event){
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if(username && email && password){
        const response = await fetch('/api/users', {

        method: 'post',
        body: JSON.stringify({
            username,
            email,
            password
        }),     

        headers: {'Content-Type': 'application/json'}
        });
        if(response.ok){
            console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }

    }
  };

  async function loginFormHandler(event){
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if(email && password){
        const response = await fetch('/api/users/login', {

        method: 'post',
        body: JSON.stringify({
            email,
            password
        }),     
        headers: {'Content-Type': 'application/json'}
        });
        if(response.ok){
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }

    }
  };

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler)