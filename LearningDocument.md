First time run: 
npx create-react-app my-app

to start the webpage navigate to my-app and use the command
npm start


to edit the main page, edit my-app/src/App.js

when you edit only js files, then save, the app will auto reload

when you are trying to write functions for components to fire write them as lambdas as such 
onClick={() => console.log('click')}
If you only write like this
onClick={console.log('click')}
then the console prints click whenever the component is rendered as well as on click

Also the lambda is still required when calling a function in the onClick, otherwise the function will not be registered correctly.
onClick={() => functionName()} //works as intended and does not run on render
vs 
onClick={functionName()} //Does not work TODO: why does this not work?


