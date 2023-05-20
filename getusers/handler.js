const aws = require("aws-sdk")

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


const getUsers= async (event, context) =>{

let userId= event.pathParameters.id


var params={
  ExpressionAttributeValues:{
    ':pk': userId
  },
  KeyConditionExpression: 'pk= :pk',
  TableName: 'usersTable'
};


var salida=dynamodb.query(params).promise().then(res =>{

  console.log(res.Items)
  
  res= {
    statusCode: 200,
    body: JSON.stringify(
      {
        'user': res.Items
      }
    )
  };

  return res

});


 return salida
}

module.exports ={
  getUsers
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