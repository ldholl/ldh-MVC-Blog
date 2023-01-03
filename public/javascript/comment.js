 async function addCommentHandler(event){
    event.preventDefault();
    console.log('blah')

    const content = document.querySelector('#comment-body').value.trim();
    const post_id = document.getElementsByTagName('h2')[0].id

    console.log(content, post_id);
    if (content){
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                content,
                post_id
            }),

            headers: { 'Content-Type': 'application/json'}
        });
        if(response.ok){
            console.log('success');
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
};

document.getElementById('add-comment').addEventListener('submit', addCommentHandler);