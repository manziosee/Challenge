import request from 'supertest';
import app from '../app';

describe('Dashboard API', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'newpassword123',
      });
    token = res.body.token;
  });

  it('should get dashboard data for a user', async () => {
    const res = await request(app)
      .get('/api/dashboard/12345')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('income');
    expect(res.body).toHaveProperty('expenses');
    expect(res.body).toHaveProperty('categorySpending');
  });
});