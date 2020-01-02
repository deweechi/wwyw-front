import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

import AddToCart from './AddToCart';

  

class Item extends Component {
    render() {
        const { item } = this.props;
        return (
                         
              <ItemStyles>
                {item.image && <img src={item.image} alt={item.title} />}
               <Title>
                   <Link href={{
                       pathname: '/item',
                       query: { id: item.id },
                    }}>
                   <a>{item.title}</a>
                   </Link>
              </Title>
              <PriceTag>{formatMoney(item.price)}</PriceTag>
              <p>{item.description}</p>
              <p>{item.category.category}</p>
              <div className="buttonList">
                
               <AddToCart id={item.id} />
           
              </div>
             </ItemStyles>              
        
            
            
            );
        }
    }

Item.propTypes = {
    // item: PropTypes.shape({
    //  title: PropTypes.string.isRequired,
    //  description: PropTypes.string.isRequired,
    //  price: PropTypes.number.isRequired,
    //  })
    item: PropTypes.object.isRequired,
};

export default Item;