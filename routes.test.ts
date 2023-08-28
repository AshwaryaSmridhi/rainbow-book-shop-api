import request from 'supertest';
import * as awsServerlessExpress from 'aws-serverless-express';
import app from './app';

jest.mock('aws-serverless-express');

describe('Routes', () => {

  beforeAll(() => {
    awsServerlessExpress.createServer(jest.fn().mockReturnValue({}));
  });

  it('returns a list of books', async () => {
    const response = await request(app).get('/books');
    console.log('response', response)
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('creates new book', async () => {
    // TODO 
  });

  it('updates existing book', async () => {
    // TODO 
  });

  it('returns a list of orders', async () => {
    const response = await request(app).get('/orders');
    console.log('response', response)
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('creates new orders', async () => {
    // TODO 
  });

  it('updates orders with shippment information', async () => {
    // TODO 
  });

  it('updates orders with status information', async () => {
    // TODO 
  });
});
