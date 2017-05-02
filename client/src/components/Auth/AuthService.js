import axios from 'axios'
import decodeJWT from 'jwt-decode'
const localStorageKey = 'callScriptUserToken'

// Read and save token
export function readToken() {
  try {
    return localStorage.getItem(localStorageKey)
  } catch (error) {
    console.log('Error reading token: ', error)
    return null
  }
}

export function writeToken(token) {
  console.log('Token saved: ', token)
  localStorage.setItem(localStorageKey, token)
}

export function signUp({ firstName, lastName, email, password, type, businessName, businessAddress }) {
  return axios.post('/auth/register', {
    firstName,
    lastName,
    email,
    password,
    type,
    businessName,
    businessAddress
  })
  .then(res => {
    writeToken(res.data.token)
    return decodeJWT(res.data.token)
  })
  .catch(err => {
    console.log(err)
  })
}

export function signIn({ email, password }) {
  return axios.post('/auth/signin', {
    email,
    password
  })
  .then(res => {
    writeToken(res.data.token)
    return decodeJWT(res.data.token)
  })
  .catch(err => {
    console.log(err)
  })
}

export function signOut() {
  localStorage.removeItem(localStorageKey)
  return Promise.resolve(true)
}

export function getUser() {
  let user = readToken(localStorageKey)
  if (user === null)
    return null;
  console.log('Returning User')
  return decodeJWT(user)
}

export function newStaff({ firstName, lastName, email, password, type, businessId }) {
  return axios.post('/auth/staff', {
    firstName,
    lastName,
    email,
    password,
    type,
    businessId
  })
  .then(res => {
    return Promise.resolve(res.data)
  })
  .catch(err => {
    console.log(err)
  })
}

export function validateSignIn({ email, password }) {
  email = email.trim();
  password = password.trim();

  if (email.length === 0) {
    return Promise.reject(new Error('Please enter an email'));
  }

  if (password.length === 0) {
    return Promise.reject(new Error('Please enter a password'));
  }

  return Promise.resolve({ email, password });
}

export function validateStaffForm({ firstName, lastName, email, password, passwordConfirmation, businessId }) {
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  password = password.trim();
  passwordConfirmation = passwordConfirmation.trim();
  businessId = businessId.trim();

  if (firstName.length === 0) {
    return Promise.reject(new Error('Please enter a first name'));
  }

  if (lastName.length === 0) {
    return Promise.reject(new Error('Please enter a last name'));
  }

  if (email.length === 0) {
    return Promise.reject(new Error('Please enter an email'));
  }

  if (password.length === 0) {
    return Promise.reject(new Error('Please enter a password'));
  }

  if (password.length < 8) {
    return Promise.reject(new Error('Your password needs to be at least 8 characters'));
  }

  if (passwordConfirmation.length === 0) {
    return Promise.reject(new Error('Please enter your password confirmation'));
  }

  if (password !== passwordConfirmation) {
    return Promise.reject(new Error('Your passwords do not match'));
  }

  return Promise.resolve({ firstName, lastName, email, password, passwordConfirmation, businessId });
}

export function validateRegistrationForm({ firstName, lastName, email, password, passwordConfirmation, businessName, businessAddress }) {
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  password = password.trim();
  passwordConfirmation = passwordConfirmation.trim();
  businessName = businessName.trim();
  businessAddress = businessAddress.trim();

  if (firstName.length === 0) {
    return Promise.reject(new Error('Please enter a first name'));
  }

  if (lastName.length === 0) {
    return Promise.reject(new Error('Please enter a last name'));
  }

  if (email.length === 0) {
    return Promise.reject(new Error('Please enter an email'));
  }

  if (password.length === 0) {
    return Promise.reject(new Error('Please enter a password'));
  }

  if (password.length < 8) {
    return Promise.reject(new Error('Your password needs to be at least 8 characters'));
  }

  if (passwordConfirmation.length === 0) {
    return Promise.reject(new Error('Please enter your password confirmation'));
  }

  if (password !== passwordConfirmation) {
    return Promise.reject(new Error('Your passwords do not match'));
  }

  if (businessName.length === 0) {
    return Promise.reject(new Error('You need to enter a Business name'));
  }

  if (businessAddress.length === 0) {
    return Promise.reject(new Error('You need to enter a Business name'));
  }

  return Promise.resolve({ firstName, lastName, email, password, passwordConfirmation, businessName, businessAddress });
}
