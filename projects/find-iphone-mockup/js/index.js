$(document).ready(function() {
  
  //initialize common variables for display alert message
  var caution = '<b>Session Expired.</b> Please Login.'
  var success = "<b>Hooray!</b> All systems go!"; 
  var className = "free-float";
 
  // This function displays the needed message from the top of the view port
  function displayAlertMsg(msg, className) {
    
    $('.msg-box')
      .addClass(className)
      .html(msg)
      .slideDown(500)
      .delay(2000)
      .slideUp(500)
  }
  
  displayAlertMsg(caution, className); 
 
  // This function uses a regex to check for the at symbol and that
  //  the email address ends with a dot TLD
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  //initialize common variables for toggleButton
  var inputText = $("input[type=text]");
  var inputPassword = $("input[type=password]");
  var output = $("div:nth-child(3)");
  var button = $("button");
 
  toggleButton(); 
  
  inputText.keypress(toggleButton).keyup(toggleButton);
  inputPassword.keypress(toggleButton).keyup(toggleButton);
  
  // This function check the input boxes for values and calls validateEmail
  //  to determine if the Sign In button should be active.
  function toggleButton() {
    var lenPassword = inputPassword.val().length;
    var email = inputText.val();
    
    if (lenPassword != 0 && validateEmail(email)) {
      button.text("Sign In...");
      button.removeAttr("disabled");
      button.addClass('activeButton');
    } 
    else {
      button.attr("disabled", "disabled");
      button.text("Sign In...");
      button.removeClass('activeButton'); 
    }
  };
  
  var selectButton = document.getElementById("button");

  // This function triggers the sign in success message once the user
  //  clicks the sign in button
  selectButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.button === 0) {
      displayAlertMsg(success, className);
    }

  });

});