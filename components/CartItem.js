import React from 'react';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid ${props=>props.theme.lightgrey};
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    img{
        width: 75px;
        margin-right: 10px;
    }
    p {
        margin: 0;
    }


`;

const CartItem = ({cartItem}) => { 
    
    if(!cartItem.item) return (
        <CartItemStyles>
            <p>I am sorry, this item is no longer available.</p>
            <RemoveFromCart id={cartItem.id}/>
            </CartItemStyles>
            
            
            );
            if(cartItem.item.inventoryLevel<1) return (
                <CartItemStyles>
                    <p>An item no longer available and has been removed from your cart</p>
                    <RemoveFromCart id={cartItem.id} delItem={true}/>
                    </CartItemStyles>
                    
                    
                    );
    return (
<CartItemStyles>
    <img src={cartItem.item.image} alt={cartItem.item.title} />
    <div className="cart-item-details">
        <p>{cartItem.item.title}</p>
        <p>{formatMoney(cartItem.item.price * cartItem.quantity)}
        {' = '}
        {cartItem.quantity} 
        &nbsp; &times; &nbsp;
        {formatMoney(cartItem.item.price)} each
        
        
        </p>
    </div>
    <RemoveFromCart id={cartItem.id}/>

    
</CartItemStyles>)};

CartItem.propTypes = {
    cartItem:PropTypes.object.isRequired,
}


export default CartItem;
