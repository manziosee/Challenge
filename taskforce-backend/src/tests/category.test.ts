import request from 'supertest';
import app from '../app';

describe('Category API', () => {
  let token: string;
  let categoryId: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'newpassword123',
      });
    token = res.body.token;
  });

  it('should get categories for a user', async () => {
    const res = await request(app)
      .get('/api/categories/12345')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should add a new category', async () => {
    const res = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: '12345',
        name: 'Food',
        subcategories: ['Groceries', 'Restaurants'],
      });
    categoryId = res.body._id;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'Food');
  });

  it('should update a subcategory', async () => {
    const res = await request(app)
      .put(`/api/categories/${categoryId}/subcategories/0`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        value: 'New Groceries',
      });
    expect(res.status).toBe(200);
    expect(res.body.subcategories[0]).toBe('New Groceries');
  });

  it('should delete a subcategory', async () => {
    const res = await request(app)
      .delete(`/api/categories/${categoryId}/subcategories/0`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.subcategories.length).toBe(1);
  });

  it('should delete a category', async () => {
    const res = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Category deleted successfully');
  });
});