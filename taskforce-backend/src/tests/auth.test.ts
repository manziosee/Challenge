import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' }); // Load test environment variables
import request from 'supertest';
import app from '../app';

describe('Auth API', () => {
  let token: string;
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    token = res.body.token;
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should change user password', async () => {
    const res = await request(app)
      .put('/api/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: 'password123',
        newPassword: 'newpassword123',
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Password changed successfully');
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put('/api/auth/update-profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Test User',
        email: 'updated@example.com',
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Profile updated successfully');
  });
  it('should logout a user', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Logged out successfully');
  });
});
