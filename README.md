# INFO30005 WEB-IT PROJECT 2020

By:
- 939206 Andrew Tjen
- 955545 William Putra Intan
- 980741 Nikolas Leander Putra
- 933701 Faiz Soemiatno

If you need access to git repo please email: wintan@student.unimelb.edu.au

Our app is online on heroku and running on an active MongoDb database.

App: https://unimelbhub.herokuapp.com/

Github: https://github.com/wintan123/INFO30005_2020_ASS

Details to access core functionality:

Creating an event:

Login:
1. Press login at the top right of the screen
2. Enter your registered email and password
    You can enter one of the registered users:
    - admin1 , password: admin1
    - admin2 , password: admin2
    - admin3 , password: admin3
3. If any of these are invalid, the page will tell you what errors have been made
4. You are now logged in


Add an event after login:
1. Press the menu bar on the top left of the screen, the side bar will show up.
2. If you are not logged in, it will redirect to the login page with an error alert saying “Please Login”.
3. Then press the Add Event hyperlink from the side bar.
4. A modal should appear in the middle of the screen showing form to fill f
5. All input is required, if one is not filled there will be an error message below the input bar section. There is a special condition for date input where the date must be at least today for the error to be lifted.
6. If all input is valid, the green tick icon would show beside the bar upon submission.
7. Then press submit.


Account Sign up:
1. Press signup at the top right of the screen
2. Enter name, email, password and confirmation password and press  the submit button
    - if any of these are invalid, the page will tell you what errors have been made
3. Check your registered email and click the link to verify the account
4. Press home at verification page


Search event:
1. Go to https://unimelbhub.herokuapp.com/
2. Enter name of event that wants to be searched under “event search”
3. You can also filter by category
4. You can also sort by time

Details of added functionality:

Joining Event
1. Go to https://unimelbhub.herokuapp.com/user/login
2. On each event there will be a “join event” button
3. After completion joining the event, data are recorder on that user had join the event


Editing Event:
1. login to https://unimelbhub.herokuapp.com/user/login
2. Go to event that is created by user
3. Click the "more detail" button on the event
4. Click the "edit" button at the bottom left
5. Edit according to user’s willing (location, time, date will not be able to edit)
6. Press the "update this!" button
7. The event will then be updated in the database


Leave event:
1. User must join the event in order to use this feature
2. Click on the event that user want to leave
3. Click "Leave" button to leave the event

Cancel event:
1. Creator of the event who are able to use this feature
2. Click on the event that user want to cancel
3. Click "Cancel" button to cancel the event