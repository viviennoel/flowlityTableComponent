# Technical test flowlity

![alt text](https://res.cloudinary.com/viviennoel07/image/upload/v1639966299/Capture_d_e%CC%81cran_2021-12-20_a%CC%80_03.11.08_rhirv1.png)

# GETTING STARTED

### To start the webapp :

This webapp was developed with Vue 3 in order to be close of the current technology used by Flowlity. It includes a JSON-server and some data for the modelisation of the stock evolution.

#### Install packages

The setup of the project with vue CLI present many vulnerabilities with some high.
In order to preserve the security ans integrity of the solution, they have been corrected and the packages deprecated updated.

In order to install the packages without vulnerabilities, use the command bellow:

```
npm ci
```
![alt text](https://res.cloudinary.com/viviennoel07/image/upload/v1639986999/Capture_d_e%CC%81cran_2021-12-20_a%CC%80_08.56.18_a1wjzs.png)

The command npm ci is necessary to download the correcetd dependencies.

![alt text](https://res.cloudinary.com/viviennoel07/image/upload/v1639968201/Capture_d_e%CC%81cran_2021-12-20_a%CC%80_03.43.12_n0bbi4.png)

## Project setup

### Compiles and hot-reloads for development

Now that npm have installed the dependencies, you can start the web application with the following command:

```
npm run serve
```

### Start json server

The application uses JSON-server in order to save the database.
After testing on a windows computer, it appears that the cross-origins can be an issue (front running on localhost:8080 & server on localhost:3001).
The application runs correctly on mac. In the event of an issue with saving the data, you need to Run Chrome browser without CORS.
##### N.B: the correct fix is adding "Access-Control-Allow-Origin" values needed, with an env variable for dev.
##### https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en

Run in a new terminal

```
npm run db:serve
```

***success! Your app is ready and ready to use at http://localhost:8080***

You can then launch the unit and no regression tests with the following commands.
N.B: A test plan need to be established for an application in order to test every behavior. Because of the time allowed to this test, this plan haven't been complited.  

### Run your unit tests

In order to run the unit tests, use the command bellow.
The following result is expected if the tests are passed successfully.

![alt text](https://res.cloudinary.com/viviennoel07/image/upload/v1639968306/Capture_d_e%CC%81cran_2021-12-20_a%CC%80_03.44.56_vmepbk.png)

```
npm run test:unit
```

### Run the functional tests

In order to run the functionnal (or no regression) tests, use the command bellow.
The following result is expected if the tests are passed successfully.
#### N.B: The tests with Cypress are targeting the local url for this exercice. Therefore you need to have started the web app first and have it running on localhost:8080

![alt text](https://res.cloudinary.com/viviennoel07/image/upload/v1639968336/Capture_d_e%CC%81cran_2021-12-20_a%CC%80_03.45.28_kqoje4.png)

```
npm run test:cypress
```

# KEY FUNCTIONALITIES OF THIS EXERCICE

## The requirements

**It should be able to at least...**

- display multiple rows
- take input in a row that impact other rows
- take basic styling options by row, column or cell
- have 1-level nested sub-rows (a parent row can have children rows)
- be tested

**Output**

- a frontend app that works locally, use the frontend framework you love
- no backend server → fake API calls, choose your own data structure, use JSONs as data source (we will change the raw data manually to test it)
- document your choices in a README as much as possible

**What we will look at**

- architecture choices
- data structure
- data storage (locally or in store)
- clean code best practices
- what you test

## The solution provided

#### On multiple rows the application provide the functionalities:
- display multiple rows **COMPLIANT**
##### In order to create an useful solution, I thought on the business need for my solution.
The table component is reusable (and reused) for the page dashboard and the page warehouse ans present different properties and dataset according the props passed in the parent component. For this reason, the page warehouse is presenting a table "readOnly" that **won't be saved upon modification**.

- take input in a row that impact other rows **COMPLIANT**
##### The user is able to modify every value of the table. Those changes are reflected in the graph component.
The expected stock value for each day and the real stock through a nested table updating dynamically the parent-table property 'realStock'.
The addition of new suppliers is as well taken into account.

- take basic styling options by row, column or cell **COMPLIANT**
##### The user sees which day is displayed in the nested row with a dynamic styling of the first row.
##### In addition, for the business need, I added a conditional style on the row realStock. The input background is green if the difference between expected and real is lower than 20% of the expected value. Otherwise, the cell is getting red and darker while this difference increases.

- have 1-level nested sub-rows (a parent row can have children rows) **COMPLIANT**
##### The user is able to see for every day the provider's stock. this nested rows are linked to the parent rows. The update of one of these rows is reflected in the parent table.
The information is saved in the database (I used JSON-parser to simulate an API, and a local json file to save the data).
##### Store
The store Vuex have been implemented in order to save the data locally, and an export to the json have been implemented to save the data on long term.
Each export is tagged with the date and an id of export in order to keep track of the modifications.

- be tested **COMPLIANT**
##### Jest - unit tests
Jest have been used in order to carried out unit tests.
Use of BeforeEach to avoid redondancies.

##### Cypress - no regression tests
Cypress have been used in order to carried out no regression tests.
Use of BeforeEach to avoid redondancies.

A video of the test is available in './cypress/videos'
[![asciicast](https://res.cloudinary.com/viviennoel07/image/upload/c_scale,w_412/v1639990516/Capture_d_e%CC%81cran_2021-12-20_a%CC%80_09.54.59_idcwqg.png)](https://res.cloudinary.com/viviennoel07/video/upload/v1639990434/home.spec.js_l09bdd.mp4)

#### A project well structured and documented:
- a frontend app that works locally, use the frontend framework you love **COMPLIANT - Vue 3**
- no backend server → fake API calls, choose your own data structure, use JSONs as data source (we will change the raw data manually to test it) **COMPLIANT - JSON SERVER & Files**
- document your choices in a README as much as possible **Many comments are present in the code as well**

# VULNERABILITY

the command 'npm audit' allows us to identify clearly the vulnerabilities of the application.
The vulnerabilities have been corrected for this application.

# TESTS AND AREAS OF IMPROVEMENT

##### Browser compatibility

The webapp have been tested on Edge, Chrome, Internet Eplorer and it appears that Vue 3 is incompatible with IE11.
https://javascript.developpez.com/actu/315131/Vue-js-3-abandonne-finalement-son-plan-visant-a-prendre-en-charge-Internet-Explorer-11-les-developpeurs-qui-supportent-le-navigateur-devront-rester-sur-Vue-js-2-7/

"Incompatibilité de comportement
Selon l'équipe, le système de réactivité de Vue.js 2 est basé sur des getters/setters ES5. Vue.js 3 quant à lui exploite les proxys ES2015 pour un système de réactivité plus performant et plus complet, qui ne peut pas être polyfillé dans IE11. Selon elle, c'est le principal obstacle, car cela signifie que pour que Vue.js 3 prenne en charge IE11, il faut essentiellement livrer deux versions différentes avec un comportement différent : l'une utilisant le système de réactivité basé sur les proxys, et l'autre utilisant les getters/setters ES5 comme pour Vue.js 2."

##### Vue style guide

Find bellow the style guide and Vue 3 directives to be reviewed and improved.
https://v3.vuejs.org/style-guide/

The prioritary points to me would be to:
- Improve the type of data (typescript) in particular creating Interfaces for complex data.
- Detail props definition (potentially with a validator)

## Some other useful command

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
