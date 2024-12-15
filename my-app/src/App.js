import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [name, setName] = useState('');
  const [datetime,setDateTime] = useState('')
  const [description, setDescription] = useState('')
  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = "http://localhost:4040/api/transaction";
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        price,
        name: name.substring(price.length+1),
        description,
        datetime,
      })
    }).then(response => {
      response.json().then( json => {
        setName('')
        setDateTime('')
        setDescription('')
        console.log('result', json)
      })
    })
    console.log(url); // Should print "http://localhost:4040"
    // fetch(url)
  }
  return (
    <main>
      <h1>$400<span>.00</span></h1>
        <form onSubmit={addNewTransaction}>
          <div className = 'basic'>
            <input type="text"
                    value = {name}
                    onChange = {ev => setName(ev.target.value)}
                    placeholder = {'+200 new samsung tv'}/>
          <input value = {datetime}
                onChange = {ev => setDateTime(ev.target.value)}
                type="datetime-local"/>
          </div>
          <div className = "description">
          <input type="text"
                  value = {description}
                  onChange = {ev => setDescription(ev.target.value)}
          placeholder = {'description'}/>
          </div>
          <button type = "submit">Add new transaction</button>
        </form>
        <div className ="transactions">
          <div className ="transaction">
            <div className = "left">
              <div className = "name" >New Samsung TV</div>
              <div className = "description">Needed a new tv</div>
            </div>
            <div className = "right">
              <div className = "price red">-$500</div>
              <div className = "datetime">2022-12-18 15:45</div>
            </div>
          </div>
          <div className ="transaction">
            <div className = "left">
              <div className = "name" >Gig Job Website</div>
              <div className = "description">Hired to make website for client</div>
            </div>
            <div className = "right">
              <div className = "price green">+$400</div>
              <div className = "datetime">2022-12-18 15:45</div>
            </div>
          </div>
          <div className ="transaction">
            <div className = "left">
              <div className = "name" >iPhone</div>
              <div className = "description">Needed a new phone</div>
            </div>
            <div className = "right">
              <div className = "price red">-$900</div>
              <div className = "datetime">2022-12-18 15:45</div>
            </div>
          </div>
        </div>
    </main>
  );
}

export default App;
