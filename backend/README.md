# Todo Backend API

A simple todo list application for the purpose of learning backend development, this todo application will implement advance concepts such as session & cookies, authenticcation, authorization etc

## Getting Started

You can visit the root [README.md](/README.md) to read about the project and installation procedures

1. Perequisites

- [Postman](https://www.postman.com/) # allow you to test the route without interacting with the frontend.

2. Ruuning the API

- The API consist of `GET`, `PATCH`, `DELETE`, and `POST` routes this routes allows users to test the todo API.
  The server runs on `http:\\localhost:4500` which is also considered the base routes.

3. Run each routes

   `GET http://localhost:4500` returns the index page with a simple object

```json
{
  "status": "OK",
  "statusCode": 200,
  "message": "Todo list API"
}
```

`GET http://localhost:4500/todos` returns an array of todos

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

`GET http://localhost:4500/todos/1` returns an array of a single items that matches the supplied id

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

`POST http://localhost:4500/todos` returns a response of todo successfully created the todo will be sent via the `req.body`

```json

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

`PATCH http://localhost:4000/todos/1` returns a response of a todo been succesfully updated, the update todo will be sent via the `req.body`

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

`DELETE http://localhost:4000/todos/1` returns a response of a todo been succesfully deleted

```json
{
  "status": "OK",
  "statusCode": 200,
  "message": "Todo deleted succesfully"
}
```
