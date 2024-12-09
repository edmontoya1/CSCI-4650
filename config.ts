import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const awsCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const dynamoConfig = {
  region: process.env.AWS_REGION,
  credentials: awsCredentials,
} as {
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

const client = new DynamoDBClient(dynamoConfig);

export { client };
