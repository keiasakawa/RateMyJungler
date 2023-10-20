// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import MainPage from './pages/MainPage/MainPage'

/* Main Page */

it('changes the search bar when entering one char', () => {
    const component = renderer.create(
        <MainPage />
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});