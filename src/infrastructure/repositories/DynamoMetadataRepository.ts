import { docClient } from "@/infrastructure/db/dynamodbclient";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoMetadataRepository {
  private tableName = "starwars";
  private metadataPK = "Metadata#Counter";
  private metadataSK = "Counter";

  async getNextId(): Promise<number> {
    const updateCommand = new UpdateCommand({
      TableName: this.tableName,
      Key: { PK: this.metadataPK, SK: this.metadataSK },
      UpdateExpression: "SET currentIndex = if_not_exists(currentIndex, :start) + :inc",
      ExpressionAttributeValues: {
        ":start": 99,
        ":inc": 1,
      },
      ReturnValues: "UPDATED_NEW",
    });

    const result = await docClient.send(updateCommand);
    return result.Attributes?.currentIndex as number;
  }
}
