import Cookies from 'js-cookie';
const API_URL = process.env.REACT_APP_API_URL;

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    const token = data.token;
    const id = data.id;
    Cookies.set('jwt', token, { expires: 1 / 24 });
    Cookies.set('id', id, { expires: 1 / 24 });
    return data; 
  } else {
    throw new Error(data.message || 'Login failed');
  }
};

const signUp = async ({ email, password, name, phone, address }) => {
  const response = await fetch(`${API_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      address,
      password,
      phone,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    const token = data.token;
    Cookies.set('jwt', token, { expires: 1 / 24 });
    return data; 
  } else {
    throw new Error(data.message || 'Sign up failed');
  }
};

export default {
  login,
  signUp,
};
