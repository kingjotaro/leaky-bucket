import supertest from 'supertest';
import {app} from './index';




it('should return 200 status', async () => {
  const response = await supertest(app.callback()).get('/');
  expect(response.status).toBe(200);
});

