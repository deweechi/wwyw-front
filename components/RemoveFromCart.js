import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveButton = styled.button`
  font-size: 2rem;
  background: black;
  color: white;

  border: 0;
  &:hover {
    background: red;
    color: black;
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    delItem: PropTypes.bool
  };
  //called after the mutation
  update = (cache, payload) => {
    //read the cache
    const data = cache.readQuery({ query: CURRENT_USER_QUERY});
    //remove the item from the cart
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem =>
        cartItem.id !== cartItemId);
    //add back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data});
  };

  render() {
    return (
      <Mutation 
      mutation={REMOVE_FROM_CART_MUTATION} 
      variables={{id: this.props.id, delItem:this.props.delItem}}
      update={this.update}
      optimisticResponse={{
          __typename: 'Mutation',
          removeFromCart: {
              __typename: 'cartItem',
              id: this.props.id,
          },
      }}>
        {(removeFromCart, { loading, error }) => (
          <RemoveButton 
          disabled={loading}
          onClick={()=>{
              removeFromCart().catch(err=>alert(err.message));
          }} title="Remove Item">{this.props.delItem ? "OK": "X"}</RemoveButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
