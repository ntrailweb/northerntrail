  function ValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}	


 
  
  document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('send_email');
  // const emailLink = document.getElementById('emailLink');
  
  submitButton.addEventListener('click', function() {
    event.preventDefault(); // Prevent default form submission
    const nom_name = document.getElementById('nom_name').value;
    const nom_unit = document.getElementById('nom_unit').value;
	const nom_position = document.getElementById('nom_position').value;
	const nom_cor = document.getElementById('nom_cor').value; 
	const nt_name = document.getElementById('nt_name').value;
	const nt_pos = document.getElementById('nt_pos').value;
	const email = document.getElementById('email').value;
	const email_nom = document.getElementById('email_nom').value;
	const nom_statement = document.getElementById('nom_statement').value;
    const subject = encodeURIComponent('Y.E.S. Nomination');
   
    let body = `Name of Nominee: ${nom_name}\n`;
	body = body + `Unit Type: ${nom_unit}\n`;
	body = body + `Nominee Position: ${nom_position}\n`;
	body = body + `Unit Chartering Organization: ${nom_cor}\n`;
	body = body + `Your Name: ${nt_name}\n`;
    body = body + `Your Position in Unit: ${nt_pos}\n`;
    body = body + `Your Email Address: ${email}\n`;
	body = body + `Recipient's Email Address: ${email_nom}\n`;
    body = body + `Statement about Nominee: ${nom_statement}\n`;
    
	if (check_form() == 1)
	{	
		return;
	}	
	else
	{
	const encodedBody = encodeURIComponent(body);
    const emailLink = document.getElementById('emailLink');
	emailLink.href = `mailto:yes@ntrail.org?subject=${subject}&body=${encodedBody}`;
   // submit.style.display = 'block'; // Show the email link
    emailLink.click(); //programmatically click the link.
    }
	
  });
});

function check_form()
{
      error = 0;
	  var msg = '';

// Check nominee name field
	   if ( document.getElementById('nom_name').value =="")  {
           msg =  'Please Enter Name of Nominee.<br />'
			error=1;  }  
		else
			msg = '';
		
		document.getElementById('nom_name_error').innerHTML = msg;


// Check nominee unit 
	
       	if ( document.getElementById('nom_unit').value =="")  {
             msg =  'Please provide the Nominee Unit type and number.<br />';
             error= 1;  }
        else 
     		 msg= '';
		 
		 document.getElementById('nom_unit_error').innerHTML = msg;


// Check Nominee position
  
        if ( document.getElementById('nom_position').value =="")         {
            msg = 'Please provide the Nominee position, eg. scoutmaster.<br />';
			error=1;  }
		else
			 msg = '';
		  
		document.getElementById('nom_position_error').innerHTML = msg;


// Check COR name
		  
        if ( document.getElementById('nom_cor').value =="")  {
			msg = 'Please provide the name of the Nominee Chartered Organization.<br />'
		error=1; }
		else
			msg = '';
		
		document.getElementById('nom_cor_error').innerHTML = msg; 
		
//  Check Nominator Name Field
	
		if ( document.getElementById('nt_name').value =="") {
			 msg = 'Please provide your name.';
		error =1; }
		else
			  msg = '';
			
        document.getElementById('nt_name_error').innerHTML = msg;

// Check nominator positions
			
		if ( document.getElementById('nt_pos').value =="") {
			 msg = 'Please provide your position in unit.';
		error =1; }
		else
			  msg = '';	 
			 
    	document.getElementById('nt_pos_error').innerHTML = msg;

// Check nominator email address
				
	    if (ValidEmail( document.getElementById('email').value) == false)   {
			msg = 'Your email address does not look correct.<br />';
		    error=1;}
	    else		
		    msg ='';
	   
	   document.getElementById('email_error').innerHTML = msg;
	   
// Check nominee email 	   
	  	   
	   if (ValidEmail(document.getElementById('email_nom').value) == false)   {
			msg = 'The recipient email address does not look correct.<br />';
		    error=1;}
		else
           msg ='';   
	   
       document.getElementById('email_error_nom').innerHTML = msg;
	
// Check statement   
	  	   
	   
	   var s_len = document.getElementById('nom_statement').value.length; 
	   	msg = '';   
        if (s_len > 3000 || s_len == 0)
		{   
	        if (s_len > 3000)
			{   msg = 'Statement is too long for the program, please condense. Limit to 3000 characters.<br />'; }
			if (s_len == 0) { msg = 'Please provide a statement about why you have nominated this person for the program.<br />' }
	        error = 1;
		}	
	 else
			 msg = '';			
			
   		document.getElementById('nom_statement_error').innerHTML = msg;

if (error == 1)
{
    document.getElementById('form_error').innerHTML = 'Please correct errors'; 
    return 1;
}	
else
{
	document.getElementById('form_error').innerHTML = '';
	return 0;
}	
	
}