import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

import AddToCart from './AddToCart';


const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height:800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }

    `;


const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
        id
        title
        description
        price
        largeImage
        inventoryLevel

    }
}
`;

class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                {({error, loading, data}) => {
                    if(error) return <Error error={error} />
                    if(!data.item) return <p>The requested item could not be found or is not currently available.</p>
                    if(loading) return <p>Loading...</p>
                    const item = data.item;
                    return <SingleItemStyles>
                        <Head>
                            <title>What Wood You Want? | {item.title}</title>
                        </Head>
                        <img src={item.largeImage} alt={item.title} />
                        
                        <div className="details">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <p>{formatMoney(item.price)}</p>
                            <AddToCart id={item.id} />
                        </div>
                    </SingleItemStyles>
                }}
                
            </Query>
        );
    }
}

export default SingleItem;