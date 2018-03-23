const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
  .document('forms/{formId}')
  .onCreate(event => {

  const formId = event.params.formId;

  const db = admin.firestore();
  console.log(formId);
return db.collection('forms').doc(formId)
  .get()
  .then(doc => {

  const form = doc.data();
  var vehicles = form.name;
  const msg = {
    to: 'bushw011@morris.umn.edu',
    from: 'bushw011@morris.umn.edu',
    subject:  'New User',

    // custom templates
    templateId: '00e39b13-59f7-45ec-8e8d-5b7ad14b340f',
    substitutionWrappers: ['{{', '}}'],
    substitutions: {
      name: form.name,
      phoneNumber: form.phoneNumber,
      category: form.category,
      email: form.email,
      homeOwner: form.isHomeOwner,
      vehicles: form.vehicles
    }

  };

return sgMail.send(msg)
})
.then(() => console.log('email sent!') )
.catch(err => console.log(err) )


});
