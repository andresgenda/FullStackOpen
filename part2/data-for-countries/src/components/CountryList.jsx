import Country from "./Country";

const CountryList = ({ countriesToShow }) => {
  const ctsLen = countriesToShow.length;
  if (ctsLen > 10) {
    return <p>Too many matches, please specify another filter</p>;
  } else if (ctsLen < 11 && ctsLen > 1) {
    return countriesToShow.map((country, index) => {
      return (
        <div key={index}>
          <p>{country.name.common}</p>
        </div>
      );
    });
  } else if (ctsLen === 1) {
    return <Country currCountry={countriesToShow[0]} />;
  }
};

export default CountryList;
