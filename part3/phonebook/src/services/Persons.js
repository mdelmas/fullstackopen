import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl)
    .then(response => response.data);

const createPerson = (newPerson) => axios.post(baseUrl, newPerson)
    .then(response => response.data);

const updatePerson = (personId, newPerson) => axios.put(`${baseUrl}/${personId}`, newPerson)
    .then(response => response.data);

const deletePerson = (personId) => axios.delete(`${baseUrl}/${personId}`);

export default { getAll, createPerson, updatePerson, deletePerson }