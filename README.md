# Favorite Users

_by Asami, Nicholas, Patrick_

## Specification from AJ

- This needs to have user auth (email/password), and 2 types of users: users and admins.

- Users can edit their profile, which consists of name, email, address, phone, and a avatar image which is saved via image upload and saved to Mongo.

- Users can view a searchable list (specifically, a text box using an angular filter) of all users and favorite them

- Users can view and edit their favorites

- Admins can view searchable list of all users, and edit/delete any user (but they can’t delete themself!)

- No hash in URLs

- Form validation (email addresses, empty input boxes, etc) on all inputs. This means error messages (i.e. "Please enter a valid email" or "This is required")

- Responsive design

- Protected routes: only admins can delete users or edit another user

## Development setup

Clone this repo then run

    $ npm setup
    $ npm start

In a separate terminal window, run the following commands from the main project folder

    $ cd public
    $ npm setup
    $ npm start
