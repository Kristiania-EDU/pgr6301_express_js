import express from 'express';

const app = express();

app.get('/login', (req, res) => {
   res.send('You reaced /login');
});

const server = app.listen(process.env.PORT || 3000, () => {
   const address = server.address();

   console.log(`Server started at http://localhost:${address.port}`);
});