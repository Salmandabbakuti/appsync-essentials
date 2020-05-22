# appsync-essentials
AWS Appsync setup and workaround repository

#### Request & Response Mapping Templates for Resolvers -DynamoDB:

##### Add Movie
```
#Request
{
    "version" : "2017-02-28",
    "operation" : "PutItem",
    "key" : {
        ## If object "id" should come from GraphQL arguments, change to $util.dynamodb.toDynamoDBJson($ctx.args.id)
        "id": $util.dynamodb.toDynamoDBJson($util.autoId()),
    },
    "attributeValues" : $util.dynamodb.toMapValuesJson($ctx.args)
}

# Response
$util.toJson($ctx.result)
```
##### Update Movie
```
#Request
{
    "version" : "2017-02-28",
    "operation" : "PutItem",
    "key" : {
        ## If object "id" should come from GraphQL arguments, change to $util.dynamodb.toDynamoDBJson($ctx.args.id)
        "id": $util.dynamodb.toDynamoDBJson($ctx.args.id)
    },
    "attributeValues" : $util.dynamodb.toMapValuesJson($ctx.args)
}

#Response
$util.toJson($ctx.result)
```

##### Delete Movie
```
#Request
{
    "version" : "2017-02-28",
    "operation" : "DeleteItem",
    "key" : {
        ## If your table's hash key is not named 'id', update it here. **
        "id" : { "S" : "${ctx.args.id}" }
        ## If your table has a sort key, add it as an item here. **
    }
}

#Response
$util.toJson($ctx.result)
```
##### Get List of Movies
```
#Request
{
    "version" : "2017-02-28",
    "operation" : "Scan",
    
}
#Response
$util.toJson($ctx.result.items)
```
##### Get Movie By Id
```
#Request
{
    "version": "2017-02-28",
    "operation": "GetItem",
    "key": {
        "id": $util.dynamodb.toDynamoDBJson($ctx.args.id),
    }
}
#Response
$util.toJson($ctx.result)
```
#### Queries and Mutations

##### List of Movies
```
query{
  getMovies{
      id
      name
      producer
      rating
      rank
      }
   }
 ```
 ##### Get Movie By Id
 ```
 query{
  getMovie(id:"7hsdyyuewuewA"){
     id
     name
     producer
     rating
     rank
       }
     }
```
##### Add Movie
```
mutation{
  addMovie(name:"Terminator2", producer:"Gale Ann Hurd",rating:8.1, rank:44){
  name
  id
  rating
  rank
  producer
  }
}
```
##### Update Movie
```
mutation {
  updateMovie(id:"5ejjui8df87derre878",name:"Terminator",producer:"Gale Ann Hurd",rating:8.1,rank:19){
    name
    id
    rating
    rank
    producer
  }
}
```

##### Delete Movie
```
mutation {
  deleteMovie(id:"5ejjui8df87derre878"){
    name
    id
    rating
    rank
    producer
  }
}
```
##### Subscription
```
subscription {
  notification{
    name
    id
    rating
    rank
    producer
  }
}
```
