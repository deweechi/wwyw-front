import Link from "next/link";
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";
import CartCount from './CartCount';


function checkMe(me) {
  if (me) {
    if(me.permissions) {
      if(me.permissions.includes('ADMIN')) {
        return true;
      }
    }
  }
  return false;
}



const Nav = () => (
  
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          
          <a>Shop</a>
        </Link>
        
        {me && (
           <>
          
        <Link href="/orders">
        <a>My Account</a>
      </Link>
        
      <Signout />
      <Mutation mutation={TOGGLE_CART_MUTATION}>
        {(toggleCart)=>(
          <button onClick={toggleCart}>View Cart
      <CartCount count={me.cart.reduce((tally, cartItem)=>tally + cartItem.quantity, 0)}></CartCount></button>

        )}
      </Mutation>
    </>
        )}
        {!me && (
          <Link href="/signup">
          <a>Sign in</a>
        </Link>
        )}
        {checkMe(me) && (
          <Link href="/sell">
          <a>Sell</a>
        </Link>
               
        )
        }
      </NavStyles>
    )}
  </User>
     
);

export default Nav;
