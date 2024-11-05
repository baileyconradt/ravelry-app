import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
var base64 = require('base-64');

function App() {
  const [data, setData] = useState({});
  let patterns = <></>

  useEffect(() => {


    let url = 'https://api.ravelry.com/patterns/search.json';
    let username = process.env.REACT_APP_USERNAME;
    let password = process.env.REACT_APP_PASSWORD;
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    fetch(url, {
      method: 'GET',
      headers: headers,
    }).then((res) => res.json())
      .then((json) => {
        console.log(json)
        setData(json);
      });

  }, []);

  if (data && data.patterns) {
    console.dir(data.patterns)
    patterns = data.patterns.map((pattern) =>
      <>
        <div className="card">
          <p>{pattern.id}</p>
          <p>{pattern.name}</p>
        </div>
      </>
    )
  }

  return (
    <div className="App">
      <header className="App-header">

        {patterns}

        {/* <>{JSON.stringify(data)}</> */}
      </header>
    </div>
  );
}

export default App;
