# OTP Authentication Web App

Overview

This project is a minimal full-stack web application that implements **OTP-based authentication**.
Users can log in using an email/phone, verify OTP, and access a protected welcome page.



Features

* User enters email/phone
* OTP is generated and logged in server console (mock)
* User enters OTP for verification
* Successful login → redirected to Welcome page
* Invalid OTP → max 3 attempts
* After 3 wrong attempts → user blocked for 10 minutes


Architecture

Frontend (React) → Backend (Node.js + Express) → In-memory storage

* React handles UI and API calls
* Node.js handles OTP generation, validation, and token
* Data stored temporarily in server memory (no database)



OTP Strategy

* OTP: 6-digit random number
* Expiry: 5 minutes
* Max attempts: 3
* Block duration: 10 minutes
* OTP is mocked using `console.log`



Tech Stack

Frontend:

* React.js
* Axios
* React Router DOM

Backend:

* Node.js
* Express.js
* UUID (for token generation)
* CORS



API Endpoints

1. Request OTP

**POST** `/auth/request-otp`

Request:

json
{
  "identifier": "test@gmail.com"
}


Response:

json
{
  "message": "OTP sent successfully"
}


2. Verify OTP

**POST** `/auth/verify-otp`

Request:

json
{
  "identifier": "test@gmail.com",
  "otp": "123456"
}

Response:

json
{
  "token": "random-uuid-token"
}

3. Get User (Protected)

**GET** `/auth/me`

Headers:

Authorization: <token>


Response:

json
{
  "message": "Welcome user"
}

Frontend Pages

1. **Login Page**

   * Enter email/phone
   * Validation for required field

2. **OTP Verification Page**

   * Enter OTP
   * Validation (6-digit check)

3. **Welcome Page**

   * Displays message after login
   * Logout button clears token


Validations

* Email/phone required
* OTP must be 6 digits
* Error messages shown using alerts
* API error handling with try-catch



Authentication Flow

1. User enters email → requests OTP
2. OTP generated and printed in terminal
3. User enters OTP
4. Backend verifies OTP
5. Token returned and stored in localStorage
6. Token used to access protected route (`/auth/me`)
7. Logout removes token



Assumptions

* OTP is printed in console (mock implementation)
* No database is used (in-memory storage)
* Users are auto-created
* No rate limiting implemented
* Token stored in localStorage
* Simple UI (focus on functionality)



Setup Instructions

Backend

```bash
cd otp-auth
npm install
node server.js
```

Runs on: `http://localhost:5000`



Frontend

```bash
cd client
npm install
npm start
```

Runs on: `http://localhost:3000`



Testing

* APIs tested using Postman
* OTP visible in server terminal
* Wrong OTP tested for block logic
* Token tested using `/auth/me`



What This Project Demonstrates

* Full-stack development
* REST API design
* Authentication flow
* Error handling
* Basic security concepts
* Clean and readable code



Notes

* OTP delivery is mocked (as allowed in assignment)
* In production, OTP can be sent via:

  * Email: Nodemailer / SendGrid
  * SMS: Twilio / Firebase



Author

Aryan Chauhan
