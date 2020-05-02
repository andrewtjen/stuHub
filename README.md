# INFO30005_2020_ASS

By: 
939206 Andrew Tjen
955545 William Putra Intan
980741 Nikolas Leander Putra
933701 Faiz Soemiatno

If you need access to git repo please email: wintan@student.unimelb.edu.au

Our app is online on heroku and running on an active MongoDb database.

App: https://unimelbhub.herokuapp.com/

Github: https://github.com/wintan123/INFO30005_2020_ASS

Details to access core functionality:

Creating an event:

Login to https://unimelbhub.herokuapp.com/user/login
Enter one of the registered users:
admin1 , password: admin1
admin2 , password: admin2
admin3 , password: admin3
Add an event after login (https://unimelbhub.herokuapp.com/event/add)
Enter fields required to make an event
Press submit

Account Sign up:
Go to https://unimelbhub.herokuapp.com/user/register
Fill the form, with unimelb email
Click the submit button
The page will redirect to res(200) port, saying email verification has been sent
Click the verification link sent to the email
The link will redirect to login page where a notification will say email verified
Now you can login with the account
You can resend verification by link by pressing the “Haven’t got verification email?” button and enter your email
You can send password event by link by pressing the “Forgot Password?” hyperlink in login page and enter your email

Search event:
Go to https://unimelbhub.herokuapp.com/
Enter name of event that wants to be searched under “event search”
You can also filter by category
You can also sort by time

Details of added functionality:

Joining Event
Login to https://unimelbhub.herokuapp.com/user/login
On each event there will be a “join event” button
After completion joining the event, data are recorder on that user had join the event


Editing Event:
login to https://unimelbhub.herokuapp.com/user/login
Go to event that is created by user
Click the hyperlink to the event
Press the hyperlink Event Edit Button
Edit according to user’s willing
Press the submit button
The event will then be posted to the mongodb

Sorting event
On the search event bar there is a sort by dropdown button
User will be able to select on which sorting type that user wants

Join and create history
Must be Pre-logged in
Press join history to see which events you previously joined (still only showing event’s id)
Press create history to see which events you previously create (still only showing event’s id)
