import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addName = (event) => {
    event.preventDefault();
    console.log("nameadd clicked", event.target);
    const alreadyExists = persons.find((person) => {
      console.log(person.name);
      return person.name === newName;
    });
    if (alreadyExists) {
      alert(`${newName} already exists you fool!`);
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(nameObject));
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };

  const namesToShow = persons.filter((person) =>
    person.name.includes(searchName)
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Filter searchName={searchName} handleSearch={handleSearch} />
      <Persons namesToShow={namesToShow} />
    </div>
  );
};

const Filter = ({ searchName, handleSearch }) => {
  //console.log("what??", searchName, handleSearch);
  return (
    <p>
      filter names: <input value={searchName} onChange={handleSearch} />
    </p>
  );
};

const PersonForm = (props) => {
  console.log(props);
  return (
    <div>
      <h2>Add new name</h2>
      <form onSubmit={props.addName}>
        <div>
          name:{" "}
          <input value={props.newName} onChange={props.handleNameChange} />
          number:{" "}
          <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = ({ namesToShow }) => {
  return (
    <ul>
      {namesToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default App;
