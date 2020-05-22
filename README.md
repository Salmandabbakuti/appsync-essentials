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
