## user details:-

id 
name
email
phone
gender
country
state
password
confirm password

## A Demo json body for signUp

```json
{
  "name": "John Doe",
  "email": "johny.doe@example.com",
  "phone": "+1234567890",
  "gender": "Male",
  "country": "IN",       
  "state": "MH",       
  "password": "hashed_password_here"
}

# For Validation in fields

name ---> Cannot be empty.
email ---> Checks for valid emial && no duplicate values should be present.
phone ---> Checks for valid phone number.
gender --->  ["Male","Female","Others"] *Accept in this format*
country ---> String.
state ----> Yet to modify.
password ----> A strong password check validation.


```js
All the API end point:
http://localhost:3000

User-->
/signup (POST)
/login  (POST)
/logout (POST)