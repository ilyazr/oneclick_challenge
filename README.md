# OneClick LCA challenge

## How to start the whole project?
`docker compose up -d`

## Backend
- Implemented simple JWT authentication, so the only "open" endpoints are: `/api/login`, `/api/signup`
- URL: `http://localhost:8080`
- Liveness probe: `/api/health`
- Calculation's endpoints: `/api/calc`
- Database UI: `http://localhost:8081` (MongoDB + Mongo Express)

## Frontend
- Local URL: `http://localhost:3000`
- Docker compose: `http://localhost` (Nginx proxy)

## MongoDB
- Root username: `admin`
- Root password: `admin`
- Main database: `oneclick`

## Curl examples

1. Sign in
```http request
curl --location --request POST 'http://localhost:8080/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"username": "ilyazr",
"password": "qwerty"
}'
```

2. Sign Up
```http request
curl --location --request POST 'http://localhost:8080/api/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "ilyazr",
    "firstName": "testdd",
    "lastName": "test",
    "password": "qwerty",
    "email": "testsadsa@mail.ru"
}'
```

3. Get previous calculations
```http request
curl --location --request GET 'http://localhost:8080/calc' \
--header 'Authorization: Bearer <JWT_TOKEN>'
```

4. Save calculations
```http request
curl --location --request POST 'http://localhost:8080/calc' \
--header 'Authorization: Bearer <JWT_TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "resource": {
            "resourceId" : "concreteC20",
            "name" : "Concrete C20/25",
            "impacts": [
                {
                    "impactGWP100_kgCO2e" : "0.0173",
                    "impactAP_kgSO2e" : "0.00307"
                }
            ]
        },
        "quantity": 12,
        "impactGWP100_kgCO2e_total": "0.3323223",
        "impactAP_kgSO2e_total": "0.18"
    },
    {
        "resource": {
            "resourceId" : "plywoodCoated",
            "name" : "Plywood, phenol coated",
            "impacts": [
                {
                    "impactGWP100_kgCO2e" : "0.00805",
                    "impactAP_kgSO2e" : "0.00075"
                }
            ]
        },
        "quantity": 14,
        "impactGWP100_kgCO2e_total": "0.3323223",
        "impactAP_kgSO2e_total": "0.18"
    }
]'
```