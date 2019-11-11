# [API] Safe-t - Smart IoT Applications for Orderly Traffic
This project is under development, feel free to contact me for question.

## Installation

#### Clone the repo
``` bash
$ git clone https://aldiw01@bitbucket.org/aldiw01/safe-t-api.git
```

#### Go into app's directory
``` bash
$ cd safe-t-api
```

#### Import database safe_t.sql into mySQL server

#### Install node and npm
For windows version, you can get it here -> https://nodejs.org/en/download/ 

#### Install app's dependencies
``` bash
$ npm install
```

## Set Environment Variables

#### Primary
```
APP_DATABASE_DB
APP_DATABASE_HOST
APP_DATABASE_PASSWORD
APP_DATABASE_USER
APP_EMAIL_NAME
APP_EMAIL_PASSWORD
APP_EMAIL_USER
APP_TOKEN_ADMIN_SECRET
APP_TOKEN_USER_SECRET
APP_URL_LOGIN
APP_URL_RESET_PASSWORD
```

#### Development Environment
```
NODE_ENV = development
```

#### Production Environment
```
APP_AWS_ACCESS_KEY
APP_AWS_BUCKET
APP_AWS_REGION
APP_AWS_SECRET_ACCESS_KEY
```

## Deploy API
``` bash
$ node src/index
```
or
``` bash
$ npm start
```
or
``` bash
$ yarn start
```

## Status Info
Info about Status ID, any configuration may change in future update.

#### User status
```
0. Not verified
1. Pending / Not Validated
2. Active/Staff (Admin)
3. Super Admin
9. Deactivated
```

#### Ticket status
```
0. Active
1. Closed
9. Archived
```

#### History status
```
0. Unread
1. Read
```

#### Reset Password status
```
0. Available User
1. Not available User
2. Available Admin
3. Not available Admin
```

#### Verification token status
```
0. Available User
1. Not available User
2. Available Admin
3. Not available Admin
```

#### Violation type
```
1. Lalu lintas
2. Identitas Pengendara
3. Atribut Kendaraan
4. Atribut Berkendara
5. Ugal-ugalan
```
