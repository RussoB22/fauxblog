document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const postId = event.target.getAttribute('data-id');

        fetch(`/api/user-post/${postId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    location.reload();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                location.reload();
            });
    });
});

const createPostForm = document.getElementById('create-post-form');

createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const text = document.getElementById('post-text').value;

    try {
        // Get user_id from server
        const userResponse = await fetch('/api/session');
        const userData = await userResponse.json();
        const user_id = userData.user_id;

        // Create post with user_id
        const formData = {
            title,
            text,
            user_id,
        };

        const response = await fetch('/api/user-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // Post created successfully
            window.location.href = '/dashboard'; // Redirect to the dashboard page
        } else {
            // Handle error response
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.querySelectorAll('.edit-post-form').forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const postId = event.target.querySelector('.edit-btn').getAttribute('data-id');

        const updatedPost = {
            title: document.querySelector('#post-title-' + postId).value,
            text: document.querySelector('#post-text-' + postId).value,
            posted_time: new Date().toISOString()
          };

        fetch(`/api/user-post/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Refresh the page
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

  

