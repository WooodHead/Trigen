/**
 * Styled container for Footer
 *
 * @namespace Footer.Wrapper
 * @memberOf Footer
  */

import styled from 'styled-components';


const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  padding: 20px 80px;
  height: 80px;
  width: 100%;

  background-color: ${props => props.theme.mainBG};

  @media (max-width: 900px) {
    position: static;
  }
`;

export default Wrapper;
