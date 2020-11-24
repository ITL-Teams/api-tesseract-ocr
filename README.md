# Tesseract Express/Nodejs API

API for automatic attendance using chat screenshot and Tesseract OCR

## About

API that manages access to Tesseract OCR, it will provide an access-point via REST.

Requests will need to have the Google Meet chat image that contains attendance comments
composed of name and "Presente" message.

### Code and Testing

Typescript base code and then built into javascript code.

[Mocha] as test framework and [Chai] as assertion library.
There is a a github action workflow for branches.

## Project status

Project has done.

## Coding guidelines

Files and packages structure follow multitier architecture structure.
We're using prettier as code formatter, code is automatically formatted during git commit.

## Setup

### Requirements

This project is being developed and tested under the following:

- [Docker] (19.03.13) and [docker-compose] (1.27.4)
- [Nodejs] (v12.19.0)
- [Typescript] (4.0.3)

### Get Started

1. Build image `docker-compose build`
2. Run container `docker-compose up -d`

**Note:** docker-compose builds dev image (Dockerfile.dev), to deploy in web server please build the production image (Dockerfile.production)

### Testing

#### Automatic Tests

1. Install dependencies `npm ci`
2. Run Unit/Integration tests `npm test`

If you want to run e2e test, make sure the container is running, then:

- Run `npm run e2e`

#### Manual Tests

If you wish to test api manually, go to [app/test/http-requests](https://github.com/ITL-Teams/attendance-api-tesseract-ocr/tree/master/app/test/http-requests)

You will find the manual tests. API calls were performed using [rest-client] VSC Extension

### Package.json Scripts

To run the scripts do: `npm run <script-name>`

- **test:** Runs Unit and Integration Tests
- **e2e:** Runs E2E Tests (this require container to be running)
- **build:** Builds ts code into js code (this runs inside Dockerfile.production)
- **format:** Code formatter (prettier)
- **docker:container:dev:** Runs dev node app inside the container

### About API

#### Get Student/Attendance list

| URL    | /api/attendance-list |
| ------ | -------------------- |
| METHOD | GET                  |

#### Clean Student/Attendance list

| URL    | /api/clean-student-list |
| ------ | ----------------------- |
| METHOD | GET                     |

#### Update Student/Attendance list

| URL     | /api/update-student-list       |
| ------- | ------------------------------ |
| METHOD  | UPDATE                         |
| HEADERS | Content-Type: application/json |

[Body Example](https://github.com/ITL-Teams/attendance-api-tesseract-ocr/blob/master/app/test/http-requests/api-methods.http)

```
{
  students: array({
    realName: string
    meetName: string
  })
}
```

#### Update Student/Attendance list

| URL     | /api/take-attendance           |
| ------- | ------------------------------ |
| METHOD  | POST                           |
| HEADERS | Content-Type: application/json |

[Body Example](https://github.com/ITL-Teams/attendance-api-tesseract-ocr/blob/master/app/test/http-requests/test_1_ocr.http)

```
{
  img: string
}
```

**Note:** "img" is base64 encoded Google Meet chat image

[sinon.js]: https://sinonjs.org/
[mocha]: https://mochajs.org/
[chai]: https://www.chaijs.com/
[docker]: https://www.docker.com/
[docker-compose]: https://docs.docker.com/compose/
[nodejs]: https://nodejs.org/es/
[typescript]: https://www.typescriptlang.org/
[rest-client]: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
