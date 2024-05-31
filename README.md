<div align="center">
<h1> Northcoders News API </h1> 
This project involves building an API designed to provide programmatic access to application data. The goal is to simulate the development of a real-world backend service (similar to Reddit) that delivers this data to the frontend architecture. <br><br>
  
[![madewithlove](https://img.shields.io/badge/made_with-❤-red?style=for-the-badge&labelColor=orange
)](https://github.com/Tianyu-00)

![image](https://github.com/TianYu-00/nc-portfolio-1/assets/66271788/b8927b69-328b-4a44-852e-cd9cdf394a75)
</div>

## Prerequisites
- [Node.js (v21.7.2)](https://nodejs.org)
- [PostgreSQL (v14.11)](https://www.postgresql.org/)

## Setup instructions

#### 1. Clone the repository
``` bash 
git clone https://github.com/TianYu-00/nc-portfolio-1.git
cd nc-portfolio-1
```

#### 2. Install dependencies
``` bash 
npm install
```
> [!NOTE]
Check the `package.json` file to see the list of dependencies being used, and install any missing ones accordingly.

#### 3. Create your .env files in root directory and add your environment variables to your .env files

| .env.development |.env.test | 
| --- | --- |
| PGDATABASE = development_database_name_here | PGDATABASE = test_database_name_here |

Or create and add them through the terminal:
``` bash 
echo "PGDATABASE = development_database_name_here" > .env.development
echo "PGDATABASE = test_database_name_here" > .env.test
```

#### 4. Setup your database in the terminal
``` bash
npm run setup-dbs
```

#### 5. Seed your database in terminal
``` bash
npm run seed
```

## Run Tests
To run tests, use:
``` bash
npm test test_file_name
```

## Give it a try

#### To check for a list of access endpoints
https://nc-portfolio-1.onrender.com/api
> [!NOTE]
This project uses the free plan, which may spin down with inactivity, so it could take some time to start up (50+ seconds).

#### Hosting Information
| Database is hosted on             | Project is deployed on        |
|-----------------------------------|-------------------------------|
| [Supabase](https://supabase.com/) | [Render](https://render.com/) |


