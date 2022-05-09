## Sing me a song

The API of the app to share your favourites songs, discover new ones and see the trendings.

Here you found

-   User ranked youtube music videos

-   e2e, integration and unit tests

## How to run

### Requirements

### [npm](https://www.npmjs.com/)

### [postgreSQL](https://www.postgresql.org/)

1. Clone this repository and setup the [front-end](https://github.com/CrystopherCarpenter/SingMeASong)
2. Install the dependencies

```bash
npm i
```

3. set your .env file

4. Create database with prisma

-   run on terminal

```bash
npx prisma init
npx prisma migrate dev
```

5. Run the project with

```bash
npm start
```

6. Run tests for the project

```bash
npm run test-coverage (backend/jest)

```
