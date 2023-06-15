// Function to check if all required fields are filled and password matches
function checkFormValidity() {
  const inputs = form.querySelectorAll('input[required]');
  const password = document.querySelector('input[name="psw"]').value.trim();
  const passwordConfirmation = document.querySelector('input[name="psw-confirmation"]').value.trim();

  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });

  return isValid && document.getElementById('over13').checked && password === passwordConfirmation;
}

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();

  if (checkFormValidity()) {
    const fullName = document.querySelector('input[name="full-name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="psw"]').value.trim();

    if (fullName && email && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          over13: true,
          termsofservice: true,
          privatepolicyagreement: true
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Log in the user automatically
        const loginResponse = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (loginResponse.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to log in after sign-up.');
        }
      } else {
        alert('Failed to sign up.');
      }
    }
  } else {
    alert('Please fill in all required fields and make sure the passwords match.');
  }
};

// Get references to the form and submit button
const form = document.querySelector('.signup-form');
const submitButton = document.getElementById('submit-btn');

// Event listener for form submission
form.addEventListener('submit', handleSubmit);

// Event listener for form input changes
form.addEventListener('input', () => {
  submitButton.disabled = !checkFormValidity();
});
