import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import Nav from './nav';
import Login from './login';
import Logout from './logout';
let NavComponent = Nav.WrappedComponent


describe('<Nav Component/>', () => {
  let navWrapper

  it('renders <Login /> component when user prop is not passed in', () => {
    navWrapper = shallow(
      <NavComponent user="" />
    )
    expect(navWrapper.find(Login)).to.have.lengthOf(1);
  });

  it('renders <Logout /> component when user prop is passed in', () => {
    let userExample = {id: 1}
    navWrapper = shallow(
      <NavComponent user={userExample} />
    )
    expect(navWrapper.find(Logout)).to.have.lengthOf(1);

  });
});

