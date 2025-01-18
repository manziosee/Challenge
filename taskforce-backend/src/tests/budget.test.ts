import request from 'supertest';
import app from '../app';

describe('Budget API', () => {
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

  it('should get budgets for a user', async () => {
    const res = await request(app)
      .get('/api/budgets/12345')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should add a new budget', async () => {
    const res = await request(app)
      .post('/api/budgets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: '12345',
        category: 'Food',
        limit: 1000,
        period: 'monthly',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('category', 'Food');
  });

  it('should update a budget', async () => {
    const res = await request(app)
      .put('/api/budgets/12345')
      .set('Authorization', `Bearer ${token}`)
      .send({
        spent: 200,
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('spent', 200);
  });
});