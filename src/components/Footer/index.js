/**
 * Footer that renders some content
 *
 * @module Footer
  */

import React from 'react';

import { Link } from 'react-router';
import Wrapper from './Wrapper';


const Footer = () => {
  return (
    <Wrapper>
      <Link to="/impressum">Impressum</Link>
    </Wrapper>
  );
};

export default Footer;
