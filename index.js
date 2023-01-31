import express from 'express';
import cors from 'cors';
import { router as commentsRouter} from './routes/comments.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
app.use(commentsRouter)
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

