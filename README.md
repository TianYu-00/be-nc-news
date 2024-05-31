# Northcoders News API



## Prerequisites
- Node.js (v21.7.2 <--- Version used when creating the project)
- PostgreSQL (v14.11 <--- Version used when creating the project)

## Setup instructions

### 1 ) clone the repository
``` bash 
git clone https://github.com/TianYu-00/nc-portfolio-1.git
cd nc-portfolio-1
```

### 2 ) install dependencies
``` bash 
npm install
```
> [!NOTE]
Please check `package.json` file to see the list of dependencies being used, and install it accordingly if any is missing.

### 3 ) create your .env files in root directory

- create a `.env.development` file
- create a `.env.test` file

or create it through terminal.
``` bash
touch .env.development
touch .env.test
```

### 4 ) add your environment variables to your .env files

in `.env.development` \
`PGDATABASE = development_database_name_here`

in `.env.test` \
`PGDATABASE = test_database_name_here`

or add it through terminal.
``` bash 
echo "PGDATABASE = development_database_name_here" > .env.development
echo "PGDATABASE = test_database_name_here" > .env.test
```

### 5 ) setup your database in terminal

``` bash
npm run setup-dbs
# "setup-dbs": "psql -f ./db/setup.sql"
```

### 6 ) seed your database in terminal

``` bash
npm run seed
# "seed": "node ./db/seeds/run-seed.js"
```

## Running tests

``` bash
npm test test_file_name
# "test": "jest"
```

## Try it out 

#### Database is hosted on
https://supabase.com/
#### Project is deployed on 
https://render.com/

#### To check for a list of access endpoints
https://nc-portfolio-1.onrender.com/api

> [!NOTE]
This project is using the free plan which would spin down with inactivity, so it could take some time to load up.