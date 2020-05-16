# INFO30005_2020_ASS

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

- Press login at the top right of the screen
- Enter your registered email and password
    You can enter one of the registered users:
    - admin1 , password: admin1
    - admin2 , password: admin2
    - admin3 , password: admin3
- If any of these are invalid, the page will tell you what errors have been made
- You are now logged in


Add an event after login:
- Press the menu bar on the top left of the screen, the side bar will show up.
- If you are not logged in, it will redirect to the login page with an error alert saying “Please Login”.
- Then press the Add Event hyperlink from the side bar.
- A modal should appear in the middle of the screen showing form to fill f
- All input is required, if one is not filled there will be an error message below the input bar section. There is a special condition for date input where the date must be at least today for the error to be lifted.
- If all input is valid, the green tick icon would show beside the bar upon submission.
- Then press submit.


Account Sign up:
- Press signup at the top right of the screen
- Enter name, email, password and confirmation password and press  the submit button
    - if any of these are invalid, the page will tell you what errors have been made
- Check your registered email and click the link to verify the account
- Press home at verification page


### EXTRA FEATURES ###

Search event:
- Go to https://unimelbhub.herokuapp.com/
- Enter name of event that wants to be searched under “event search”
- You can also filter by category
- You can also sort by time

Details of added functionality:

Joining Event
- https://unimelbhub.herokuapp.com/user/login
- On each event there will be a “join event” button
- After completion joining the event, data are recorder on that user had join the event


Editing Event:
- login to https://unimelbhub.herokuapp.com/user/login
- Go to event that is created by user
- Click the hyperlink to the event
- Press the hyperlink Event Edit Button
- Edit according to user’s willing
- Press the submit button
- The event will then be posted to the mongodb

Sorting event
- On the search event bar there is a sort by dropdown button
- User will be able to select on which sorting type that user wants

Leave event:
- User who had join the event are able to leave the event
- Click on the event that user want to leave
- Click "Leave this event" button to leave the event

Cancel event:
- creator of event could make the event inactive
- Click on the event that user want to cancel
- Click "Cancel this event" button to leave the event