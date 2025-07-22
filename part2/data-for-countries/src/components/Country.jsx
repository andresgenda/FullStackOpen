const Country = ({ currCountry }) => {
  const languages = [];
  for (const lang in currCountry.languages) {
    languages.push(currCountry.languages[lang]);
  }
  const flag = currCountry.flags.png;
  const altFlag = currCountry.flags.alt;

  return (
    <div>
      <h1>{currCountry.name.common}</h1>
      <p>{currCountry.capital}</p>
      <p>{currCountry.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <img src={flag} alt={altFlag} />
    </div>
  );
};

export default Country;
