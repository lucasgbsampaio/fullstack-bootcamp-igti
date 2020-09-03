import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    const date = new Date();

    grade = { id: data.nextId++, ...grade, date };
    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data));
    res.send(grade);
  } catch (err) {
    console.log(err);
  }
});

router.put('/', async (req, res) => {
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    const date = new Date();

    const index = data.grades.findIndex((user) => user.id === grade.id);

    if (index === -1) {
      return res.status(400).json({ error: 'Grade não encontrada!' });
    }
    data.grades[index] = { ...grade, timestamp: date };
    await writeFile(global.fileName, JSON.stringify(data));

    return res.status(200).json(data.grades[index]);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter(
      (user) => user.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data));

    return res.status(200).json(data.grades);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const newData = data.grades.find(
      (user) => user.id === parseInt(req.params.id)
    );
    return res.status(200).json(newData);
  } catch (err) {
    console.log(err);
  }
});

router.get('/total-grades/total', async (req, res) => {
  try {
    const { student, subject } = req.query;
    const data = JSON.parse(await readFile(global.fileName));
    const filterGrades = data.grades.filter(
      (user) => user.student === student && user.subject === subject
    );
    const totalGrade = filterGrades.reduce((acc, grade) => {
      return acc + grade.value;
    }, 0);
    return res.status(200).json({
      student,
      subject,
      totalGrade,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/avg-grades/avg', async (req, res) => {
  try {
    const { type, subject } = req.query;
    const data = JSON.parse(await readFile(global.fileName));
    const filterGrades = data.grades.filter(
      (user) => user.subject === subject && user.type === type
    );
    const totalGrade = filterGrades.reduce((acc, grade) => {
      return acc + grade.value;
    }, 0);
    return res.status(200).json({
      type,
      subject,
      avg: totalGrade / filterGrades.length,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/best-grades/best', async (req, res) => {
  try {
    const { type, subject } = req.query;
    const data = JSON.parse(await readFile(global.fileName));
    const filterGrades = data.grades.filter(
      (user) => user.type === type && user.subject === subject
    );
    const orderGrades = filterGrades
      .sort((a, b) => a.value - b.value)
      .reverse();

    return res.status(200).json(orderGrades.slice(0, 3));
  } catch (err) {
    console.log(err);
  }
});

export default router;
