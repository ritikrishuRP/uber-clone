# Backend API Documentation

## Endpoints

### POST /users/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required).
  - `lastname`: A string with a minimum length of 3 characters (optional).
- `email`: A valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}

Responses
201 Created

Description: User successfully registered.
Body: A JSON object containing the authentication token and user details.
Example:

{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}

400 Bad Request

Description: Validation errors or missing required fields.
Body: A JSON object containing the validation errors.
Example:

{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "first name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be 6 character long",
      "param": "password",
      "location": "body"
    }
  ]
}

How to Use
Make a POST request to /users/register with the required fields in the request body.
Handle the response based on the status code and the response body.
Example
Using curl:

curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'