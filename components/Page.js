import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from '../components/Header';
import Meta from '../components/Meta';

const theme = {
  red: 'peru',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1600px',
  mixWidth: '600px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  
};

injectGlobal`
@font-face {
  font-family: 'Muli';
  src: url('/static/Muli-VariableFont_wght.ttf')format('ttf');
  font-weight: normal;
  font-style: normal;
}
  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin:0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Muli';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }

`;

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends Component {
    render() {
        return (
           <ThemeProvider theme={theme}>
                <StyledPage>
                <Meta />
                <Header />
                <Inner>{this.props.children}</Inner>
            </StyledPage>
           </ThemeProvider>
        );
    }
}

export default Page;