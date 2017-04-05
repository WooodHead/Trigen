/**
  * A simple styled controlled input element
  *
  * @namespace Input
  */

import React from 'react';
import styled from 'styled-components';


const StyledInput = styled.input`
  display: block;
  margin: 0 0 15px 0;
  padding: 5px 10px;
  width: 100%;
  height: 35px;

  border: 1px solid ${props => props.error ? props.theme.warning : props.theme.outlines};
  border-radius: 1px;
  background: ${props => props.theme.noneWhite};
  color: ${props => props.theme.text};

  outline: 0;

  &:placeholder-shown,
  &:-ms-input-placeholder {
    color: ${props => props.theme.outlines};
  }
`;

// Has to be a class component so refs can be used for focus
class Input extends React.Component {
  render() {
    return (
      <StyledInput {...this.props} />
    );
  }
}

export default Input;
