import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks'
import './App.css'


const ADD_REVIEW = gql`
  mutation AddReview($type: String!) {
    review(type: $type) {
      id
      type
    }
  }
`;

const REVIEW_QUERY = gql`
  query($type: String!) {
    getReview(type: $type) {
      id
      type
    }
  }
`;

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
const Person = ({ person: { name, eyeColor, birthYear, gender } }) => (
  <div className='Card'>
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
  console.log({ data })
  return (
    <main className='App'>
      <h1>Person Data</h1>
      {data.allPeople.people.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </main>
  )
}

function AddReview() {
  let input;
  const [addReview, { data_mutation }] = useMutation(ADD_REVIEW);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addReview({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}

function App() {
  let input;
  const [addReview, { data_mutation }] = useMutation(ADD_REVIEW);

  // Get all people data 
  const allPeopleData = AllPeople();

  // Get films for one user id
  const id = 'cGVvcGxlOjE=';
  //const { loading, data, error } = useQuery(PERSON_QUERY, { variables: { id } })
  const { loading, data, error } = useQuery(REVIEW_QUERY, { variables: { type: 'a1' } })
  if (error) return <h1>Something went wrong! {error.message}</h1>
  if (loading) return <h1>Loading...</h1>
  console.log({ data })
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addReview({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Review</button>
      </form>
      {<dl>
        <dt>Name</dt>
        <dd>{data.getReview.type}</dd>
        {/* <dt>Name</dt>
        <dd>{data.person.name}</dd>

        <dt>Films</dt>
        <dd>{data.person.filmConnection.edges.map(({ node }) => node.title).join(", ")}</dd>

        <dt>All People Data</dt>
        <dd>{allPeopleData}</dd> */}
      </dl> }
    </div>
  )

}


export default App
