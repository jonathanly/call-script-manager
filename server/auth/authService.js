var nodemailer = require('nodemailer');

module.exports.generateActivationToken = function() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let activationToken = "";

  for( var i=0; i < 32; i++ )
      activationToken += characters.charAt(Math.floor(Math.random() * characters.length));

  return activationToken;
}

module.exports.sendActivationEmail = function(user) {
  console.log(user)
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'scriptmanager6@gmail.com	',
      pass: 'plyingthecode'
    }
  });

  var text = `
  Hi ${user.firstName},\n
  Please follow the link to activate your account http://localhost:3000/activate/${user.activationToken}\n
  :)`;

  var mailOptions = {
    from: 'noreply@gmail.com',
    to: user.email,
    subject: 'email test',
    text: text,
  };

  transporter.sendMail(mailOptions)
  .then(info => {
    console.log('Message Sent: ', info.response)
  })
  .catch(error => {
    console.log(error)
  })

  // transporter.sendMail(mailOptions, function(error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     //console logging successful message being sent
  //     console.log('Message Sent' + info.response);
  //   };
  // });
};
