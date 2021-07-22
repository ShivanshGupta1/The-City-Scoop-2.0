require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cron = require('node-cron');
let testAccount;
let transporter = nodemailer.createTransport({
  service:'SendGrid',
  auth: {
  user: 'apikey',
  pass: process.env.SENDGRID_API_KEY
  }
  });
let myarray;
console.log(process.env.SENDGRID_API_KEY)
const mongoclient = require('mongodb').MongoClient
app.use(bodyparser.urlencoded({ extended: true }))
mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})

    .then(client => {
        console.log('Connected to database')
        const db = client.db('SubscriptionDB')
        const EmailsCollection = db.collection('Emails')
        app.set('view engine', 'ejs')
        cron.schedule('*/10 * * * * *', function() {
          console.log('running a task every 10 seconds');
        });
        


        app.get('/', function (req, res) {
            res.sendFile(__dirname + '/index.html')
        })
        app.post("/", (req, res) => {
          EmailsCollection.insertOne(req.body)
          transporter.sendMail({
            from: 'devkumar5436@gmail.com', // sender address
            to: "mail@shivanshgupta.com", // list of receivers
            subject: "The City Scoop", // Subject line
            text: "Message Sent", // plain text body
            html: "h1>The City Scoop</h1><br><p>Welcome Shivansh to the City Scoop! Thank you for subcribing to our Monthy Magical Mangazine! You are currently a Bronze Member! More membership oppurtunities to be released soon! This magazine talks about what is happening in citues around the 🌍 world! We hope you 😊 enjoy! Our next edition for the month will arrive soon! </p><br><p><code>NOTE:</code> <strong>The City Scoop also supporst all envionment friendly ways to do your daily tasks! Please share anything you do for the enironment to our email at test1234email@gmail.com!</strong>  </p>" // html body
          });
          res.sendFile(__dirname + '/success.html')

    
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
          
            // create reusable transporter object using the default SMTP transport
        
            

            });


              
            // send mail with defined transport object
            db.collection('Emails').find().toArray()
            .then(result=>{
              myarray = result 
              
            })
            cron.schedule('*/10 * * * * *', function() {
              
      
            
            
         
               
                  for (var i = 0; i<myarray.length;i++){

                    transporter.sendMail({
                      from: 'devkumar5436@gmail.com', // sender address
                      to: `${myarray[i].mail}`, // list of receivers
                      subject: "Come Back To Read US", // Subject line
                      text: "Message Sent", // plain text body
                      html: `<h1>A Teeny Tiny Reminder</h1><br><p>Hi! ${myarray[i].name}, this is a small reminder to read the CITY SCOOP MAGAZINE ISSUE! </p>` // html body
                    },(err,info)=>{
                      if (err){
                        console.log(err);
                      }
                      else {
                       console.log(info)
                      }
                    });
                  }
        
                 
              })
            })
       
            

          
    
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          
          
         
        
         

        
    

app.listen(4000, function (req, res) {
    console.log('The server is running')

})