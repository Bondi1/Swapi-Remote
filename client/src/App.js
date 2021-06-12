import React from 'react'
import {gql} from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import './App.css'

const PERSON_QUERY = gql`
query($id: ID) {
  person(id:$id) {
  name
  filmConnection {
    edges {
      node {
        id
        title}
    }
  }
 }
}`

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
const Person = ({person: {name, eyeColor, birthYear, gender}}) => (
  <div className = 'Card'>
    <div>
      <h1>My Name is : {name}</h1>
      <h2>I am having {eyeColor} EyeColor</h2>
      <h2>I was born in {birthYear}</h2>
      <h2>And I am {gender}</h2>
    </div>
  </div>
)

function AllPeople() {
  const { loading, data, error } = useQuery(ALL_PEOPLE)
  if (error) return <h1>Something went wrong! {error.message}</h1>
  if (loading) return <h1>Loading...</h1>
  console.log({data})
  return (
    <main className='App'>
             <h1>Person Data</h1>
             {data.allPeople.people.map((person) => (
                 <Person key={person.id} person={person}/>
             ))}
         </main>
  )
  }

function App(){
  // Get all people data 
  const allPeopleData = AllPeople();

  // Get films for one user id
  const id='cGVvcGxlOjE=';
  const { loading, data, error } = useQuery(PERSON_QUERY, { variables: { id } })
  if (error) return <h1>Something went wrong! {error.message}</h1>
  if (loading) return <h1>Loading...</h1>
  console.log({data})
  return (
    <div>
    <dl>
      <dt>Name</dt>
      <dd>{ data.person.name }</dd>
      
      <dt>Films</dt>
      <dd>{ data.person.filmConnection.edges.map(({ node }) => node.title).join(", ") }</dd>

      <dt>All People Data</dt>
      <dd>{ allPeopleData }</dd>
    </dl>
    </div>
  )
 
}
  

export default App
