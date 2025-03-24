import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
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
    //Palvelin huolehtii ID kentästä
    personService.create(nameObject).then((response) => {
      console.log(response);
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
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

  const destroyPerson = (id, name) => {
    if (window.confirm(`Do you wanna delete person with name ${name}`)) {
      console.log(`Deleting person with id ${id}`);
      personService.destroy(id).then((returnedPerson) => {
        console.log(`Deleted ${returnedPerson.name}`);
        setPersons(persons.filter((person) => person.id !== returnedPerson.id));
      });
    } else {
      console.log("Canceling delete");
    }
    //alert(`Do you wanna delete person with name ${name}`);
  };

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
      <Persons namesToShow={namesToShow} destroyPerson={destroyPerson} />
    </div>
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

const Persons = ({ namesToShow, destroyPerson }) => {
  return (
    <ul>
      {namesToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button
            id="deleteButton"
            onClick={() => destroyPerson(person.id, person.name)}
          >
            Delete this person
          </button>
        </li>
      ))}
    </ul>
  );
};

const Filter = ({ searchName, handleSearch }) => {
  return (
    <p>
      filter names: <input value={searchName} onChange={handleSearch} />
    </p>
  );
};

export default App;
