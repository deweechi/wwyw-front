import styled from 'styled-components';

const PriceTag = styled.span`
 background: ${props => props.theme.red};
  transform: rotate(15deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 10px;

`;

export default PriceTag;
