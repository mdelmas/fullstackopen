const PersonDetails = ({ person }) => (<>{person.name} {person.number}<br/></>)

const Persons = ({ persons }) => (
  <p>
    { persons.map((person) => <PersonDetails key={person.id} person={person} />) }
  </p>
)

export default Persons