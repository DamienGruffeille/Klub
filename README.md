# STUDY CASE - bank_api

Test to be passed for my end of year traineeship.  
Had to define a database schema for handling bank transactions by creating a webhook to post transactions.  
Set a cashback system, and creation of a merchant DB.

## Database Schema

![dbSchema](https://user-images.githubusercontent.com/107174519/200319553-8fe5ca94-2885-463c-8281-22f8ccf03b37.jpg)

## Dependencies

Typescript  
Express  
DB : Postgresql  
ORM : TypeOrm

## DIR

src / entities : entities' definition  
src / controllers : controllers for each endpoints  
src / routes : routes parameters for the different endpoints  
src / init / app : application  
src / init / config : definition of the configuration  
src / init / data-source : datasource creation

## launching server

npm run start
a set of data will be added when server launched

## api endpoints

- to post a transaction : localhost:3000/api/webhooks/transactions
- to see all transactions by user : localhost:3000/api/user/:id/transactions where :id = app user id to display
- to see all cashbacks by user : localhost:3000/api/user/:id/cashbacks where :id = app user id to display
- to see total cashback amount by merchant : localhost:3000/api/admin/merchant/cashback
- to see list of merchant with 2 differents buyers : localhost:3000/api/admin/merchant/twobuyers
- to get top10 of non partner merchant : localhost:3000/api/admin/topten

## precisions

If a transaction is posted, and the merchant is unknown on DB, he will be automatically created with a non partner status
