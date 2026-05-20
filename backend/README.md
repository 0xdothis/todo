<h1 align="center" style="font-weight: bold;"> Todo Backend ⚙️</h1>

<p align="center">
  <a href="#tech">Technologies</a> |
  <a href="#started">Getting Started</a> |
  <a href="#routes">API Endpoints</a> 
</p>

<p align="center"> <b>A simple todo list application for the purpose of learning backend development, this todo application will implement advance concepts such as session & cookies, authenticcation, authorization etc</b> </p>

<h2 id="tech"> Technologies </h2>
- [NodeJS][1] V18 or later        # Javascript runtime environment
- [Git][2]                        # Distributed version control system
- [Express][3]                    # Web Framework Library for routes
- [Postman][4]                    # Testing of API endpoints

[1]: https://nodejs.org
[2]: https://git-scm.com/
[3]: https://expressjs.com
[4]: https://postman.com

<h2> Respository Structure </h2>  
/todo \ 
|--- /backend  \
     |--- /controllers  
     |    |--- error.ts             # Handles routes that doesn't exist #404  \
     |    |--- todo.ts              # Handles functions for each routes and their responses  \
     |--- /models  
     |    |--- todo.ts              # Schema on how to handle the todo database  \
     |--- /routes  \
     |    |--- todoRoutes.ts        # Handles and export all `ROUTES` using express router  \
     |    |--- error.ts             # Handle and export routes that are not found  \
     |--- /types  \
     |    |--- index.ts             # Handles all type related to the todo data  \
     |--- /utils                    # Handles reusable functions  \
     |--- app.ts                    # Main server entrance  \
     |--- package.json              # All project dependencies related to the backend  \
     |--- tsconfig.json  \
     |--- README.md  \

<h2 id="started"> Getting Started </h2>

You can visit the root [README.md](/README.md) to read about the project and installation procedures

<h2 id="routes"> API Endpoints 📍 </h2>

<p>The API consist of `GET`, `PATCH`, `DELETE`, and `POST` routes this routes allows users to test the todo API.
  The server runs on `http:\\localhost:4500` which is also considered the base route.</p>

| Route                             | Description                                                |
| --------------------------------- | ---------------------------------------------------------- |
| <kbd> GET / </kbd>                | retrieves necessary information for the homepage           |
| <kbd> GET /todos </kbd>           | retrieves all the todos                                    |
| <kbd> GET /todos/todoId </kbd>    | retrieves a todo that matches the id                       |
| <kbd> POST /todos </kbd>          | send the `req.body` to create a new todo item              |
| <kbd> PATCH /todos/todoId </kbd>  | update the todo fields that matches the id in `req.params` |
| <kbd> DELETE /todos/todoId </kbd> | delete a todo that matches the id in the `req.params`      |

<h3> Sample Request/Response per Route </h3>

**REQUEST**  
`GET http://localhost:4500`

**RESPONSE**

```json
{
  "status": "OK",
  "statusCode": 200,
  "message": "Todo list API"
}
```

---

**REQUEST**  
`GET http://localhost:4500/todos`

**RESPONSE**

```json
{
  "status": "OK",
  "statusCode": 200,
  "data": {
    "todos": [
      {
        "id": 1,
        "title": "Cook beans",
        "description": "I cook my own beans"
      },
      {
        "id": 2,
        "title": "Walk the dog",
        "description": "Walk the dog around the neighborhood"
      },
      {
        "id": 3,
        "title": "Clean the house",
        "description": "make sure the mop every 48hours"
      }
    ]
  }
}
```

---

**REQUEST**  
`GET http://localhost:4500/todos/1`

**RESPONSE**

```json
{
  "status": "OK",
  "statusCode": 200,
  "data": {
    "todos": [
      {
        "id": 1,
        "title": "Cook beans",
        "description": "I cook my own beans"
      }
    ]
  }
}
```

---

**REQUEST**  
`POST http://localhost:4500/todos`

```json
{
  "id": 4,
  "title": "Excersice",
  "description": "Go to the gym by 4pm"
}
```

**RESPONSE**

```json
{
  "status": "OK",
  "statusCode": 200,
  "message": "Todo created succesfully",
  "data": {
    "id": 4,
    "title": "Excersice",
    "description": "Go to the gym by 4pm"
  }
}
```

---

**REQUEST**  
`PATCH http://localhost:4000/todos/1`

```json
{
  "id": 1, // Originally won't be sending the ID along but currently we are not saving to any database
  "title": "COOK BEANS",
  "description": "This info was editted"
}
```

**RESPONSE**

```json
{
  "status": "OK",
  "statusCode": 200,
  "message": "Todo updated succesfully",
  "data": {
    "status": "OK",
    "statusCode": 200,
    "message": "Todo Created Succefully",
    "data": [
      {
        "id": 1,
        "title": "COOK BEANS",
        "description": "This info was editted"
      }
    ]
  }
}
```

---

**REQUEST**  
`DELETE http://localhost:4000/todos/1`

**RESPONSE**

```json
{
  "status": "OK",
  "statusCode": 200,
  "message": "Todo deleted succesfully"
}
```
