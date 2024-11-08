import { PeopleEntity } from "@/domain/entities/PeopleEntity";
import { IPeopleRepository } from "@/domain/repositories/IPeopleRepository";
import { docClient } from "@/infrastructure/db/dynamodbclient";
import { DynamoMetadataRepository } from "@/infrastructure/repositories/DynamoMetadataRepository";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoPeopleRepository implements IPeopleRepository {
  private tableName = "starwars";
  private metadataRepo = new DynamoMetadataRepository();

  async save(personData: Omit<PeopleEntity, "id">): Promise<PeopleEntity> {
    const id = await this.metadataRepo.getNextId();
    const item = {
      PK: `People#${id}`,
      SK: `People#${id}`,
      ...personData,
    };

    const putCommand = new PutCommand({
      TableName: this.tableName,
      Item: item,
    });

    await docClient.send(putCommand);

    return PeopleEntity.fromObject({ id: id.toString(), ...personData });
  }

  async getById(id: string): Promise<PeopleEntity | null> {
    const getCommand = new GetCommand({
      TableName: this.tableName,
      Key: { PK: `People#${id}`, SK: `People#${id}` },
    });

    const result = await docClient.send(getCommand);
    return result.Item ? PeopleEntity.fromObject(result.Item) : null;
  }
}
