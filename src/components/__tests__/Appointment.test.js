import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

// covered by Application.test.js
describe("Appointment", () => {
  xit("renders without crashing", () => {
    render(<Appointment />);
  });
});
