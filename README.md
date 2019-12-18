# service-structure

Some simple patterns for integrating and organizing API related code.

> Note: Directory structure and naming is far less important than consistency here. I have kept the component and data fetching code purposely simple here. Everything except for the code under components is React agnostic and this can be used in any JavaScript application. If you are using React, it may be worth reviewing how I use useEffect here for cleaning up and cancelling.

<a title="Jon Sullivan [Public domain], via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Fractal_Broccoli.jpg"><img alt="Fractal Broccoli" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Fractal_Broccoli.jpg/512px-Fractal_Broccoli.jpg"></a>

For some reason, clean API code reminds me of Romanesco broccoli as it can be a beautiful specimen, very well formed and consistent, and mostly symmetrical. If you haven't tried it yet, it is delicious!

## Key Points

---

### 1. Consistent Endpoint Constants (constants/API.js and constants/API_MOCK.js)

- Best Practices
  - Centralize constants with properties that can be used by the data helpers. This example uses a key for debugging, method to denote the REST HTTP verb, and a resource method for building the endpoint URL based on parameters.
  - Create mocks that mimic what is in the real API. If possible ensure these mocks are relational. This example includes a mock method that returns data from services/data/\*.

> These constants can be broken up further as needed if they get too large.

---

### 2. Centralized Data Fetching (helpers/fetchHelper.js)

- Advantages

  - Prevents code redundancy.
  - Keeps auth headers consistent.
  - Centralized logging and error handling.
  - Allows for easier refactoring.

- Considerations

  - Return a request and cleanup function you can use to prevent memory leaks.
  - Return data and original response from request.
  - Use mock methods that allow you to override a fetch call.
  - Polyfill [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

> This example uses a simple fetchHelper to handle basic REST API methods. Alternatively, a library like [axios](https://github.com/axios/axios) can be wrapped here.

---

### 3. Services for Bridging Components and Data Fetching (services/todo.service.js)

- Considerations

  - Use a class to instantiate or simple module pattern.
  - Return methods that take parameters and return a fetch helper call with an API method.
  - Include any transformation methods here. If your API is being developed in tandem and you don't know the schema, this is a good place for handling any transformation. It will be far easier to handle this in one place than throughout your data binding. Also, consider using transforming objects into arrays as this offers many advantages.

---

## Basic Workflow

- Components get data and cleanUp functions via services.
  - Service and API can be passed as properties or imported.
  - If the API is passed as a property, it can be used to "instantiate" a service. In this case I use a simple module pattern.
- Service code calls and returns fetchHelper with API endpoint and parameters.

---

## Language Considerations

It gets a little tricky when navigating between REST, JavaScript, and HTML naming conventions, so you will want to decide on a naming convention that is consistent. For example, the REST verb to remove is `DELETE` which is a reserved word (when lower-case) in JavaScript. Input elements also use an `onchange` event handler which is linguistically different than the REST `PUT` verb. You can't change the HTTP verbs for REST, but you can change the words you use to describe your interaction with them. Here is a basic convention of how this is used in this project. Again, the most important thing is consistency.

| HTTP_VERB | Constant Name    | Method Name    |
| --------- | ---------------- | -------------- |
| GET       | GET or GET_BY_ID | get or getById |
| POST      | ADD              | add            |
| PUT       | UPDATE           | update         |
| DELETE    | REMOVE           | remove         |
