Instructions to run the back end:

1. Install nodemon globally with the following command:
   `npm install -g nodemon`
2. If running on a Windows machine install the Windos Subsystem for Linux with the following command:
   ### `wsl --install`
3. Follow the instructions in the following link to install Redis: https://redis.io/docs/getting-started/installation/install-redis-on-windows/
4. To install depedencies enter the following command in the back end directory
   ### `npm install`
5. To run Redis, open a wsl terminal and enter the following command:
   ### `redis-cli`
6. To run back end enter the following command in the back end directory
   ### `npm run dev`

Instruction to run the front end:

1. To install depedencies enter the following command in the front end directory:
   ### `npm install`
2. To run front end enter the following command in the front end directory:
   ### `npm start`
3. To run front end tests enter the following command in the front end directory:
   ### `npm run test`

TODO:

1. Add an infinite scroll to the Autocomplete dropdown to take advantage of pagination set up in the back end.
2. Add more tests to both back end and front end
3. pressing keydown while selecting input box jumps focus to first element of autocomplete dropdown
