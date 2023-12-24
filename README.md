# User Information App

## Overview

The User Information App is a React Native mobile application designed to display user details fetched from a random-data API(https://random-data-api.com/api/users/random_user?size=80). It presents user information in a user-friendly interface and allows navigation through different user data screens.

You can download the apk from the following link (https://drive.google.com/file/d/1W42E1paKC7YZ6FAetDbo5mCR1Ky2IqsH/view?usp=sharing)

## Running the App Locally

To run the application locally, follow these steps:

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Prerequisites

- Node.js installed on your machine
- Expo CLI or React Native CLI installed globally
- Git (optional, for cloning the repository)

### Installation

1. Clone this repository to your local machine (if not downloaded).

   ```bash
   git clone <repository-url>

   ```

2. Navigate to the project directory

   ```bash
   cd user-information-app

   ```

3. Install dependencies.

   ```bash
   npm install

   ```

4. Run "npm run start". Then, you will see instructions to run on a real device or a simulator.

## Additional Notes

### Data Fetching

- The application fetches user data from the Random Data API(https://random-data-api.com/api/users/random_user?size=80).
- Ensure a stable internet connection for seamless data retrieval.

### Navigation Buttons

- Use the "Previous" and "Next" buttons to navigate between different users' details.
- The buttons are limited by the available data(i.e. 80 user) fetched from the API.
- At the very first user if previous is pressed the index goes to the last user in the array.
- Similarly is next is pressed at the 80th user the index resets to first user in the array.
