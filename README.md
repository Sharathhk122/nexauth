
<h1 align="center">🔐 SecureNest - Full Stack Auth App</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Backend-Java%20%7C%20SpringBoot-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Frontend-React%20%7C%20AntDesign-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/JWT-Enabled-red?style=flat-square" />
</p>

<p align="center">
  <strong>Live URL:</strong><br>
  <a href="https://nexauth-sharath.onrender.com" target="_blank">🌐 nexauth-sharath.onrender.com</a>
</p>

---

## 📌 Project Overview

**SecureNest** is a secure, modern full-stack authentication system featuring:

- 🔒 JWT-based authentication
- 📧 Real-time email verification
- 📦 Maven-powered backend
- 💅 Ant Design React frontend
- 📬 SMTP email integration
- 🚀 Live deployment on Render

It’s ideal for projects that require verified user access and strong session management.

---

## 🧩 Tech Stack

| Layer      | Tech Used |
|------------|-----------|
| **Frontend** | React, Ant Design, Axios |
| **Backend** | Java, Spring Boot, Spring Security, JWT |
| **Database** | MySQL |
| **Email** | Gmail SMTP |
| **Deployment** | Render.com |

---

## 🚀 Features

✅ User Signup & Login  
✅ JWT Authentication (Access Token)  
✅ Realtime Email Verification  
✅ Responsive UI with Ant Design  
✅ Toast alerts, Form validation  
✅ Secure `.env` configuration  
✅ Full-stack Docker-ready architecture  

---

## 🖼️ Screenshots

| Error Handling | Responsive UI |
|----------------|---------------|
| ![home]() | ![UI](./screenshots/responsive.png) |

| Signup with Verification | Login Page |
|--------------------------|-------------|
| ![Signup](./screenshots/signup.png) | ![Login](./screenshots/login.png) |

| Email Verification | Dashboard |
|--------------------|-----------|
| ![Email](./screenshots/email.png) | ![Dashboard](./screenshots/dashboard.png) |


> Add your screenshots under the `frontend/public/screenshots/` or root `screenshots/` folder.

---

## 🛡️ Security Design

### 🔐 JWT Token Auth
- Signed with **secret key** from `.env`
- 24-hour expiration time
- Tokens are stored securely client-side
- Backend validates token with middleware

### 📧 Email Verification
- User must verify email via Gmail SMTP
- Accounts remain inactive until verified
- Prevents bot signups and unauthorized access

---

## ⚙️ Environment Configuration

Make sure to store the following securely in your `.env` or `application.properties`:

<details>
  <summary><strong>Sample Properties</strong></summary>

```properties
# Database
DB_URL=jdbc:mysql://localhost:3306/securenest
DB_USERNAME=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD

# JWT
JWT_SECRET=YOUR_SECRET_KEY
JWT_EXPIRATION=86400000

# Mail
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
````

</details>

---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

* Java 17+
* Node.js & npm
* MySQL running locally
* Maven

---

## 🛠️ Installation

### ⚙️ Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 💻 Frontend

```bash
cd frontend
npm install
npm start
```

> Visit `http://localhost:3000`

---

## 🧪 Usage Guide

1. Register with a valid email
2. Check inbox & click verify
3. Login with verified credentials
4. Access secured dashboard

---

## 📂 Project Structure

```
nexauth/
│
├── backend/
│   ├── src/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── README.md
```

---

## 🚧 Roadmap

* [x] JWT Auth Integration
* [x] Email Verification Flow
* [ ] Docker Compose Setup
* [ ] Refresh Token Mechanism
* [ ] Admin Dashboard with User Roles
* [ ] Password Reset Email

---

## 🤝 Contribution

Contributions are welcome!
Feel free to fork the repo and submit PRs.

1. Fork this repo
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Open a pull request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 📬 Contact

Made with ❤️ by [Sharath](mailto:sharathhk40@gmail.com)
👉 [GitHub](https://github.com/Sharathhk122) | [Live Site](https://nexauth-sharath.onrender.com)

---

> 🧠 **Tip:** Add animation GIFs using tools like [LICEcap](https://www.cockos.com/licecap/) or [ScreenToGif](https://www.screentogif.com/) to demonstrate transitions.

```

---

### 🟨 Next Steps for You:

1. **Capture 6 screenshots**:
   - Signup page
   - Verification mail
   - Login page
   - Dashboard
   - Error/invalid login
   - Responsive UI (mobile view)

2. **Upload them** to `./screenshots/` folder in your repo.

3. **Paste this README** content into your `README.md` file.

Would you like me to **generate this file as downloadable `README.md`**, or do you want help capturing/embedding screenshots?
```

