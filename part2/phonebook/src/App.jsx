import { useState, useEffect } from "react";
import personService from "./services/persons";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFilter] = useState("");
  const [confirmedMessage, setConfirmedMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const person = persons.find(({ name }) => name === newName);

    if (person != undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...person, number: newNumber };
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === person.id ? returnedPerson : p))
            );
          })
          .catch((error) => {
            setConfirmedMessage(
              `Information of '${person.name}' has already been removed from server`
            );
            setTimeout(() => {
              setConfirmedMessage(null);
            }, 5000);
            setErrorMessage(true);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setConfirmedMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setConfirmedMessage(null);
          }, 5000);
          setErrorMessage(false);
        })
        .catch((error) => {
          setConfirmedMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setConfirmedMessage(null);
          }, 5000);
          setErrorMessage(true);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const removePerson = ({ name, id }) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filtered.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confirmedMessage} errorStyle={errorMessage} />
      <Filter handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        nameChange={handleNameChange}
        newNumber={newNumber}
        numberChange={handleNumberChange}
        submit={addPerson}
      />
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person, index) => (
          <Person
            key={index}
            person={person}
            removePerson={() => removePerson(person)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
