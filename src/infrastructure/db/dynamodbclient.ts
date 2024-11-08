import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


export const dynamoDbClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: "us-east-1",
    ...(process.env.ENV === "development" && {
      endpoint: "http://localhost:8000",
      credentials: {
        accessKeyId: "fakeAccessKeyId",
        secretAccessKey: "fakeSecretAccessKey",
      },
    }),
  }),
);

export const docClient = DynamoDBDocumentClient.from(dynamoDbClient);
