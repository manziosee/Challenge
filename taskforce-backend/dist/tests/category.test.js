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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Category API', () => {
    let token;
    let categoryId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({
            email: 'test@example.com',
            password: 'newpassword123',
        });
        token = res.body.token;
    }));
    it('should get categories for a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/api/categories/12345')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it('should add a new category', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
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
    }));
    it('should update a subcategory', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/categories/${categoryId}/subcategories/0`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            value: 'New Groceries',
        });
        expect(res.status).toBe(200);
        expect(res.body.subcategories[0]).toBe('New Groceries');
    }));
    it('should delete a subcategory', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/categories/${categoryId}/subcategories/0`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.subcategories.length).toBe(1);
    }));
    it('should delete a category', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Category deleted successfully');
    }));
});
