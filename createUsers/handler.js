const aws = require("aws-sdk")
const { randomUUID }= require("crypto")


let dynamoDBClientParms ={}


if(process.env.IS_OFFLINE){

  dynamoDBClientParms= {
                         region: 'localhost',
                         endpoint: 'http://localhost:8003',
                         accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
                         secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
                      }
  

}


const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParms);


const createUsers= async (event, context) =>{

const id= randomUUID()

let userBody =JSON.parse(event.body)

userBody.pk=id

var params={
  TableName: 'usersTable',
  Item : userBody
};

console.log(params.Item)


 return dynamodb.put(params).promise().then(res =>{

  console.log(res)
  
  res= {
    statusCode: 200,
    body: JSON.stringify(
      {
        'user': params.Item
      }
    )
  };

  return res

});



}

module.exports ={
  createUsers
}













/*    var params={
       ExpressionAttributeValues:{
       ':s': 2,
       ':e': 9,
       ':topic': 'PHRASE'
       },
       KeyConditionExpression: 'Season = :s and Episode > :e',
       FilterExpression: 'contains (Subtitle, :topic)',
       TableName: 'EPISODES_TABLE'
    };
*/




/*
module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
*/