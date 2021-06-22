import React, {useState} from 'react'
import SelectPerson from './components/select';
import PersonFilms from './components/personFilms';
// import AddReview from './components/addReview';
import './App.css';

function App(){
  const [personId, setPersonId] = useState(0);
  
  return (
    <div>
    <SelectPerson handleChange= {e => setPersonId(e.target.value)}/>
    <PersonFilms personId={personId}/>
    {/* <AddReview/> */}
    </div>
  )
}

export default App
