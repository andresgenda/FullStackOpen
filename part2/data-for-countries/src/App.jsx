import { useState, useEffect } from "react";
import "./App.css";
import Finder from "./components/Finder";
import countryService from "./services/countries";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [found, setFound] = useState("");

  useEffect(() => {
    countryService.getAll().then((returnedCountries) => {
      setCountries(returnedCountries);
    });
  }, []);

  const handleFinder = (event) => {
    setFound(event.target.value);
  };

  const countriesToShow =
    found === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(found.toLowerCase())
        );

  return (
    <div>
      <Finder handleFinder={handleFinder} />
      <div>
        <CountryList countriesToShow={countriesToShow} />
      </div>
    </div>
  );
}

export default App;
