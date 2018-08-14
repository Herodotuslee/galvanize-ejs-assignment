const env = 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')



// As a user, when I visit '/' I see a list of all the classes and a form to create
//  a new class.

// GET all classes
app.get('/',(req,res)=>{
  knex.select()
  .from('classes')
  .then((result)=>{
    // res.send(result)
    res.render('index',{result})
  }).catch((err) => {
      console.error(err)
    });


})

// As a user, when I submit the new class form I should see the new class displayed
// in the list.

// POST a class
app.post('/', (req, res) => {
  knex('classes').insert({
      classname:req.body.classname,
      teacher:req.body.teacher,
    })
    .then(()=>{
      res.redirect('/');
    }).catch((err) => {
      console.error(err)
    });
})



app.get('/class/:class_name',(req,res)=>{
  knex("classes")
  .join("students",'classes.id','students.class_id')
  .where('classes.classname',req.params.class_name)
  .then((result)=>{
    console.log(result);
    // res.send(result)
    res.render('classes',{student_list : result});
  })
  .catch((err)=>{
    console.log(err);
  })
})

// As a user, when I click on a class it takes me to the individual class page.
// As a user, when I view the class page I should see a list of all students in a
// class and a form to create a new student.

//POST a student

app.post('/students', (req, res) => {
  knex('students').insert({
    name: req.body.student_name,
    class_id: req.body.class_id
  }).then(() => {
    res.redirect('back')
    // res.redirect('back')
  })
})



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
