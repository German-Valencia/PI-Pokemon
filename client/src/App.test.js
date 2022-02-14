/* import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 */

/* 
import { render, screen } from "@testing-library/react";
import App from "./App"; */
import LandingPage from "../src/components/LandingPage/LandingPage";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);

//   expect(linkElement).toBeInTheDocument();
// });

describe("<LangindPage />", () => {
  let land;

  beforeEach(() => {
    land = shallow(<LandingPage />);
  });

  it('Debería rederizar un "h1" con el texto "Welcome---"', () => {
    expect(land.find("h1").at(0).text()).toEqual(
      "Welcome to Henry's Pokemon App..."
    );
  });

  it('Debería renderizar un "button"', () => {
    expect(land.find("button").text()).toEqual("Start");
  });
});