# Album Backend Assignment

API Documentation: https://documenter.getpostman.com/view/10417219/Szzkcctu?version=latest#d7526530-a758-4ea2-85a8-3aeeb3d91929

# Assumptions

APIs and Data Models used for building this Application was followed.

1. The `document` has an `id` field from the `API Specs`, it was assumed that the records are from a `data persistence` hence used the `MongoDB ObjectId` as the value of `id`.

# Pre-requisites

- [MongoDB](https://www.mongodb.com/)
- Node.js v.10+
- npm

# Getting Started

1. Install NPM Packages
```sh
$ npm install
```

2. Seed Data to Database
```sh
$ npm run database:seed
```

3. Run the Application
```sh
$ npm run dev
```

# Author

- James Levin Calado - levincalado@gmail.com