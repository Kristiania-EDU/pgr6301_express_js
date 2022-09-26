import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cookieParser(process.env.COOKIES_SECRET || 'Test'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(express.static('public'));

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
   const user = USERS.find(x => x.username === req.signedCookies.username);
   const { username, fullName } = user;

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

   console.log('Username and password: ', { username, password });

   const user = USERS.find(x => x.username === username && x.password == password);

   if(user) {
      res.cookie('username', username)
      res.sendStatus(200);
   } else {
      res.send(401);
   }
});

app.post('/register', (req, res) => {
   const body = req.body;
   const { username, password } = body;

   if(USERS.find(x => x.username === username)) {
      res.send('Username already exists');
   } else {
      USERS.push({
         username, password
      });

      res.send('User registered');
   }
});

const server = app.listen(process.env.PORT || 3000, () => {
   const address = server.address();

   console.log(`Server started at http://localhost:${address.port}`);
});