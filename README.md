## Job Board with Next-JS
## A job board web app, 
- bulilt with Next-js, with typsescript extension 
- Graphql API for the queries of the jobs 
- Grabbed the API from Remotive public API and converted into JSON so it able to run the database locally

<img src="https://github.com/limooo196/jobboard-nextjs/blob/main/public/2.1-.png" alt="Alt text" title="Optional title">

### has paginations relative to the size of the data
<img src="https://github.com/limooo196/jobboard-nextjs/blob/main/public/2.2-.png" alt="Alt text" title="Optional title">

### has built-in search functions 
<img src="https://github.com/limooo196/jobboard-nextjs/blob/main/public/2.3-.png" alt="Alt text" title="Optional title">

### has modern dropdown to display the full details of the jobs and real clickable link on it
<img src="https://github.com/limooo196/jobboard-nextjs/blob/main/public/2.3-.png" alt="Alt text" title="Optional title">


## Run this project

First, run the backend server:
```bash 
cd ./pages/api
ts-node graphql.tsx
```
### You can skip this part if you want (This is just to test the Graphql queries )

### 1. Head over to your browser and go to "http://localhost:4000/api/graphql"
<img src="https://github.com/limooo196/jobboard-nextjs/blob/main/public/1.1-.png" alt="Alt text" title="Optional title">

### 2. Press the Query your server, if you want to test the grapqhl API with the Apollo server
<img src="https://github.com/limooo196/jobboard-nextjs/blob/main/public/1.2-.png" alt="Alt text" title="Optional title">


Second, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
<img src="https://github.com/limooo196/jobboard-nextjs/blob/main/public/2.1-.png" alt="Alt text" title="Optional title">


