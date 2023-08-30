import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((person) => person.name === newName)) return alert(`${newName} is already added to phonebook`)

    setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length+1 }))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = filter ? persons.filter(person => person.name.toLowerCase().includes(filter)) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} handleNewNameChange={handleNewNameChange} 
        newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} 
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App