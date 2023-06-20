document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (event) => {
        const postId = event.currentTarget.getAttribute('data-id');

        fetch(`/api/user-post/${postId}`)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);

                document.querySelector('#postTitle').textContent = data.title;
                document.querySelector('#postPoster').textContent = "Poster: " + data.poster.name;
                document.querySelector('#postText').textContent = data.text;

                let postDateTime = new Date(data.posted_time);
                document.querySelector('#postTime').textContent = "Posted: " + postDateTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });


                const commentsContainer = document.querySelector('#postComments');
                commentsContainer.innerHTML = '';

                document.querySelector('#postModal').setAttribute('data-id', postId);


                data.post_comments.forEach(comment => {
                    if (!comment.user_comment || !comment.user_comment.commenter) {
                        console.error('Commenter information is missing for comment:', comment);
                        return;
                    }

                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'col mb-5 post-card card h-100';
                    commentDiv.setAttribute('data-id', comment.comment_id);

                    const commentCardBody = document.createElement('div');
                    commentCardBody.className = 'card-body p-4';
                    const commentTextCenter = document.createElement('div');
                    commentTextCenter.className = 'text-center';

                    const commentPoster = document.createElement('h6');
                    commentPoster.className = 'product_h5';
                    commentPoster.textContent = `Commenter: ${comment.user_comment.commenter.name}`;

                    const commentText = document.createElement('p');
                    commentText.className = 'product_p text';
                    commentText.textContent = comment.user_comment.text;

                    const commentPostedTime = document.createElement('p');
                    commentPostedTime.className = 'product_p';
                    let commentDateTime = new Date(comment.user_comment.posted_time);
                    commentPostedTime.textContent = `Posted: ` + commentDateTime.toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });


                    commentTextCenter.append(commentPoster, commentText, commentPostedTime);
                    commentCardBody.appendChild(commentTextCenter);
                    commentDiv.appendChild(commentCardBody);

                    commentsContainer.appendChild(commentDiv);
                });

                $('#postModal').modal('show');
            })
            .catch(error => console.error('Error:', error));
    });
});

$('#closeModalBtn').on('click', function () {
    $('#postModal').modal('hide');
});

// Fetch the session user ID
let userId;
fetch('/api/session')
    .then(response => response.json())
    .then(data => {
        userId = data.user_id; // Store the user ID for later use

        // Add event listener
        document.querySelector('#commentForm').addEventListener('submit', (event) => {
            event.preventDefault();
            const postId = document.querySelector('#postModal').getAttribute('data-id');
            const commentText = document.querySelector('#commentText').value;
            console.log(postId);

            // First, create the user comment
            fetch(`/api/user-comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: commentText, user_id: userId }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Comment submitted:', data);
                    // Then, create the post comment to link the user comment to the post
                    return fetch('/api/post-comment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            post_id: postId,
                            comment_id: data.comment_id // assuming the user comment API returns the comment with its ID
                        })
                    });
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Post comment created:', data);
                    // Optionally, you can then close the modal or refresh the comments
                    $('#postModal').modal('hide');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
