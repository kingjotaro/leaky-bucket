import supertest from 'supertest';
import { app } from '../index';



  it('should "Key verification successful." if the key exist', async () => {
    const response = await supertest(app.callback()).get('/verifykey');;
    expect(response.status).toBe(200);
    expect(response.text).toBe('Key verification successful.');
  });

