import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
import app from './app'; 

const server = awsServerlessExpress.createServer(app);

// Start the local server
const port = 3000;
server.listen(port, () => {
  console.log(`Local server listening on port ${port}`);
});

export const handler = (event: APIGatewayProxyEvent, context: Context): void => {
  awsServerlessExpress.proxy(server, event, context);
};
