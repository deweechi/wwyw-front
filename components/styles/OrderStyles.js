import styled from 'styled-components';

const OrderStyles = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  padding: 2rem;
  border-top: 10px solid peru;
  & > p {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.offWhite};
    span {
      padding: 1rem;
      &:first-child {
        font-weight: 900;
        text-align: left;
      }
    }
  }
  .order-item {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .address-list {
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
    max-width: ${props => props.theme.maxWidth};
    padding: 1rem;
    margin: 0 auto;
    p {
      text-decoration: underline;
    }}


`;
export default OrderStyles;
