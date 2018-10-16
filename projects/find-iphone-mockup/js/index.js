$(document).ready(function() {
  
 
  
  //initialize common variables
  inputText = $("input[type=text]");
  inputPassword = $("input[type=password]");
  output = $("div:nth-child(3)");
  button = $("button");
  
  toggleButton(); 

  // alert('I am a horrible alert msg. Please delete me')
  
  inputText.keypress(toggleButton).keyup(toggleButton);
  inputPassword.keypress(toggleButton).keyup(toggleButton);
  
  function toggleButton() {
    lenText = inputText.val().length;
    lenPassword = inputPassword.val().length;

    if (lenText != 0 && lenPassword != 0) {
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
  
  
});