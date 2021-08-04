# ticket_rest

"ticket_rest" is the rest API of "ticket-to-ride" project made in NodeJS.

This project uses typeorm and express.

## Installation

Use at least node v12.

Do a clean install :
```bash
npm ci
```

Create/update tables by running needed db migrations :
```bash
typeorm migration:run
```

## Development

To run the API locally using nodemon :
```bash
npm start
```

Or just using node :
```bash
node index.js
```

## Test

Tests made with chai and chai-http.

To run tests :
```bash
npm test
```
