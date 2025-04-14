```js
findOne ---> gives the document which matches the query.
<br/>


const isPasswordValid = await bcrypt.compare(password, userDetailsFromDB.password);

This line is using bcrypt (a password hashing library) to compare a plain-text password (entered by the user) with a hashed password (stored in the database).

```json
const token = await jwt.sign(
  { _id: userDetailsFromDB._id },
  "RECIPE@APP$9988",
  { expiresIn: '1h' }
);
```

This line creates a JWT token for the authenticated user using their _id, a secret key, and an expiration time.


res.cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });  (1 day)

This line sets a cookie named "token" in the user's browser with the JWT token you created earlier.


Status Code	Name	When to Use

200 OK	-Success	-General success for GET, PUT, DELETE requests
201 Created	-Resource Created	-Successfully created a resource (e.g., POST)
204 No Content	-Empty Success	-Request successful, but no content to return
400 Bad Request	-Invalid Request	-Client sent bad input or malformed data
401 Unauthorized	-Auth Required	-Missing or invalid authentication (e.g., no token)
403 Forbidden	Access Denied	Authenticated but not authorized to access the resource
404 Not Found	Resource Missing	Resource not found (invalid URL or ID)
409 Conflict	Duplicate / Conflict	Conflict with current resource state (e.g., email already exists)
422 Unprocessable Entity	Validation Failed	Input format is correct but business rules failed
500 Internal Server Error	Server Crash	Unexpected error occurred on the server
503 Service Unavailable	Server Down	Server is temporarily overloaded or under maintenance

About Cookie parser Pakage:-

A "cookie parser" is a middleware in web development, particularly in Node.js and Express.js, 
that parses the "Cookie" header from HTTP requests and makes the parsed cookie data accessible 
in the request object, allowing developers to easily read and manage cookies. 