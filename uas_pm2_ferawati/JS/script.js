document.addEventListener('DOMContentLoaded', getComments);

function getComments() {
    fetch('https://dummyjson.com/comments')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const commentsArray = Array.isArray(data.comments) ? data.comments : [];
            displayComments(commentsArray);
        })
        .catch(error => console.error('Error fetching or parsing data:', error));
}

function displayComments(comments) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';

    if (!Array.isArray(comments)) {
        console.error('Data received is not an array');
        return;
    }

    if (comments.length === 0) {
        console.log('No Username pos found.');
        return;
    }

    comments.forEach(comments => {
        const commentsRow = document.createElement('tr');

        const id = document.createElement('td');
        id.textContent = comments.id;

        const body = document.createElement('td');
        body.textContent = comments.body;

        const postId = document.createElement('td');
        postId.textContent = comments.postId;

        const username = document.createElement('td');
        username.textContent = comments.user.username;

        commentsRow.appendChild(id);
        commentsRow.appendChild(body);
        commentsRow.appendChild(postId);
        commentsRow.appendChild(username);

        commentsList.appendChild(commentsRow);
    });
}

function search() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    fetch('https://dummyjson.com/comments')
        .then(response => response.json())
        .then(data => {
            const commentsArray = Array.isArray(data.comments) ? data.comments : [];
            const filteredcomments = commentsArray.filter(comments => {
                return comments.user.username.toLowerCase().includes(searchTerm);
            });
            displayComments(filteredcomments);
        })
        .catch(error => console.error('Error fetching data:', error));
}