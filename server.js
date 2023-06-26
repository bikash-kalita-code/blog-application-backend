import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as mongoose from 'mongoose';
import { config } from 'dotenv';
config();

// bring routes
import * as blogRoutes from './routes/blog.js';
import * as authRoutes from './routes/auth.js';

// app
const app = express();

// db
await mongoose
  .connect(process.env.MONGO_DATABASE_URI, )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/blog', blogRoutes.router);
app.use('/api', authRoutes.router);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
