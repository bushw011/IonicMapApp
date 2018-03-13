const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
  .document('contact-forms/{formId}')
  .onCreate(event => {

  const userId = event.params.userId;

const db = admin.firestore();

return db.collection('users').doc(userId)
  .get()
  .then(doc => {

  const user = doc.data();

  const msg = {
    to: 'bushw011@morris.umn.edu',
    from: 'bushw011@morris.umn.edu',
    subject:  'New User',

    // custom templates
    templateId: 'your-template-id-1234',
    substitutionWrappers: ['{{', '}}'],
    substitutions: {
      name: user.displayName
      // and other custom properties here
    }
  };

return sgMail.send(msg)
})
.then(() => console.log('email sent!') )
.catch(err => console.log(err) )


});
