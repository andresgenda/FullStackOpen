require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Contact = require("./models/person");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("dist"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        `);
});

app.get("/api/persons/:id", (request, response) => {
  Contact.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Contact.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

/* const repeatedName = (name) => {
  const lowerName = name.toLowerCase();
  const person = persons.find((p) => p.name.toLowerCase() === lowerName);
  return person;
}; */

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Information missing" });
  } /* else if (repeatedName(body.name)) {
    return response
      .status(400)
      .json({ error: "Name already in the phonebook" });
  } */

  const person = new Contact({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedContact) => {
    response.json(savedContact);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
