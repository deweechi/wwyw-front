import styled from 'styled-components';

const Supreme = styled.h3`
  background: ${props => props.theme.red};
  color: white;
  display: inline-block;
  padding: 4px 5px;
  transform: skew(-2deg);
  margin: 0;
  font-size: 2rem;
`;

export default Supreme;
