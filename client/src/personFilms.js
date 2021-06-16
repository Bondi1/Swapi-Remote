import React from 'react';
import {gql, useQuery} from "@apollo/client";

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

const PersonFilms = ({personId}) => {
    // Get films for one user id
  const id= personId || 'cGVvcGxlOjE=';
  const { loading, data, error } = useQuery(PERSON_QUERY, { variables: { id } })
  if (error) return <h1>Something went wrong! {error.message}</h1>
  if (loading) return <h1>Loading...</h1>
  console.log({data})
    return ( 
        <dl>
        <dt>Name</dt>
        <dd>{ data.person.name }</dd>
        
        <dt>Films</dt>
        <dd>{ data.person.filmConnection.edges.map(({ node }) => node.title).join(", ") }</dd>
  
      </dl>
     );
}
 
export default PersonFilms;