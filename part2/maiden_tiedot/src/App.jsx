import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countryList, setCountrylist] = useState([]);
  const [searchList, setSearchList] = useState(null);
  const [haku, setHaku] = useState(null);

  useEffect(() => {
    console.log("Fetching all the countries...");
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountrylist(response.data);
      });
  }, []);

  useEffect(() => {
    if (haku) {
      console.log("Scourging the list...");
      const scourge = countryList.filter((maa) =>
        maa.name.common.toLowerCase().includes(haku)
      );
      console.log(scourge);
      setSearchList(scourge);
    } else {
      setSearchList(null);
    }
  }, [haku, countryList]);

  const handleChange = (event) => {
    setHaku(event.target.value);
  };

  return (
    <div>
      Find countries: <input onChange={handleChange} />
      <Country searchList={searchList} />
    </div>
  );
};

const Country = ({ searchList }) => {
  if (searchList) {
    if (searchList.length > 10) {
      return <p>Too many matches, keep writing</p>;
    }
    if (searchList.length <= 10 && searchList.length > 1) {
      return (
        <div>
          {searchList.map((maa) => (
            <ul key={maa.capital}>{maa.name.common}</ul>
          ))}
        </div>
      );
    }
    if (searchList.length == 1) {
      const helper = searchList[0];
      console.log(helper.languages);
      return (
        <div>
          <h1>{helper.name.common}</h1>
          <p>Capital: {helper.capital}</p>
          <p>Area: {helper.area} km^2</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(helper.languages).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <img src={helper.flags.png} width="200" />
        </div>
      );
    }
  }
};

export default App;
