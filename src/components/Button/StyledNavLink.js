import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import buttonStyles from './buttonStyles';

import { surpressNoUsedVarsLinterError } from 'shared/helperFunctions';


const  NavLinkWrapper = props => {
  // pull off secondary prop to avoid react-unknown-property error
  const { secondary, warning, ...rest } = props;
  surpressNoUsedVarsLinterError(secondary, warning);

  return <NavLink {...rest} />;
};

NavLinkWrapper.propTypes = {
  secondary: PropTypes.bool,
  warning: PropTypes.bool,
};

const StyledNavLink = styled(NavLinkWrapper)`${buttonStyles}`;


export default StyledNavLink;
