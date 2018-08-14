const env = 'development'
const config = require('./knexfile.js')[env]
const knex = require('knex')(config)
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')



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



//GET class information and students
app.get('/class/:class_name',(req,res)=>{
  knex("classes")
  .leftJoin("students",'classes.id','students.class_id')
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


//DELETE One Class
app.get('/delete/:class_id', (req, res) => {
  knex('classes').where('id', req.params.class_id).del().then(() => {
    res.redirect('/')
  })
})

//DELETE One Student
app.get('/deletestudent/:student_id', (req, res) => {
  knex('students').where('id', req.params.student_id).del().then(() => {
    res.redirect('/')
  })
})


//POST a student
app.post('/students', (req, res) => {
  knex('students').insert({
    name: req.body.student_name,
    class_id: req.body.class_id
  }).then(() => {
    res.redirect('back')
  })
})

//UPDATE a Class
app.post('/edit/:id', (req, res) => {
  knex('classes').update({
    classname: req.body.classname,
    teacher: req.body.teacher
  }).where('id', req.params.id).then(() => {
    res.redirect('/')
  })
})

//UPDATE a student
app.post('/edit_student/:id', (req, res) => {
  knex('students').update({
    name: req.body.name,
  }).where('id', req.params.id).then(() => {
    res.redirect('back')
  })
})



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
