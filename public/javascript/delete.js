const buttons = document.getElementsByClassName('delete-button');

async function deletePostHandler(event){
    event.preventDefault();
    console.log('click')
    const toDelete = event.target.id;
    toDelete.replace(/[^\d]/g, '');
    console.log(toDelete);

    const response = await fetch(`api/posts/${toDelete}`, {
        method: 'DELETE'
    });
    if (response.ok){
        document.location.reload('/dashboard')
    }
}


for(let button of buttons ){
    button.addEventListener("click", deletePostHandler);
}


