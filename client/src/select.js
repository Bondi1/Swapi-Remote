import React from 'react'
import {gql, useQuery} from "@apollo/client";

const ALL_PEOPLE = gql`
{
allPeople{
  people{
    id
    name
    created
    birthYear
    eyeColor
    gender
  }
}
}`

const SelectPerson = ({handleChange}) => {
    const { loading, data, error } = useQuery(ALL_PEOPLE);
    if (error) return <h1>Something went wrong! {error.message}</h1>
    if (loading) return <h1>Loading...</h1>
    console.log(data);
    return (  
        <select className="form-select" aria-label="select name" onChange={e => handleChange(e)}>
        {data.allPeople.people.map(personData => (
            <option key={personData.id} value={personData.id}>{personData.name} </option>
     ))}
  </select> 
    );
}
 
export default SelectPerson;