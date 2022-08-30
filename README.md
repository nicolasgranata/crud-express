# CRUD - Node.js and Express
CRUD made with Node.js and Express

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
The goal of this project is to be a starting point for a REST API made with Node.js and Express. More information about Nodejs ([here](https://nodejs.org/en/)) and Express ([here](https://expressjs.com/)).

<!-- GETTING STARTED -->
## Getting Started
Before running this project, please install the following software.

### Prerequisites
1. Install [Node.js LTS](https://nodejs.org/en/download/)
2. Install [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Installation
1. Clone the repo
   ```sh
    git clone https://github.com/nicolasgranata/crud-express.git
   ```
2. Inside the project folder CRUD-EXPRESS, run the following command to install NPM packages
   ```sh
    npm install
   ```
3. Create a new container with MongoDB by running the following command on bash or Powershell
   ```powershell
    docker run -d --name mongoc -v mongodata:/data -p 27017:27017 mongo
   ```

<!-- USAGE EXAMPLES -->
## Usage
You can run the application by executing the following command, inside the root folder

   ```sh
    npm run start
   ```

Then you can browse to http://localhost:3001/api/articles to test the get the articles or http://localhost:3001/api/comments?article=articleId to get the comments.

### Creating a new article
Using CURL, Postman or any other tool you can submit a POST request to this url http://localhost:3001/api/articles with this payload
```json
{
    "author": "author",
    "body": "Body",
    "title": "Title"
}
```

### Creating a new comment
Using CURL, Postman or any other tool you can submit a POST request to this url http://localhost:3001/api/comments with this payload
```json
{
    "articleId": "articleId",
    "author": "author",
    "body": "Body"
}
```

### Supported HTTP verbs
<ul>
    <li>PUT: To update a comment or an article</li>
    <li>DELETE: To delete a comment or an article</li>
</ul>

<!-- CONTRIBUTING -->
## Contributing

Feel free to contribute. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the ISC License. See [LICENSE](https://github.com/nicolasgranata/crud-express/blob/main/LICENSE) for more information.

<!-- CONTACT -->
## Contact

Nicolas Granata - [@nicolasgranata](https://twitter.com/nicolasgranata)

Project Link: [https://github.com/nicolasgranata/crud-express](https://github.com/nicolasgranata/crud-express)