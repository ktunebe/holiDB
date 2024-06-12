const loginForm = document.getElementById('login-form')
const signupForm = document.getElementById('signup-form')

// Login

async function handleLoginFormSubmit(e) {
  e.preventDefault();
  const { email: emailInput, password: passwordInput } = e.target.elements;

  const userData = {
    email: emailInput.value,
    password: passwordInput.value
  };

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (response.status === 200) {
      location.href = '/';
    } else {
      alert('Error logging in');
    }
  } catch (err) {
    alert('Error logging in!');
  }
}

loginForm.addEventListener('submit', handleLoginFormSubmit);


// Sign up

async function handleSignupFormSubmit(e) {
  e.preventDefault();
  const { name: nameInput, email: emailInput, password: passwordInput } = e.target.elements;

  const userData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  };

  try {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (response.status === 200) {
      location.href = '/';
    } else {
      alert('Error signing up');
    }
  } catch (err) {
    alert('Error signing up!');
  }
}

signupForm.addEventListener('submit', handleSignupFormSubmit)
