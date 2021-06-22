import React from 'react';
import { gql, useQuery } from '@apollo/client';


const ALL_REVIEW_QUERY = gql`
  query{
    allReviews{
    reviews{
      id
      type
    }
  }
  }
`;

const DisplayReview = () => {
    const { loading, data, error } = useQuery(ALL_REVIEW_QUERY)
    if (error) return <h1>Something went wrong! {error.message}</h1>
    if (loading) return <h1>Loading...</h1>
    console.log({ data });
    return(    
            <>
                <dl>
                <dt>Added Reviews:</dt>
                {data.allReviews.reviews.map(review => 
                (<dd key={review.id}> {review.type} </dd>))}
                </dl>
            </>);
}
 
export default DisplayReview;