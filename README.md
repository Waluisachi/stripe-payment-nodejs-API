# stripe-payment-nodejs-API
## Getting started
### Clone repository
``` git clone https://github.com/Waluisachi/stripe-payment-nodejs-API.git ```
### Install dependencies
``` npm install ```
### Run payment server
``` npm start ```
#### Sample use
##### Call API endpoint
``` http://localhost:8080/pay ```
##### Pass the following as the body
````
 {
    "items":[
        {
            "id": 1,
            "quantity": 10
        },
        {
            "id": 2,
            "quantity": 4
        }
    ]
 }
 ````
#### Author: Waluisachi
