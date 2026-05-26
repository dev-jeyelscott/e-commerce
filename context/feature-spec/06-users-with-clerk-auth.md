# Implement Clerk users to app users table

Create a postgreSQL database, wire the Clerk's users into the app's users table so everytime the user sign-up to clerk, the app also saves the data for that user.

## Dependencies

- drizzle-orm postgres
- drizzle-kit

## Implementation

- install dependencies
- wire clerk's authentication to the app database
- save user's data after a successful signup on Clerk
- make Home, Products, and Categories page publicly accessible

## Check when done

- dependencies should install without conflicts
- Clerk's user data should exists to the users table of the app
- Home, Products, and Categories should be publicly accessible
