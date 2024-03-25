document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').addEventListener('submit', function(event) {
    
    // Prevent the default form submission
    event.preventDefault();
    
    // Fetch the API for compose to send an email
    fetch('/emails/', {
      method: 'POST',
      body: JSON.stringify({
        recipients: document.querySelector("#compose-recipients").value,
        subject: document.querySelector("#compose-subject").value,
        body: document.querySelector("#compose-body").value
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return  response.json();
    })
    .then(result => {
      
      // Print result
      console.log(result);
    })
    .catch(error => {
      
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
    });
    load_mailbox('inbox');
  });
  
  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // fetch('/emails/' + mailbox + '/')
  // fetch('/emails/inbox/"')
  fetch(`/emails/${mailbox}/`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    } 
    return response.json();
  })
  .then(emails => {
    // Print emails
     console.log(emails);
/*    if (emails !== undefined) {
      document.querySelector('#emails-view').innerHTML = `1 ${emails}`;
    } else {
      document.querySelector('#emails-view').innerHTML = `shoot`;
    } */

    if (emails != undefined) {
      document.querySelector('#emails-view').innerHTML = `1 ${emails}`;
    } else {
      document.querySelector('#emails-view').innerHTML = `shoot`;
    }

    // ... do something else with emails ...
    emails.forEach(element => {
      //console.log(element);
      // document.querySelector('#emails-view').innerHTML = element.value(`1`);
      // Create a new HTML element (e.g., <div>) to display each value
      var newElement = document.createElement('div');
      // Set the text content of the new element to the value of a specific field from the data
      newElement.textContent = element[subject]; // Replace 'field_name' with the actual field name from your model
      // Append the new element to an existing HTML element (e.g., <div id="data-container">)
      document.getElementById('#emails-view').appendChild(newElement);  
    }) 
  });
}