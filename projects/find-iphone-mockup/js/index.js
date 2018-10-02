
// See if Apple ID has a value
// See if Password has a value
// If they both do, enable button
function checkPassAndID(){
var appleId = document.getElementById('appleID');
var passwd = document.getElementById('password');

var apLen = appleId.value.length;
var passLen = passwd.value.length;
if (passLen != 0 && apLen != 0 ){
  document.getElementById('button').disabled = false;
}else{
  document.getElementById('button').disabled = true;
}	

}