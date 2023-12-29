import supertest from 'supertest';
import { app } from '../index';



  it('should create key "Key created"', async () => {
    const response = await supertest(app.callback()).get('/createkey');;
    expect(response.status).toBe(200);
    expect(response.text).toBe("Key created");
  });

