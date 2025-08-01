const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://andresgenda:${password}@cluster0.vpsdbot.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length < 4) {
  Contact.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(
      `Added ${result.name} with the number ${result.number} to phonebook`
    );
    mongoose.connection.close();
  });
}
