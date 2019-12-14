import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token: String!) {
        createOrder(token: $token) {
            id
            charge
            total
            items {
                id
                title
            }
           }
    }

`;

function totalItems(cart) {
    return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
  }
  


class CheckOut extends React.Component {
    onToken = async (res, createOrder) => {
        NProgress.start();
        //console.log("on token called");
        console.log(res.id);
        console.log(res);
        //call the mutation once the stripe token is generate

        const order = await createOrder( {
            variables: {
                token: res.id,
                
            }
        }).catch(err=> {alert(err.message)});

        //Route to the order page to give the user a summary/receipt
        Router.push({
          pathname:'/order',
          query: { id: order.data.createOrder.id },  
        });

    }
    render() {
        return (
            <User>
                {({ data: { me}}) => (
                    <Mutation mutation={CREATE_ORDER_MUTATION}
                    refetchQueries={[{query: CURRENT_USER_QUERY}]}>
                        {(createOrder)=>(

                   <StripeCheckout
                   amount={calcTotalPrice(me.cart)}
                   name="WhatWoodYouWish.com"
                   description={`Order of ${totalItems(me.cart)} items.`}
                   image="/static/logo.gif"
                   stripeKey="pk_test_sBUjlA70ewXeNutvgSaoRF5b00nffGg80e"
                   currency="USD"
                   email={me.email}
                   token={res => this.onToken(res, createOrder)}
                   shippingAddress={true}
                   billingAddress={true}
                   country="US"
                                      
                   >{this.props.children}</StripeCheckout>
                   )}
               </Mutation>
                )}
            </User>
        )
    }
}

export default CheckOut;