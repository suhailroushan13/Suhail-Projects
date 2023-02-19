# Serving-React-Builds_Library-Management-System

Library Management System (LMS) is a simple application that displays a list of available books in a Library and also lets us add new Books to the shelf. This was created to demonstrate how to serve react builds with Client Routing in a Node JS Server.

## SERVING BUILD
We use the express static middleware to serve our static build folder like shown below
``` 
app.use(express.static(path.join(__dirname, 'build')));
```
But serving the folder is not just enough since it is not a static website, our application has Client-Side Routing (React-Router) too.
Let's say */add/book* is a dynamic route in our react application, and there is a fresh page load for a */add/book*, the server looks for the file *build/add/book* and does not find it. The server needs to be configured to respond to a request to */add/book* by serving *index.html* For example, we can amend our Express example above to serve index.html for any unknown paths:

``` 
app.get("/*", (req, res) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
 });
```
## JENKINS PIPELINE TO SERVE BUILD
Jenkins can be helpful in writing a bash pipeline to deploy a MERN application by automating the process. Jenkins can be used to set up a series of steps (script) that can be used to deploy the application, including triggering the build process, running tests, and deploying the application. 
This script could include commands for building and deploying the application, as well as configuring the environment, such as setting up environment variables and integrating with other services. Additionally, Jenkins can also be used to monitor the deployment process, allowing users to keep an eye on the progress of the deployment.
