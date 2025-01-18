import request from 'supertest';
import app from '../app';

describe('Transaction API', () => {
  let token: string;
  let transactionId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'newpassword123',
      });
    token = res.body.token;
  });

  it('should add a new transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: '12345',
        amount: 100,
        type: 'expense',
        category: 'Food',
        subcategory: 'Groceries',
        account: 'Bank Account',
        date: '2024-01-01',
        description: 'Grocery shopping',
      });
    transactionId = res.body._id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('description', 'Grocery shopping');
  });

  it('should get transactions for a user', async () => {
    const res = await request(app)
      .get('/api/transactions/12345')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should delete a transaction', async () => {
    const res = await request(app)
      .delete(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Transaction deleted successfully');
  });
});