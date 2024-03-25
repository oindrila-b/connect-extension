# Connect Extension

This project is a chrome extension built using manifest version .

This extension used to connect to Github and Jira. And fetch resources like 
 - Github - Repositories, Starred Repositories  and Commits for a specific repository.
 - Jira - Jira Issues, Jira Projects.

 ## Tech Stack :
 This chrome extension was built using:
  - React Typescript
  - Node tsc
  - Nango Frontend SDK
  - Webpack

 ## Features
  - Fetches user repositories [public repositories] 
  - Fetches Repositories starred by the user
  - Fetches Jira Issues of the authenticated user
  - Fetches Jira Projects of the authenticated user
  - Fetches commits of a specific repository given by the user.
 -  Stores the fetched data in the indexeddb database
 -  Shows data from the indexeddb database
 - User has to login only once, and will stay logged in until the extension is removed.

## How to build the project : 
The project can be built using the command `npm run build` from the root directory. This will lead to the generation of a `./dist` folder which contains the cmplieed js code.

This file can then be uploaded in the `load unpack` section of the chrome extension.

#### To run it locally :
 - To run the project locally, use the command `npm start`. 
 This will start the react scriot and run the project locally.