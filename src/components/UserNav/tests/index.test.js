import React from 'react';
import { shallow } from 'enzyme';

import UserNav from '../index';
import NavBar from '../NavBar';
import NavLink from 'components/NavLink';


describe('<UserNav />', () => {
  it('should render <NavBar/>', () => {
    const wrapper = shallow(<UserNav />);
    expect(wrapper.find(NavBar).length).toBe(1);
  });
});
