# NFS: node-file-sharer
Tired of uploading your files to random shady websites just to share them around?
What if you could have a simple, locally hosted solution to share files with anyone you wanted, with password-based authentication to boot?

Introducing `node-file-sharer`, a simple file-sharing application built with Node.js and Express.
Simply deploy it on your machine using `node server` and start sending your files to the appropriate endpoints.

## Features
- 1-click upload and share functionality
- Secure your shares with password-based authentication
- All files live on your local server

## Running locally
Follow these steps to setup `node-file-sharer` and start serving files locally:
1. Clone this repo  `git clone https://github.com/BarunKGP/nfs`
2. Change directories: `cd nfs`
4. Make sure you have Node.js and MongoDb installed. You can install the required dependencies using npm: `npm install`
5. Start the server: `node server`. By default this app starts at `localhost:5000`
