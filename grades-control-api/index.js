import express from 'express';
import gradesRouter from './grades.js';

const app = express();
global.fileName = 'grades.json';

app.use(express.json());
app.use('/grades', gradesRouter);

app.listen(3000, () => {
  try {
    console.log('Api Started');
  } catch (err) {
    console.log(err);
  }
});
