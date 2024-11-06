const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const studentList = [
//   {
//     firstName: "Aryan",
//     lastName: "Jabbari",
//     sId: "234",
//     school: "Queens College",
//     major: "Computer Science",
//   },
//   {
//     firstName: "Lidia",
//     lastName: "De La Cruz",
//     sId: "333",
//     school: "Harvard",
//     major: "Philanthrophy",
//   },
//   {
//     firstName: "Brian",
//     lastName: "De Los Santos",
//     sId: "468",
//     school: "John Jay",
//     major: "Computer Science",
//   },
//   {
//     firstName: "Adam",
//     lastName: "Albaghali",
//     sId: "589",
//     school: "Brooklyn College",
//     major: "Computer Science",
//   },
//   {
//     firstName: "Nathan",
//     lastName: "Vazquez",
//     sId: "559",
//     school: "Hunter College",
//     major: "Computer Science",
//   },
//   {
//     firstName: "Ynalois",
//     lastName: "Pangilinan",
//     sId: "560",
//     school: "Hunter College",
//     major: "Computer Science",
//   },
//   {
//     firstName: "Shohruz",
//     lastName: "Ernazarov",
//     sId: "561",
//     school: "Hunter College",
//     major: "Computer Science",
//   },
//   {
//     firstName: "Kevin",
//     lastName: "Orta",
//     sId: "562",
//     school: "John Jay",
//     major: "Computer Science",
//   },
// ];

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.get("/students", async (req, res) => {
  if (req.query) {
    let studentsList = await prisma.student.findMany();
    for (const query in req.query) {
      studentsList = studentsList.filter(
        (student) => student[query] === req.query[query]
      );
    }
    return res.json(studentsList);
  }
  res.json({});
});

app.get("/students/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const student = await prisma.student.findUnique({ where: { sId: req.params.id } });
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.post("/students", async (req, res) => {
  console.log(req.body);

  await prisma.student.create({
    data: req.body,
  });

  res.status(201).json({ message: "Student added successfully" });
});

app.put("/students/:id", (req, res) => {
  const student = studentList.find((student) => student.sId === req.params.id);
  if (student) {
    const index = studentList.indexOf(student);
    studentList[index] = req.body;
    res.json({ message: "Student updated successfully" });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.delete("/students/:id", (req, res) => {
  const student = studentList.find((student) => student.sId === req.params.id);
  if (student) {
    const index = studentList.indexOf(student);
    studentList.splice(index, 1);
    res.json({ message: "Student deleted successfully" });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
