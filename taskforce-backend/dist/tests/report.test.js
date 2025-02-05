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
describe('Report API', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({
            email: 'test@example.com',
            password: 'newpassword123',
        });
        token = res.body.token;
    }));
    it('should generate a financial report', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/api/reports/12345?startDate=2024-01-01&endDate=2024-12-31')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('transactions');
        expect(res.body).toHaveProperty('budgets');
    }));
    it('should export a financial report as CSV', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/api/reports/12345/export?startDate=2024-01-01&endDate=2024-12-31')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.header['content-type']).toBe('text/csv');
    }));
});
