import React from 'react';
import App from './App.jsx';

describe('<App />', () => {
  it('should be a div element', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.type()).to.eql('div');
  });
});
