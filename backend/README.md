<h1 align="center" style="font-weight: bold;"> Todo Backend ⚙️</h1>

<p align="center">
  <a href="#tech">Technologies</a> |
  <a href="#started">Getting Started</a> |
  <a href="#database"> Database Installation</a> |
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

```
/todo
|--- /backend
     |--- /controllers
     |    |--- error.ts             # Handles routes that doesn't exist #404
     |    |--- todo.ts              # Handles functions for each routes and their responses
     |--- /models
     |    |--- todo.ts              # Schema on how to handle the todo database
     |--- /routes
     |    |--- todoRoutes.ts        # Handles and export all `ROUTES` using express router
     |    |--- error.ts             # Handle and export routes that are not found
     |--- /types
     |    |--- index.ts             # Handles all type related to the todo data
     |--- /utils                    # Handles reusable functions
     |--- app.ts                    # Main server entrance
     |--- package.json              # All project dependencies related to the backend
     |--- tsconfig.json
     |--- README.md
```

<h2 id="started"> Getting Started </h2>

You can visit the root [README.md](/README.md) to read about the project and installation procedures.

<h2 id="database"> Database Installation </h2>

### MongoDB Installation & Setup Guide

A step-by-step guide to installing MongoDB and MongoDB Compass on Windows, macOS, and Linux.

### Windows

#### 1. Install MongoDB

1. Go to the [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Select:
   - **Version**: Latest stable
   - **Platform**: Windows
   - **Package**: MSI
3. Run the downloaded `.msi` installer
4. Follow the setup wizard:
   - Choose **Complete** installation
   - Check **Install MongoDB as a Service** (recommended)
   - Leave the service name as `MongoDB`
   - Note the data directory (default: `C:\Program Files\MongoDB\Server\<version>\data`)
5. **Uncheck** "Install MongoDB Compass" — we will install it separately

#### 2. Add MongoDB to PATH

1. Search for **Environment Variables** in the Start menu
2. Click **Edit the system environment variables**
3. Under **System Variables**, find and select **Path**, then click **Edit**
4. Click **New** and add:
   ```
   C:\Program Files\MongoDB\Server\<version>\bin
   ```
   Replace `<version>` with your installed version (e.g. `7.0`)
5. Click **OK** to save

#### 3. Start MongoDB Service

MongoDB runs as a Windows service automatically after installation. To manually start/stop it:

```powershell
# Start
net start MongoDB

# Stop
net stop MongoDB
```

Or manage it via **Services** (`services.msc`) in the Start menu.

#### 4. Install MongoDB Compass

1. Go to the [MongoDB Compass Download page](https://www.mongodb.com/try/download/compass)
2. Select **Windows** and download the `.exe` installer
3. Run the installer and follow the prompts

---

### macOS

#### 1. Install MongoDB via Homebrew (Recommended)

If you don't have Homebrew installed, install it first:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install MongoDB:

```bash
# Add the MongoDB tap
brew tap mongodb/brew

# Install MongoDB Community Edition
brew install mongodb-community
```

#### 2. Start MongoDB

```bash
# Start MongoDB as a background service
brew services start mongodb-community

# Stop MongoDB
brew services stop mongodb-community

# Restart MongoDB
brew services restart mongodb-community
```

To run MongoDB manually without it starting on login:

```bash
mongod --config /usr/local/etc/mongod.conf --fork
```

#### 3. Install MongoDB Compass

```bash
brew install --cask mongodb-compass
```

Or download the `.dmg` manually from the [MongoDB Compass Download page](https://www.mongodb.com/try/download/compass), open it, and drag MongoDB Compass to your **Applications** folder.

---

### Linux

Instructions below are for **Ubuntu/Debian**. For other distributions, refer to the [official docs](https://www.mongodb.com/docs/manual/administration/install-on-linux/).

#### 1. Install MongoDB

```bash
# Import the MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Create the list file for your Ubuntu version
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
  https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list and install
sudo apt-get update
sudo apt-get install -y mongodb-org
```

#### 2. Start MongoDB

```bash
# Start the MongoDB service
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod

# Stop MongoDB
sudo systemctl stop mongod

# Restart MongoDB
sudo systemctl restart mongod
```

If you get a `Failed to start mongod.service` error, run:

```bash
sudo systemctl daemon-reload
sudo systemctl start mongod
```

#### 3. Install MongoDB Compass

```bash
# Download the .deb package
wget https://downloads.mongodb.com/compass/mongodb-compass_1.42.2_amd64.deb

# Install it
sudo dpkg -i mongodb-compass_1.42.2_amd64.deb
```

> **Note:** Check the [Compass releases page](https://www.mongodb.com/try/download/compass) for the latest version number and replace `1.42.2` accordingly.

Launch Compass from your applications menu or by running:

```bash
mongodb-compass
```

---

### Connecting with MongoDB Compass

1. Open **MongoDB Compass**
2. You will see a **New Connection** screen
3. For a local connection, use the default connection string:
   ```
   mongodb://localhost:27017
   ```
4. Click **Connect**
5. You should see your local MongoDB instance with its default databases (`admin`, `config`, `local`)

#### Creating a Database

1. Click **Create Database** in the left sidebar
2. Enter a **Database Name** (e.g. `todo-app`)
3. Enter an initial **Collection Name** (e.g. `users`)
4. Click **Create Database**

#### Verifying Your Setup

Run the following in your terminal to confirm MongoDB is running correctly:

```bash
# Open the MongoDB shell
mongosh

# Inside the shell, check the connection
db.runCommand({ ping: 1 })
# Expected output: { ok: 1 }

# List all databases
show dbs

# Exit the shell
exit
```

If `mongosh` is not found, install it separately from the [MongoDB Shell download page](https://www.mongodb.com/try/download/shell).

---

## Troubleshooting

| Issue                              | Fix                                                  |
| ---------------------------------- | ---------------------------------------------------- |
| `mongod` not found                 | Add MongoDB `bin` directory to your PATH             |
| Port 27017 already in use          | Run `sudo lsof -i :27017` and kill the process       |
| Permission denied on Linux         | Run `sudo chown -R mongodb:mongodb /var/lib/mongodb` |
| Compass won't connect              | Make sure the `mongod` service is running            |
| `brew: command not found` on macOS | Install Homebrew first (see macOS section)           |

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
  "success": true,
  "message": "Todo list API"
}
```

---

**REQUEST**  
`GET http://localhost:4500/todos`

**RESPONSE**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Cook beans",
      "description": "I cook my own beans",
      "completed": false
    },
    {
      "id": 2,
      "title": "Walk the dog",
      "description": "Walk the dog around the neighborhood",
      "completed": false
    },
    {
      "id": 3,
      "title": "Clean the house",
      "description": "make sure the mop every 48hours",
      "completed": false
    }
  ]
}
```

---

**REQUEST**  
`GET http://localhost:4500/todos/1`

**RESPONSE**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Cook beans",
    "description": "I cook my own beans",
    "completed": true
  }
}
```

---

**REQUEST**  
`POST http://localhost:4500/todos`

```json
{
  "title": "Excersice",
  "description": "Go to the gym by 4pm"
}
```

**RESPONSE**

```json
{
  "success": true,
  "data": {
    "id": 4,
    "title": "Excersice",
    "description": "Go to the gym by 4pm",
    "completed": false
  }
}
```

---

**REQUEST**  
`PATCH http://localhost:4000/todos/1`

```json
{
  "title": "COOK BEANS",
  "completed": true
}
```

**RESPONSE**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "COOK BEANS",
    "description": "This info was editted",
    "completed": true
  }
}
```

---

**REQUEST**  
`DELETE http://localhost:4000/todos/1`

**RESPONSE**

```json
return a 204 status
```
