/**
 * Creates button specific styles which can be applied to different elements/components
 *
 * @namespace Button.buttonStyles
 * @memberOf Button
  */

import { css } from 'styled-components';


const getBackground = props => {
  let color = props.theme.primary;
  let hover = props.theme.primaryHover;

  if(props.warning) {
    color = props.theme.warning;
    hover = props.theme.warningHover;
  }else if(props.secondary) {
    color = props.theme.secondary;
    hover = props.theme.secondaryHover;
  }

  return {
    color,
    hover
  };
};

const buttonStyles = css`
  display: inline-block;
  margin: 0;
  padding: 2px 10px;
  width: 100%;
  height: 30px;

  text-decoration: none;
  background-color: ${props => getBackground(props).color};
  color: ${props => props.theme.noneWhite};
  outline: 0;
  border-radius: 1px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${props => getBackground(props).hover};
  }
`;

export default buttonStyles;
