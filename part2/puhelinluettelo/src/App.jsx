import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [wantedError, setWantedError] = useState(true);

  useEffect(() => {
    //console.log("effect");
    personService.getAll().then((response) => {
      //console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  //console.log("render", persons.length, "persons");

  const showMessage = (message, error) => {
    setWantedError(error);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 15000);
  };

  const addName = (event) => {
    event.preventDefault();
    //console.log("nameadd clicked", event.target);
    const alreadyExists = persons.find((person) => {
      return person.name === newName;
    });
    if (alreadyExists) {
      if (
        window.confirm(
          `Person with name ${newName} already exists. Do you wanna change its number?`
        )
      ) {
        console.log(`Changing ${newName}'s number.`);
        const newnameObject = {
          ...alreadyExists,
          number: newNumber,
        };
        personService
          .update(newnameObject)
          .then((response) => {
            console.log(response.data);
            showMessage(`Changed ${newName}'s number to ${newNumber}.`, false);
            setPersons(
              persons.map((person) =>
                person.id !== newnameObject.id ? person : response.data
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
            showMessage(
              `Person ${newnameObject.name} was already removed from server.`,
              true
            );
            setPersons(
              persons.filter((person) => person.id !== newnameObject.id)
            );
          });
      }
      //alert(`${newName} already exists you fool!`);
      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    //Palvelin huolehtii ID kentästä
    personService.create(nameObject).then((response) => {
      //console.log(response);
      showMessage(`Created person called ${newName}.`, false);
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  const destroyPerson = (id, name) => {
    if (window.confirm(`Do you wanna delete person with name ${name}`)) {
      console.log(`Deleting person with id ${id}`);
      personService.destroy(id).then((returnedPerson) => {
        console.log(`Deleted ${returnedPerson.name}`);
        showMessage(`Deleted ${returnedPerson.name}.`, false);
        setPersons(persons.filter((person) => person.id !== returnedPerson.id));
      });
    } else {
      console.log("Canceling delete");
    }
  };

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    //console.log(event.target.value);
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
      <h1>Phonebook</h1>
      <Notification error={wantedError} message={errorMessage} />
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numberlist</h2>
      <Filter searchName={searchName} handleSearch={handleSearch} />
      <Persons namesToShow={namesToShow} destroyPerson={destroyPerson} />
    </div>
  );
};

const Notification = (props) => {
  if (props.message === null) {
    return null;
  }
  console.log(props.error);
  if (props.error === true) {
    return <div className="error">{props.message}</div>;
  } else {
    return <div className="success">{props.message}</div>;
  }
};

const PersonForm = (props) => {
  //console.log(props);
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
        <li className="person" key={person.name}>
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
