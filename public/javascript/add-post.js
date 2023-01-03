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