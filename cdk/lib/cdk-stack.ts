import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class StarWarsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const starWarsTable = new dynamodb.Table(this, 'StarwarsTable', {
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      tableName: 'starwars',  // Nombre de la tabla
    });

    const createHandler = new lambda.Function(this, 'CreateHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('../dist'),
      handler: 'lambdas/CreateHandler.handler',
      environment: {
        DYNAMODB_TABLE: starWarsTable.tableName,
      },
    });

    const fetchHandler = new lambda.Function(this, 'FetchHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('../dist'),
      handler: 'lambdas/FetchHandler.handler',
      environment: {
        DYNAMODB_TABLE: starWarsTable.tableName,
      },
    });

    starWarsTable.grantReadWriteData(createHandler);
    starWarsTable.grantReadWriteData(fetchHandler);

    const api = new apigateway.RestApi(this, 'StarWarsApi', {
      restApiName: 'Star Wars Service',
      description: 'API for managing Star Wars planets and people.',
    });

    const apiResource = api.root.addResource('api');
    const planetsResource = apiResource.addResource('planets');
    const peopleResource = apiResource.addResource('people');

    planetsResource.addMethod('POST', new apigateway.LambdaIntegration(createHandler));
    peopleResource.addMethod('POST', new apigateway.LambdaIntegration(createHandler));

    const planetIdResource = planetsResource.addResource('{id}');
    const peopleIdResource = peopleResource.addResource('{id}');

    planetIdResource.addMethod('GET', new apigateway.LambdaIntegration(fetchHandler));
    peopleIdResource.addMethod('GET', new apigateway.LambdaIntegration(fetchHandler));
  }
}
