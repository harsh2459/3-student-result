// Student Result In Mysql 
// What Is Include(Insert,Delete,Update,View)
// Data(Name,Sub1,Sub2,Sub3,Sub4,Total,Min,Max,avg,result)

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var con = new mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "harsh"
});

con.connect();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }))

    app.get('/insert', function (req, res) {
        res.render('index.ejs');
    });
app.get('/update/:id', function (req, res) {
    res.render('index.ejs');
});

app.post('/insert', function (req, res) {
    var min, max, total, query, avg, result, failCount = 0
    total = parseInt(req.body.sub1) + parseInt(req.body.sub2) + parseInt(req.body.sub3) + parseInt(req.body.sub4)

    if (req.body.sub1 > req.body.sub2 && req.body.sub1 > req.body.sub3 && req.body.sub1 > req.body.sub4) {
        max = req.body.sub1
    } else if (req.body.sub2 > req.body.sub3 && req.body.sub2 > req.body.sub4) {
        max = req.body.sub2
    } else if (req.body.sub3 > req.body.sub4) {
        max = req.body.sub3
    } else {
        max = req.body.sub4
    }
    if (req.body.sub1 < req.body.sub2 && req.body.sub1 < req.body.sub3 && req.body.sub1 < req.body.sub4) {
        min = req.body.sub1
    } else if (req.body.sub2 < req.body.sub3 && req.body.sub2 < req.body.sub4) {
        min = req.body.sub2
    } else if (req.body.sub3 < req.body.sub4) {
        min = req.body.sub3
    } else {
        min = req.body.sub4
    }


    avg = (total / 4);
    // result
    if (req.body.sub1 <=  33) failCount++;
    if (req.body.sub2 <= 33) failCount++;
    if (req.body.sub3 <= 33) failCount++;
    if (req.body.sub4 <= 33) failCount++;

    if (failCount == 0) {
        result = 'Pass';
    } else if (failCount <= 2) {
        result = 'ATKT';
    } else {
        result = 'Fail';
    }

    query = "Insert Into student_result(name,sub1,sub2,sub3,sub4,total,min,max,avg,result)values('" + req.body.name + "','" + req.body.sub1 + "','" + req.body.sub2 + "','" + req.body.sub3 + "','" + req.body.sub4 + "','" + total + "','" + min + "','" + max + "','" + avg + "','" + result + "')"
    con.query(query, function (error, result) {
        if (error) throw error
        res.redirect('/print')
    });
});

app.get('/', function (req, res) {
    var query = "select * from student_result"
    con.query(query, function (error, result) {
        if (error) throw error
        res.redirect('/print')
    });
});

app.get('/delete/:id', function (req, res) {
    var id = req.params.id
    var query = "DELETE FROM student_result WHERE id = ?"
    con.query(query, [id], function (error, result) {
        if (error) throw error
        res.redirect('/print')
    });
});

app.post('/update/:id', function (req, res) {
    var min, max, total, query, id, avg, result, failCount = 0
    id = req.params.id
    total = parseInt(req.body.sub1) + parseInt(req.body.sub2) + parseInt(req.body.sub3) + parseInt(req.body.sub4)

    if (req.body.sub1 > req.body.sub2 && req.body.sub1 > req.body.sub3 && req.body.sub1 > req.body.sub4) {
        max = req.body.sub1
    } else if (req.body.sub2 > req.body.sub3 && req.body.sub2 > req.body.sub4) {
        max = req.body.sub2
    } else if (req.body.sub3 > req.body.sub4) {
        max = req.body.sub3
    } else {
        max = req.body.sub4
    }

    if (req.body.sub1 < req.body.sub2 && req.body.sub1 < req.body.sub3 && req.body.sub1 < req.body.sub4) {
        min = req.body.sub1
    } else if (req.body.sub2 < req.body.sub3 && req.body.sub2 < req.body.sub4) {
        min = req.body.sub2
    } else if (req.body.sub3 < req.body.sub4) {
        min = req.body.sub3
    } else {
        min = req.body.sub4
    }
    avg = (total / 4);
    // result
    if (req.body.sub1 <= 33) failCount++;
    if (req.body.sub2 <= 33) failCount++;
    if (req.body.sub3 <= 33) failCount++;
    if (req.body.sub4 <= 33) failCount++;

    if (failCount === 0) {
        result = 'Pass';
    } else if (failCount <= 2) {
        result = 'ATKT';
    } else {
        result = 'Fail';
    }

    query = " UPDATE  student_result set name='" + req.body.name + "',sub1='" + req.body.sub1 + "',sub2='" + req.body.sub2 + "',sub3='" + req.body.sub3 + "',sub4='" + req.body.sub4 + "',total='" + total + "',min='" + min + "',max='" + max + "',avg= '" + avg + "',result='" + result + "'WHERE id=?"
    con.query(query, [id], function (error, result) {
        if (error) throw error
        res.redirect('/print')
    });
});

app.get('/print', function (req, res) {
    var query = "select * from student_result"
    con.query(query, function (error, result) {
        if (error) throw error
        res.render('print.ejs', { data: result });
    });
});

app.listen(3000);