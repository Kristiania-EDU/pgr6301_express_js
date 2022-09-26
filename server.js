import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const USERS = [
   {
      username: 'administrator',
      password: '1234',
      fullName: 'Admini Strator'
   }
];

/**
 * Type: GET
 * Route: /login
 * Description: Should send a greeting
 * to the signed on user
 * */
app.get('/login', (req, res) => {
   const { username } = req.cookies;
   const user = USERS.find(x => x.username == username);
   const { fullName } = user;

   res.json({
      username, fullName
   });
});

/**
 * Type: POST
 * Route: /login
 * Parameters: username and password
 * Description: Logs user into the system
 * */
app.post('/login', (req, res) => {
   const body = req.body;
   const { username, password } = body;

   const user = USERS.find(x => x.username === username && x.password == password);

   if(user) {
      res.cookie('username', username)
      res.sendStatus(200);
   } else {
      res.sendStatus(401);
   }
});

const server = app.listen(process.env.PORT || 3000, () => {
   const address = server.address();

   console.log(`Server started at http://localhost:${address.port}`);
});