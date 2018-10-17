Find My iPhone mock up.

This web page mimics some of Apple's Find My iPhone application. 

The design is mobile responsive with all view ports that chrome has installed
under the inspect element display. Flexbox is the primary layout method to help
ensure mobile responsiveness.

The initial message lets the user know their session has expired and they need
to log in again without forcing the user to acknowledge the message before
trying to log in.

As in Apple's application, the user must enter both their email address and
password before the "Sing In" button is active. The javascript function used
makes sure the user's email contains "@" and is the followed by
"someDomain.someTLD". (The TLD must be at least 2 characters to be considered
valid) 

Once the user signs in, a new message slides down from the top letting them
know of success or failure. (This is random)
