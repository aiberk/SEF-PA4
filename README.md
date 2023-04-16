# Transaction App

Transaction App in Express/Mongoose

## Dowload

Fork repo from https://github.com/aiberk/SEF-PA4

git clone <your-repository-url>

## Run Locally

Fork the project

```bash
  https://github.com/aiberk/SEF-PA4
```

Clone the project

```bash
  git clone <your-fork-repository-url>
```

Go to the project directory

```bash
  cd SEP-PA04
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Troubleshooting and FAQ

MonogoDB authentication error
change this line in app.js file

```bash
const mongodb_URI =
  process.env.MONGODB_URI || "mongodb://root:root@localhost:27017/";
```

to this line interchangably

```bash
  const mongodb_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/";
```

## Installation

### How to Install MongoDB on Windows

To install MongoDB on Windows, follow these steps:

Download the latest version of MongoDB from the official website. Choose the version that matches your Windows operating system (32-bit or 64-bit).

Run the installer file and follow the installation wizard.

Choose the Complete setup type during the installation process to install all the MongoDB components including the MongoDB Server, MongoDB Compass (a graphical user interface for MongoDB), and MongoDB Tools.

Add the MongoDB bin directory path to the PATH environment variable during installation. This will allow you to run MongoDB commands from any location in the command prompt.

To verify the installation, open the command prompt and run the command mongo --version. This should display the version of MongoDB installed on your machine.

Finally, start the MongoDB server by running the command mongod in the command prompt. By default, MongoDB will use the data directory C:\data\db to store its data files.

### How to Install MongoDB on Mac

To install MongoDB on Mac, follow these steps:

Open your terminal application.

Install Homebrew by running the following command in your terminal:

bash
Copy code
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
Install MongoDB by running the following command in your terminal:

css
Copy code
brew install mongodb-community@5.0
After installation, create a data directory where MongoDB will store its data files. You can do this by running the following command in your terminal:

bash
Copy code
sudo mkdir -p /data/db
Note: You may need to provide your system password to run this command.

Change the permissions of the data directory to allow your user account to read and write data to it by running the following command:

bash
Copy code
sudo chown -R `id -un` /data/db
Start the MongoDB server by running the following command in your terminal:

sql
Copy code
brew services start mongodb-community@5.0
To verify that MongoDB is running, open a new terminal window and run the following command:

Copy code
mongo
This should open the MongoDB shell, where you can run various commands to interact with your database
