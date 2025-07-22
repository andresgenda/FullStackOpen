const Person = ({ person, removePerson }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={removePerson}>delete</button>
    </div>
  );
};

export default Person;
