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

    if (emails == undefined) {
      document.querySelector('#emails-view').innerHTML = `Shoot, you have no emails yet!`;
    } else {
    // ... do something else with emails ...
      const container = document.getElementById('emails-view');
      emails.forEach(element => {
        const emailDiv = document.createElement('div');
        emailDiv.innerHTML = `<p><strong>From:</strong> ${element.sender}</p> <p>${element.subject}</p> <p>${element.timestamp}</p>`;
        emailDiv.style.border = 'solid lightgray';
        container.appendChild(emailDiv);
      })
    } 
  })
  .catch(error => console.error('Error fetching observations:', error));
}