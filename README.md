# Interview Scheduler

A single-page application for users to book, edit, and cancel interviews in a Monday-Friday 12-5 schedule.
Built in React with extensive unit, integration, and end-to-end testing using Jest, Storybook, and Cypress.

## Features
- Pessimistic rendering during asyncronous operations (status spinner shows during saving and deleting actions)
- User is presented with a confirmation form before completing destructive operations
- Data is persisted though the app using a PostgreSQL API. 

* Edit Visual Mode:
!["Screenshot of edit mode"](https://github.com/kelsey-griffin/scheduler/blob/master/docs/edit-appointment.png)

* Saving Visual Mode:
!["Screenshot of saving mode"](https://github.com/kelsey-griffin/scheduler/blob/master/docs/async-saving-message.png)

* Confirmation Visual Mode:
!["Screenshot of delete confirmation"](https://github.com/kelsey-griffin/scheduler/blob/master/docs/confirmation-message.png)


## Technical Specifications
- React
- Webpack, Babel
- Axios
- Storybook, Webpack Dev Server, Jest, Testing Library

### Dependencies
- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React Hooks Testing Library
- React Scripts
- React Test Renderer
- @testing-library/react-hooks

## Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress Testing

```sh 
npm run cypress
```
