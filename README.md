# task_app_react_typescript
This application is developed for keeping track my daily tasks. This application is developed using React, Typescript, CI/CD Pipeline connected to AWS maintaining dev and prod version. Jest Unit tests and Cypress e2e tests are used. Now, it is developed using localstrorage, later a backend with database will be added. 

React Vite dev server is used to develop the application for faster development enviroment. The application performance issues will be taken care using different methodologies.

CI/CD
Vite dev server generates all the frontend build files to the folder dist/, That is why during CI/CD in the .yml file set source as dist/, from where the files are directly transfered to AWS for deployment.
