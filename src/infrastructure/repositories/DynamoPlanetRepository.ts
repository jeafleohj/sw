import { PlanetEntity } from "@/domain/entities/PlanetEntity";
import { IPlanetRepository } from "@/domain/repositories/IPlanetRepository";
import { docClient } from "@/infrastructure/db/dynamodbclient";
import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoMetadataRepository } from "./DynamoMetadataRepository";

export class DynamoPlanetRepository implements IPlanetRepository {
  private tableName = "starwars";
  private metadataRepo = new DynamoMetadataRepository();

  async save(planetData: Omit<PlanetEntity, "id">): Promise<PlanetEntity> {
    const id = await this.metadataRepo.getNextId();
    const item = {
      PK: `Planet#${id}`,
      SK: `Planet#${id}`,
      ...planetData,
    };

    const putCommand = new PutCommand({
      TableName: this.tableName,
      Item: item,
    });

    await docClient.send(putCommand);
    return PlanetEntity.fromObject({ id: id.toString(), ...planetData }); // Devuelve el objeto creado con el ID generado
  }

  async getById(id: string): Promise<PlanetEntity | null> {
    const getCommand = new GetCommand({
      TableName: this.tableName,
      Key: { PK: `Planet#${id}`, SK: `Planet#${id}` },
    });

    const result = await docClient.send(getCommand);
    return result.Item ? PlanetEntity.fromObject(result.Item) : null;
  }

  async getAll(): Promise<PlanetEntity[]> {
    const queryCommand = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": "Planet#",
      },
    });

    const result = await docClient.send(queryCommand);
    return result.Items?.map((item) => PlanetEntity.fromObject(item)) || [];
  }
}
