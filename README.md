# TaskForce Wallet 🚀

TaskForce Wallet is a **personal finance management application** designed to help users track their income, expenses, budgets, and financial goals. With a clean and intuitive interface, users can manage their finances effectively and gain insights into their spending habits.

---

## Features ✨

- **User Authentication** 🔐
  - Register, login, and change password.
  - JWT-based authentication for secure access.

- **Budget Management** 💰
  - Create, update, and delete budgets.
  - Track spending against budget limits.
  - Receive notifications when budgets are exceeded.

- **Transaction Tracking** 📊
  - Add, edit, and delete transactions.
  - Categorize transactions (e.g., Food, Transport, Entertainment).
  - View transaction history with filters.

- **Category Management** 🗂️
  - Create and manage categories and subcategories.
  - Update or delete subcategories.

- **Financial Reports** 📈
  - Generate detailed financial reports.
  - Export reports as CSV for offline analysis.

- **Dashboard Overview** 🖥️
  - Visualize income, expenses, and category-wise spending.
  - Interactive charts for better insights.

- **Currency Conversion** 💱
  - Convert transaction amounts to different currencies using real-time exchange rates.

- **Dark Mode** 🌙
  - Toggle between light and dark themes for a personalized experience.

---

## Tech Stack 🛠️

### Frontend
- **React** ⚛️
- **TypeScript** 📘
- **Tailwind CSS** 🎨
- **React Router** 🛣️
- **Chart.js** 📊
- **Axios** 🌐

### Backend
- **Node.js** 🟢
- **Express.js** 🚂
- **MongoDB** 🍃
- **Mongoose** 🐪
- **JWT** 🔑
- **Swagger** 📄

### Testing
- **Jest** 🧪
- **Supertest** 🚀

### Tools
- **Vite** ⚡
- **Winston** 📝 (Logging)
- **Nodemailer** 📧 (Email Notifications)
- **Docker** 🐳 (Containerization)

---

## Installation 🛠️

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- API key for [Open Exchange Rates](https://openexchangerates.org/)

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/taskforce-wallet.git
   cd taskforce-wallet
   ```

2. **Install Dependencies**
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the `backend` directory:
     ```env
     PORT=5000
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskforce-wallet?retryWrites=true&w=majority
     JWT_SECRET=your_jwt_secret_key
     OPEN_EXCHANGE_RATES_API_KEY=your_api_key
     ```

4. **Run the Application**
   - Start the backend:
     ```bash
     cd backend && npm run dev
     ```
   - Start the frontend:
     ```bash
     cd frontend && npm run dev
     ```

5. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - Swagger Docs: `http://localhost:5000/api-docs`

---

## API Documentation 📄

The API is documented using **Swagger**. You can access the documentation at:
```
http://localhost:5000/api-docs
```

---

## Testing 🧪

Run tests using Jest:
```bash
cd backend && npm test
```
## Contributing 🤝

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License 📜

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments 🙏

- [Open Exchange Rates](https://openexchangerates.org/) for currency conversion.
- [Lucide Icons](https://lucide.dev/) for beautiful icons.

---

## Contact 📧

For questions or feedback, feel free to reach out:
- **Email**: oseemanzi3@gmail.com
- **GitHub**: https://github.com/manziosee

---

Happy budgeting! 💸✨