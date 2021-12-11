const router = require('express').Router();
var path = require('path');
const mv = require('mv');
const formidable = require('formidable');
const fs = require('fs');
const https = require('https');
const pool = require('../config/database');
const { timeStamp } = require('console');
var pdf = require('html-pdf');
const ejs = require('ejs');
const moment = require("moment")

async function SaveDirectory(uploadDir){
    if (!fs.existsSync(uploadDir)) {
         await fs.mkdirSync(uploadDir, {recursive: true});
         return true;
   }    
}



router.get('/', async function(req,res) {
  const result = await pool.query("SELECT a.*, b.*, c.date, c.start_time FROM student_details AS a INNER JOIN stu_map AS b ON a.id = b.id INNER JOIN exam AS c ON b.exam_id = c.exam_id WHERE a.id = ?",[req.user.id]);
  console.log(result)
  res.render('index.ejs',{
    user: result
  });
});




// router.post('/', (req,res)=>{
//     try{

//     let form = new formidable.IncomingForm();
//     form.keepExtensions= true ;
//     form.maxFieldsSize=10*1024*1024;
//     form.multiples = true;
//     form.parse(req, async (err, fields, files) => {
//       if (err)
//       {
//           console.error('Error', err)
//       } 
//       const result = await pool.query("INSERT IGNORE INTO `student_details`(`level`, `name`, `father_name`, `mother_name`, `date_of_birth`, `sex`, `mobile`, `email`, `nation`, `address`, `pincode`, `class`, `school`, `district`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//       [
//           fields.level,
//           fields.name,
//           fields.father_name,
//           fields.mother_name,
//           fields.date_of_birth,
//           fields.sex,
//           fields.mobile,
//           fields.email,
//           fields.nation,
//           fields.address,
//           fields.pincode,
//           fields.class_n,
//           fields.school,
//           fields.district
//       ]);
      
//       let id  = result.insertId;
//       console.log(id);

//       if(!id){
//             req.flash('msg', 'This User Is Already Added To The Exam!');
//             res.redirect("/");
//       }else{

//       var uploadDir = './public/User_'+id+'';
//       const done = await SaveDirectory(uploadDir)

//       if(files.photo.size)
//       {    
//           var oldpath = files.photo.filepath;    
//           fileExt = files.photo.originalFilename.split('.').pop();
//           photo_name = files.photo.newFilename+'.'+fileExt+'';
//           var newpath1='./public/User_'+id+'/'+ photo_name;
//           var storepath1 = '/User_'+id+'/'+ photo_name+'';
//           mv(oldpath, newpath1, (err) => {
//             if (err){                                
//                 console.log(err);
//               }
//           });
//           const result4 = await pool.query("UPDATE student_details SET `photo` = ? WHERE `id`=?",[storepath1,id])
//        }

//        if(files.signature.size)
//       {    
//           var oldpath = files.signature.filepath;
//           fileExt = files.signature.originalFilename.split('.').pop();
//           signature_name = files.signature.newFilename+'.'+fileExt;
//           var newpath='./public/User_'+id+'/'+ signature_name;
//           var storepath = '/User_'+id+'/'+ signature_name+'';
//           mv(oldpath, newpath, (err) => {
//             if (err){                                
//                 console.log(err);
//               }
//           });
//           const result5 = await pool.query("UPDATE student_details SET `signature` = ? WHERE `id`=?",[storepath,id])
//        }

//     //Insert Details into Student Map Table//
//       const exam = await pool.query("SELECT * FROM exam WHERE level = ?", [fields.level]);

//       exam.forEach(res => {
//         res.date = moment(res.date).format('YYYYMMDD');
//       })

//       let reg_no = id+'/'+exam[0].date+ '/'+exam[0].exam_id;
      
//       const stu_map = await pool.query("INSERT INTO `stu_map` (`id`,`reg_no`,`exam_id`,`entered`,`completed`) VALUES(?,?,?,?,?)",
//       [id,reg_no, exam[0].exam_id,0,0]);


//       //Convert HTML TO PDF with autofilled details//
//        const result6 = await pool.query("SELECT * FROM student_details WHERE id = ?",[id]);
//        console.log(result6)

//        ejs.renderFile(path.join(__dirname, "../views", "image.ejs"),{data: result6[0] }, (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             let options = {
//                 height: "20.75in",
//                 width: "20.5in",
//                 base: path.join("file:///"+__dirname,"../public/User_"+id+"/")
//             };
//             // console.log(data)
            
//             pdf.create(data,options).toFile(path.join(__dirname, "../public/pdf/", `form_${id}.pdf`), function (err, data) {
//                 if (err) {
//                     throw err;
//                 } else {
//                     // console.log(data)
//                     console.log("sdfkns dfkj")
//                     res.download(path.join(__dirname, "../public/pdf/", `form_${id}.pdf`), `form_${id}.pdf`, (err) => {
//                         if (err) {
//                           res.status(500).send({
//                             message: "Could not download the file. " + err,
//                           });
//                         }

//                     });
//                     req.flash('msg', 'This User Is Already Added To The Exam!');
//                 }
//             });
    
//         }
//     });
//  }
// });

// }catch(err){
//         throw err;
//     }
// })


module.exports = router;
