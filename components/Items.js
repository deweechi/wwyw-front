import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage }  from '../config';
import LeftArea from './LeftArea';


const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}, $category:String) {
        items(where: {AND:[{inventoryLevel_gt:0},{ category: {category: $category} }]},first: $first, skip: $skip, orderBy: createdAt_DESC) {
            id
            title
            price
            description
            image
            largeImage
            inventoryLevel
            category {
                category
            }

        }
        
    }
`;

const Center = styled.div`
display: grid;
  grid-template-columns: 20vw auto;
    
  align-self: left;
  @media (max-width:400px) {
        grid-template-columns: 1fr;
    }
  
  
`;
const Left = styled.div`

`;


const ItemsList = styled.div`
text-align: center;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    
    grid-gap: 40px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    @media (max-width:400px) {
        grid-template-columns: 1fr;
    }
`;

class Items extends Component {
     render() {
        return (
            <Center>
                <Left><LeftArea /></Left>
            <div>
                              
                <Query query={ALL_ITEMS_QUERY} 
                fetchPolicy="network-only" 
                variables={{
                   skip: this.props.page * perPage - perPage,
                   
                    }}>
                    {({ data, error, loading }) => {
                        if(loading) return <p>Loading...</p>
                        if(error) return <p>Error: {error.message}</p>
                        return <ItemsList>
                            {data.items.map(item => <Item item={item} key={item.id} />)}
                        </ItemsList>
                    }}
                    
                </Query>
                <Pagination page={this.props.page} />
            </div>
            </Center>
        );
    }
}

export default Items;
export { ALL_ITEMS_QUERY };