//  const { config } = require("dotenv/types");
const nodemailer = require("nodemailer");
const configMailer = require("../config/configMailer");

const transport = nodemailer.createTransport({
    // service:'Mailgun',
    service:'gmail',
    auth:{
        // user:configMailer.MAILGUN_USER,
        // pass:configMailer.MAILGUN_PASS
        user:"rizka.greenlebanon@gmail.com",
        pass:"rizka.greenlebanon123"
    },
    //  tls:{
    //     rejectUnauthorized:false
    //  }
})
module.exports = {
sendMail(from,to ,subject,html){
    return new Promise((resolve,reject) => {
transport.sendMail({from, subject, to, html},(err,info)=>{
    if(err) reject(err);

    resolve(info);
   })

    })
}
}

