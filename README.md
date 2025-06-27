# 🎬 *HomeTheatre* – MERN Stack Movie Ticket Booking App

> A Full-Stack Movie Ticket Booking Platform built in 30 Days using the MERN stack!

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blueviolet?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📚 *Table of Contents*

- [📌 Overview](#-overview)
- [✨ Features](#-features)
- [🛠 Technologies Used](#-technologies-used)
- [📁 Project Structure](#-project-structure)
- [⚙ Installation & Setup](#-installation--setup)
- [🚀 Usage](#-usage)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [👨‍💻 Author](#-author)
- [💬 Feedback](#-feedback)

---

## 📌 *Overview*

*HomeTheatre* is a complete full-stack web application that allows users to:
- 🔐 Sign up and log in
- 🎞 Browse movies with posters, titles, and details
- 🔍 Search and filter movies by name, year, language, and genre
- 🟢 Stream or 📥 download movies (Online Mode)
- 🎟 Book movie tickets and choose seats (Offline Mode)
- 💳 Make secure payments using *Razorpay*
- 📱 Enjoy a responsive UI across devices
- 🚀 Deployed using *Vercel* for public access

---

## ✨ *Features*

✅ *User Authentication* – Secure signup & login  
🎬 *Movie Browsing* – List movies dynamically from JSON  
🔍 *Search & Filters* – Filter by name, language, genre, year  
🟢 *Online Mode* – Stream or download selected movies  
🎟 *Offline Mode* – Choose seats & book tickets  
💰 *Razorpay Integration* – Seamless and secure payments  
📱 *Responsive Design* – Supports mobile, tablet, desktop  
🌐 *Deployed on Vercel* – Live full-stack deployment

---

## 🛠 *Technologies Used*

| 🚀 Tech Stack    | 💡 Purpose                                      |
|------------------|-------------------------------------------------|
| ![React](https://img.shields.io/badge/React.js-61DAFB?style=flat&logo=react) | Frontend UI development                |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js) | JavaScript backend runtime             |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express) | Web framework for Node.js              |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb) | NoSQL database                         |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat) | ODM for MongoDB                        |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios) | API client                             |
| ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat&logo=razorpay) | Payment gateway integration            |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel) | Full-stack cloud deployment            |

---

## 📁 *Project Structure*

bash
HomeTheatre/
├── backend/                     # Express server and Razorpay logic
│   ├── server.js                # Backend entry point
│   ├── models/                  # MongoDB schemas
│   └── vercel.json              # Vercel backend config
├── frontend/                    # React app source code
│   ├── public/                  # Static files
│   └── src/                     # Components, pages, and styles
├── movies.json                  # Static data source for movies
├── .env                         # Environment variables
└── README.md                    # Project documentation
`

---

## ⚙ *Installation & Setup*

### 🔧 Prerequisites:

* ✅ Node.js (v14+)
* ✅ Git
* ✅ MongoDB Atlas account
* ✅ Razorpay Developer Account

### 📦 Steps:

1. *Clone the Repository:*

bash
git clone https://github.com/your-username/HomeTheatre.git
cd HomeTheatre


2. *Setup Backend:*

bash
cd backend
npm install


Create a .env file:

env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string


Start server:

bash
node server.js


3. *Setup Frontend:*

bash
cd ../frontend
npm install
npm start


4. *Access the App:*

* Frontend: http://localhost:3000
* Backend: http://localhost:5000

---

## 🚀 *Usage*

* 🔑 *Authentication* – Create an account and log in securely.
* 🎞 *Movie Listings* – View movies with posters and metadata.
* 🔍 *Search & Filters* – Quickly find movies by name, year, genre.
* 🟢 *Online Mode* – Stream movies directly.
* 🎟 *Offline Mode* – Select seats, confirm booking, pay via Razorpay.
* 📱 *Responsive Design* – Works on all screen sizes.

---

## 🌐 *Deployment*

We use *Vercel* for deployment because it supports:

* 🔧 Both frontend and backend (serverless functions)
* ⚡ Fast build and CI/CD pipeline
* 🔐 Environment variable management

### 🛠 Deployment Steps (Vercel):

1. ✅ Push your project to GitHub
2. ➕ Add vercel.json inside /backend
3. 🔑 Add environment variables in Vercel Dashboard
4. 🌐 Deploy Backend first → then Frontend
5. 🎉 Done! Get live URLs for both

🔗 Other options:

* *Netlify* (frontend only)
* *Render* (backend hosting)
* *GitHub Pages* (static frontend only)

---

## 🤝 *Contributing*

Want to improve this project? PRs are welcome!

bash
git checkout -b feature/new-feature
git commit -m "Add new feature"
git push origin feature/new-feature


---

## 📝 *License*

📄 This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 *Author*

*Rakesh Kumar*

🔗 *Github:* [GitHub](https://github.com/SravanamRakeshKumar)  
🎥 *Youtube:* [YouTube – Why Not You](https://youtube.com/@whynotyou-2006?si=O6TVBVCvioMn4AHg)  
💼 *Linkedin:* [LinkedIn – Rakesh Kumar](https://www.linkedin.com/in/sravanam-rakesh-kumar-418ab7283/)  
📱 *Whatsap:* [WhatsApp – Chat with Me](https://wa.me/919989582364)  
✉ *Email:* [sravanamrakeshkumar3@gmail.com](mailto:sravanamrakeshkumar3@gmail.com)


---

## 💬 *Feedback*

If you found this project helpful:

* ⭐ Star the repository
* 📝 Leave a comment or issue
* 🔁 Share it with your network
* 📺 Follow the [30-Day MERN Series](https://drive.google.com/drive/folders/1UihVmz7F92VkS0AD-bh8YJb3Fs6_7X03?usp=sharing)

---

> 💖 Thank you for visiting! See you in another project. Stay tuned & stay safe. 🚀
