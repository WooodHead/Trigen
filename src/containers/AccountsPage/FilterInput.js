import styled from 'styled-components';

import Input from './Input';


export default styled(Input)`
  display: inline-block;
  width: 100%;
  font-size: 14px;

  color: ${props => props.theme.text};
  background: ${props => props.theme.noneWhite};
`;
