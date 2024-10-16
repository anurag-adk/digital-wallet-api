# Digital Wallet API

## 🎉Welcome to the Digital Wallet API🎉

A REST API for managing digital transactions, user accounts and secure payments, functioning similar to a digital wallet like e-sewa or a banking app.

## Features

-   User registration and authentication (using JWT and bearer tokens)
-   Secure and stateless authorization with protected routes
-   Handle income and expenses
-   View 5 most recent transactions on a user dashboard

## Installation

1. Clone the git repository

```
git clone https://github.com/anurag-adk/digital-wallet-api.git
```

2. Navigate to the project directory

```
cd digital-wallet-api
```

3. Install dependencies

```
npm install
```

4. Set up the `.env` file as follows

```
PORT=your-port-number
db_conn=your-mongo-db-connection-string
secret_salt=your-secret-key
```

5. Start the server

```
npm start
```

### API Endpoints

| Method | Endpoint              | Description                            |
| ------ | --------------------- | -------------------------------------- |
| POST   | `/api/user/register`  | Register a new user                    |
| POST   | `/api/user/login`     | User login and bearer token generation |
| GET    | `/api/user/dashboard` | View latest 5 transactions (protected) |
| PATCH  | `/api/income/add`     | Add a new income entry (protected)     |
| PATCH  | `/api/expense/add`    | Add a new expense entry (protected)    |

### Contact

For queries or feedback, feel free to reach out to me at [iamanuragadhikari@gmail.com](mailto:iamanuragadhikari@gmail.com)
