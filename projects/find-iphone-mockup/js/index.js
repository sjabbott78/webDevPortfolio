$(document).ready(function() {
  
     $('.msg-box').hide(); 
   
  var alert = "<b>Catastrophic Failure!</b> Toss phone in the river.";
  var caution = '<div class=" free-float"><b>Session Expired.</b> Please Login.</div>'
  var info = "<b>Info:</b> Someting happening..Update acc't maybe.";
  var success = "<b>Hooray!</b> All systems go!"; 
  
  function displayAlertMsg(msg) {
    
    $('.msg-box')
      .addClass(msg)
      .html(msg)
      //.delay(2000)
      .slideDown(500)
  }
  
  displayAlertMsg(caution); 
  //alert('I am a horrible alert msg. Please delete me')
 
 
  
  //initialize common variables for toggleButton
  inputText = $("input[type=text]");
  inputPassword = $("input[type=password]");
  output = $("div:nth-child(3)");
  button = $("button");
 
  toggleButton(); 
  
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