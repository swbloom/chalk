import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './index.jsx';

test('It renders the footer component', () => {
    const component = renderer.create(
        <Footer />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});