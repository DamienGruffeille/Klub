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
