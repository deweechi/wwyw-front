import styled from 'styled-components';

const SickButton = styled.button`
  background: peru;
  color: white;
  font-weight: 200;
  border: 10;
  border-radius: 10;
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: 0.8rem 1.5rem;
 /* transform: skew(-2deg);*/
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

export default SickButton;
