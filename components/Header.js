
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};



const Logo = styled.h1`
    font-size: 3rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    @media (max-width: ${props => props.theme.minWidth}) {
        font-size: 0.5rem;
    }    
    a {
        padding: 0.5rem 1rem;
        background: ${props => props.theme.red};
        color: white;
        text-underline-position: uppercase;
        text-decoration: none;
    }
    @media (max-width: ${props => props.theme.maxWidth}) {
        margin: 0;
        text-align: center;
    }  
   
`;

const StyledHeader = styled.header`
    .bar {
        border-bottom: 5px solid ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        @media (max-width:${props => props.theme.maxWidth}) {
            grid-template-columns: 1fr;
            justify-content: center;
        }
    }
    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${props => props.theme.lightGrey};
    }
`;
const Sticky = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
`;

const Header = () => (
    

    <StyledHeader>
    <div className="bar">
        <Logo><Link href="/"><a>What Wood You Wish?</a></Link></Logo>
        
        <Nav />
    </div>
    <div className="sub-bar">
        <Search />

    </div>
<Cart />

    </StyledHeader>
    
)
export default Header;