# Northcoders News API



## Prerequisites
- [Node.js (v21.7.2)](https://nodejs.org)
- [PostgreSQL (v14.11)](https://www.postgresql.org/)

## Setup instructions

### 1 ) Clone the repository
``` bash 
git clone https://github.com/TianYu-00/nc-portfolio-1.git
cd nc-portfolio-1
```

### 2 ) Install dependencies
``` bash 
npm install
```
> [!NOTE]
Check the `package.json` file to see the list of dependencies being used, and install any missing ones accordingly.

### 3 ) Create your .env files in root directory

- create a `.env.development` file
- create a `.env.test` file

Or create them through the terminal:
``` bash
touch .env.development
touch .env.test
```

### 4 ) Add your environment variables to your .env files

In `.env.development` \
`PGDATABASE = development_database_name_here`

In `.env.test` \
`PGDATABASE = test_database_name_here`

Or add them through the terminal:
``` bash 
echo "PGDATABASE = development_database_name_here" > .env.development
echo "PGDATABASE = test_database_name_here" > .env.test
```

### 5 ) Setup your database in the terminal

``` bash
npm run setup-dbs
```
> [!NOTE]
This runs the script defined in `package.json` as `"setup-dbs": "psql -f ./db/setup.sql"`.

### 6 ) Seed your database in terminal

``` bash
npm run seed
```
> [!NOTE]
This runs the script defined in `package.json` as `"seed": "node ./db/seeds/run-seed.js"`.

## Running tests
To run tests, use:
``` bash
npm test test_file_name
# "test": "jest"
```
> [!NOTE]
This runs the script defined in `package.json` as `"test": "jest --runInBand"`.

## Try it out 
| Database is hosted on             | Project is deployed on        |
|-----------------------------------|-------------------------------|
| [Supabase](https://supabase.com/) | [Render](https://render.com/) |

#### To check for a list of access endpoints
https://nc-portfolio-1.onrender.com/api

> [!NOTE]
This project uses the free plan, which may spin down with inactivity, so it could take some time to load up.