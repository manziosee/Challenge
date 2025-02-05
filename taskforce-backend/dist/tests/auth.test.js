"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.test' }); // Load test environment variables
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Auth API', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        });
        token = res.body.token;
    }));
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    }));
    it('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({
            email: 'test@example.com',
            password: 'password123',
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    }));
    it('should change user password', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put('/api/auth/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send({
            currentPassword: 'password123',
            newPassword: 'newpassword123',
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Password changed successfully');
    }));
    it('should update user profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put('/api/auth/update-profile')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'Updated Test User',
            email: 'updated@example.com',
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Profile updated successfully');
    }));
});
