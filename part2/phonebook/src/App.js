import { useState, useEffect } from 'react'

import personsService from './services/Persons'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      let updatedPerson = {...existingPerson, number: newNumber }
      if (window.confirm(`${updatedPerson.name} is already added to the phonebook, replace the old number with a new one ?`)) {
        personsService.updatePerson(updatedPerson.id, updatedPerson).then((updatedPerson) => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
        })   
      }
    } else {
      personsService.createPerson({ name: newName, number: newNumber }).then((newPerson) => {
        setPersons(persons.concat(newPerson))
      })  
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.deletePerson(id).then((() => setPersons(persons.filter(person => id !== person.id))))
    }
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App