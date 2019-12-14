import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { format } from "date-fns";
import Head from "next/head";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import OrderStyles from "./styles/OrderStyles";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      billing_address_city
      billing_address_country
      billing_address_country_code
      billing_address_line1
      billing_address_state
      billing_address_zip
      billing_name
      shipping_address_city
      shipping_address_country
      shipping_address_country_code
      shipping_address_line1
      shipping_address_state
      shipping_address_zip
      shipping_name
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;



class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          const order = data.order;
          console.log(order);
          return (
            <OrderStyles>
              <Head>
                <title>What Wood You Wish - Order: {order.id}</title>
              </Head>
              <div className="address-list">
                <div>
                <span><p>Billing Information:</p></span>
                <span>{order.billing_name}<br /></span>
                <span>{order.billing_address_line1}<br /></span>
                <span>{order.billing_address_city}, {order.billing_address_state} {order.billing_address_zip}<br /></span>
                <span>{order.billing_address_country}<br /></span>
                </div><div>
                <span><p>Shipping Information:</p></span>
                <span>{order.shipping_name}<br /></span>
                <span>{order.shipping_address_line1}<br /></span>
                <span>{order.shipping_address_city}, {order.shipping_address_state} {order.shipping_address_zip}<br /></span>
                <span>{order.shipping_address_country}<br /></span>
                </div>
</div>

              <p>
                <span>Order ID: </span>
                <span>{order.id}</span>
              </p><p>
                <span>Date: </span>
                <span>{format(order.createdAt, "MMMM d, YYYY h:mm a")}</span>
              </p> 
              
              <p>
                <span>Total: </span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Item Count: </span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div className="item-details">
                      <h2>{item.title}</h2>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {formatMoney(item.price)}</p>
                      <p>Description: {item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

export default Order;
