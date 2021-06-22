import React from 'react'
import { gql, useMutation } from '@apollo/client';
import DisplayReview from './displayReview';

const ADD_REVIEW = gql`
  mutation AddReview($type: String!) {
    createReview(type: $type) {
      id
      type
    }
  }
`;

const AddReview = () => {
    let input;
    const [addReview] = useMutation(ADD_REVIEW);
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
          <DisplayReview/>
        </form>
      </div>
    );
}
 
export default AddReview;