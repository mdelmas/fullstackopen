const PersonDetails = ({ person, deletePerson }) => (
  <>
    {person.name} {person.number} 
    <button onClick={() => deletePerson(person.id)}>Delete</button>
    <br/>
  </>
)

const Persons = ({ persons, deletePerson }) => (
  <p>
    { persons.map((person) => <PersonDetails key={person.id} person={person} deletePerson={deletePerson} />) }
  </p>
)

export default Persons