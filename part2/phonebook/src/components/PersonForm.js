const PersonForm = ({newName, handleNewNameChange, newNumber, handleNewNumberChange, addPerson}) => (
  <form>
    <div>
      name: <input value={newName} onChange={handleNewNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNewNumberChange} />
    </div>
    <div>
      <button type="submit" onClick={addPerson}>add</button>
    </div>
  </form>
)
  
export default PersonForm  