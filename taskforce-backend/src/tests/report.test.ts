import request from 'supertest';
import app from '../app';

describe('Report API', () => {
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

  it('should generate a financial report', async () => {
    const res = await request(app)
      .get('/api/reports/12345?startDate=2024-01-01&endDate=2024-12-31')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('transactions');
    expect(res.body).toHaveProperty('budgets');
  });

  it('should export a financial report as CSV', async () => {
    const res = await request(app)
      .get('/api/reports/12345/export?startDate=2024-01-01&endDate=2024-12-31')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.header['content-type']).toBe('text/csv');
  });
});