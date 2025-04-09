```json
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


All the API end point:
http://localhost:3000

User-->
/signup (POST)
/login  (POST)
/logout (POST)

Recipe-->
/registerRecipe (POST)

## A mock Api for recipeRegistrartion.
{
  "title": "Spaghetti Arrabbiata",
  "description": "A spicy Italian pasta dish made with garlic, tomatoes, and red chili peppers cooked in olive oil.",
  "category": "Dinner",
  "cuisine": "Italian",
  "difficulty": "Medium",
  "preparationTime": 15,
  "cookingTime": 20,
  "serving": 2,
  "ingredients": [
    {
      "name": "Spaghetti",
      "quantity": 200,
      "unit": "grams"
    },
    {
      "name": "Garlic",
      "quantity": 3,
      "unit": "cloves"
    },
    {
      "name": "Olive Oil",
      "quantity": 2,
      "unit": "tablespoons"
    },
    {
      "name": "Red Chili Flakes",
      "quantity": 1,
      "unit": "teaspoon"
    },
    {
      "name": "Tomato Sauce",
      "quantity": 1.5,
      "unit": "cups"
    },
    {
      "name": "Salt",
      "quantity": 0.5,
      "unit": "teaspoon"
    }
  ],
  "instructions": [
    {
      "stepNumber": 1,
      "instruction": "Boil the spaghetti in salted water until al dente. Drain and set aside."
    },
    {
      "stepNumber": 2,
      "instruction": "Heat olive oil in a pan. Add garlic and red chili flakes, sauté until fragrant."
    },
    {
      "stepNumber": 3,
      "instruction": "Add tomato sauce and let it simmer for 10 minutes."
    },
    {
      "stepNumber": 4,
      "instruction": "Add the cooked spaghetti to the sauce, toss well to coat."
    }
  ],
  "coverImage": "https://example.com/images/spaghetti.jpg",
  "tags": "Veg",
  "tasteTag": "Spicy"
}

Validation for recipe fields:


About Cookie parser Pakage:-

A "cookie parser" is a middleware in web development, particularly in Node.js and Express.js, 
that parses the "Cookie" header from HTTP requests and makes the parsed cookie data accessible 
in the request object, allowing developers to easily read and manage cookies. 




















