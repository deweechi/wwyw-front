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
    mutation createOrder($token: String!, 
        $billing_address_city: String,
        $billing_address_country: String,
        $billing_address_country_code:String,
        $billing_address_line1: String,
        $billing_address_state: String,
        $billing_address_zip: String,
        $billing_name:String,
        $shipping_address_city: String,
        $shipping_address_country: String,
        $shipping_address_country_code:String,
        $shipping_address_line1: String,
        $shipping_address_state: String,
        $shipping_address_zip:String,
        $shipping_name:String,
        ) {
        createOrder(token: $token, 
        billing_address_city:$billing_address_city,    
        billing_address_country: $billing_address_country,
        billing_address_country_code: $billing_address_country_code,
        billing_address_line1: $billing_address_line1,  
        billing_address_state: $billing_address_state,
        billing_address_zip: $billing_address_zip,
        billing_name: $billing_name,
        shipping_address_city: $shipping_address_city,
        shipping_address_country: $shipping_address_country, 
        shipping_address_country_code: $shipping_address_country_code,
        shipping_address_line1: $shipping_address_line1,
        shipping_address_state: $shipping_address_state,
        shipping_address_zip: $shipping_address_zip,
        shipping_name: $shipping_name,
         ) {
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
    onToken = async (res, args, createOrder) => {
        NProgress.start();
        //console.log("on token called");
    //    console.log(res.id);
    //    console.log("response:");
    //    console.log(res);
        console.log(args.billing_address_country_code);
        console.log(args.shipping_address_country_code);
        if(!(args.billing_address_country_code=="US"&&args.shipping_address_country_code=="US")){
            console.log("NOT IN THE US");
            alert("We are sorry, currently we can only ship to the United States.");
            Router.push({
                pathname:'/index',
                
              });  
  
            } else {
        //call the mutation once the stripe token is generate

           const order = await createOrder( {
            variables: {
                token: res.id,
                billing_address_city: args.billing_address_city,
                billing_address_country: args.billing_address_country,
                billing_address_country_code: args.billing_address_country_code,
                billing_address_line1: args.billing_address_line1,
                billing_address_state: args.billing_address_state,
                billing_address_zip: args.billing_address_zip,
                billing_name: args.billing_name,
                shipping_address_city: args.shipping_address_city,
                shipping_address_country: args.shipping_address_country,
                shipping_address_country_code: args.shipping_address_country_code,
                shipping_address_line1: args.shipping_address_line1,
                shipping_address_state: args.shipping_address_state,
                shipping_address_zip: args.shipping_address_zip,
                shipping_name: args.shipping_name,
            }
        }).catch(err=> {alert(err.message)});
        
        if(order){
        //Route to the order page to give the user a summary/receipt
        Router.push({
          pathname:'/order',
          query: { id: order.data.createOrder.id },  
        });  } else {
            Router.push({
                pathname:'/index',
                
              });  
        }

    }
    }
    render() {
        return (
            <User>
                {({ data: { me}}) => (
                    <Mutation mutation={CREATE_ORDER_MUTATION}
                    refetchQueries={[{query: CURRENT_USER_QUERY}]}>
                        {(createOrder, { error, loading })=>(

                   <StripeCheckout
                   amount={calcTotalPrice(me.cart)}
                   name="WhatWoodYouWish.com"
                   description={`Order of ${totalItems(me.cart)} items.`}
                   image="/static/logo.gif"
                   stripeKey="pk_test_sBUjlA70ewXeNutvgSaoRF5b00nffGg80e"
                   currency="USD"
                   email={me.email}
                   token={(res, args) => this.onToken(res, args, createOrder)}
                   //token={console.log}
                   shippingAddress={true}
                   billingAddress={true}
                                          
                                      
                   >
                       {this.props.children}
                       </StripeCheckout>
                   )}
               </Mutation>
                )}
            </User>
        )
    }
}

export default CheckOut;