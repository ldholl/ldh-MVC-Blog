//modal script
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
    (document.querySelectorAll('.post-modal-trigger') || []).forEach(($trigger) => {
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
  });



async function addPostHandler(event){
    event.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();

    if(title && content){
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                title,
                content
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.ok){
            document.location.replace('/')
        } else {
            alert(response.statusText)
        }
    }
};


  document.getElementById('add-post').addEventListener('submit', addPostHandler);
