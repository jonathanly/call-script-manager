import axios from 'axios'

export function saveScript({ title, businessId }) {
  return axios.post('/scripts', {
    title,
    businessId
  })
  .then(res => {
    console.log(res.data)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}

export function saveStartQuestion({ startQuestion, scriptId }) {
  return axios.post('/questions/start', {
    startQuestion,
    scriptId
  })
  .then(res => {
    console.log(res.data)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}

export function saveQuestion({ question, scriptId }) {
  return axios.post('/questions', {
    question,
    scriptId
  })
  .then(res => {
    console.log(res.data)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}

export function saveAnswer({ parentQuestionId, answerValue, nextQuestionId, scriptId }) {
  return axios.post('/answers', {
    parentQuestionId,
    answerValue,
    nextQuestionId,
    scriptId
  })
  .then(res => {
    console.log(res.data)
    return res.data
  })
  .catch(error => {
    return error
  })
}

export function getQuestionsAndAnswers(id) {
  return axios.get(`/scripts/${id}`)
  .then(res => {
    return res.data
  })
  .catch(error => {
    return error
  })
}

export function validateScriptForm({ title, businessId }) {
  title = title.trim();

  if (title.length === 0) {
    return Promise.reject(new Error('Please enter a title for your script'));
  }

  return Promise.resolve({ title, businessId });
}

export function validateStartQuestion({ startQuestion, scriptId }) {
  startQuestion = startQuestion.trim();

  if (startQuestion.length === 0) {
    return Promise.reject(new Error('Please enter a starting question for your script'));
  }

  return Promise.resolve({ startQuestion, scriptId});
}

export function validateQuestion({ question, scriptId }) {
  question = question.trim();

  if (question.length === 0) {
    return Promise.reject(new Error('Please enter a question'));
  }

  return Promise.resolve({ question, scriptId});
}
