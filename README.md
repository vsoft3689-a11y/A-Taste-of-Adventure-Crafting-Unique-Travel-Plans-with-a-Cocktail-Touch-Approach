🌍 Tourist Travel Package Personalized Recommendation System
Spring Boot + React + MySQL + JWT Authentication
📌 Project Description

This is a full-stack web application that provides personalized travel package recommendations to tourists using predefined preferences such as:

Preferred season

Budget range

Landscape interests (beach, hills, forest, etc.)

The system includes two main users:
✔ Tourist (User) – Gets personalized recommendations
✔ Admin – Manages packages, landscapes, seasons, and master data

Recommendation logic is based on price range, season match, landscape similarity, and optional popularity scoring.

🚀 Features
👤 Tourist Features

Register & Login (JWT secured)

Personalized recommendations

View all travel packages

View package details

Manage profile & preferences (price range and season)

View assigned landscapes & explore categories

🛠️ Admin Features

Add/Update/Delete Travel Packages

Manage Landscapes (CRUD)

Manage Seasons (CRUD)

Assign landscapes to packages

Admin-only protected APIs

🧠 Recommendation Engine Logic

The recommendation algorithm ranks travel packages using:

Season match (Highest weight)

Landscape similarity

Price proximity

Popularity (optional score)

Output is top N packages sorted by recommendation score.

🏗️ System Architecture
Frontend (React.js)
      |
      | Axios Calls
      v
Backend (Spring Boot)
      |
      | JPA/Hibernate
      v
MySQL Database

🛡️ Security & Authentication

JWT Authentication (login returns token)

Role-based access (ROLE_ADMIN, ROLE_USER)

React automatically attaches token using Axios Interceptors

Spring Security validates role and token for every request

Secret key used for signing tokens

📂 Folder Structure
Backend – Spring Boot
src/main/java/com/travel/Travel
│── controller
│── service
│── repository
│── entity
│── dto
│── util (JwtUtil)
│── security (JwtFilter, SecurityConfig)
└── TravelApplication.java

Frontend – React
src/
│── api.js (All API calls)
│── pages/
│   ├── tourist/
│   │   ├── Dashboard.js
│   │   ├── Recommendations.js
│   │   ├── Profile.js
│   │   └── ManagePackages.js
│   ├── admin/
│   │   ├── AdminDashboard.js
│   │   ├── ManageLandscapes.js
│   │   ├── ManagePackages.js
│   │   └── ManageSeasons.js
│── components
│── App.js
│── index.js
└── routes.js

🗄️ Database Schema
Users Table
id	name	email	password	role
Tourist Table

| id | name | email | preferredSeason | priceMin | priceMax |

Package Table

| id | title | description | price | duration | seasonId | popularity |

Landscape Table

| id | name | city | description |

package_landscape Mapping

| packageId | landscapeId |

⚙️ Installation & Setup
✅ 1. Clone Repository
git clone https://github.com/yourusername/tourist-recommendation-system.git
cd tourist-recommendation-system

🗄️ Backend Setup (Spring Boot)
📌 2. Configure MySQL

Create a new database:

CREATE DATABASE travel_db;

📌 3. Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/travel_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update

📌 4. Run Backend
mvn spring-boot:run


Backend will start at:
👉 http://localhost:8080

🎨 Frontend Setup (React)
📌 5. Navigate to Frontend
cd frontend
npm install
npm start


Frontend runs at:
👉 http://localhost:5173

🔑 Login Credentials
Tourist
email: tourist@gmail.com
password: 1234

Admin
email: admin@gmail.com
password: 1234


(Depends on your seed data or manual inserts)

📡 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login

Tourist APIs
GET /api/tourist/{id}/profile
GET /api/tourist/{id}/recommendations
GET /api/packages
GET /api/package/{id}

Admin APIs
POST   /api/admin/package
PUT    /api/admin/package/{id}
DELETE /api/admin/package/{id}

POST   /api/admin/landscape
DELETE /api/admin/landscape/{id}

POST   /api/admin/season
DELETE /api/admin/season/{id}

🧪 Testing

Use Postman or Thunderclient with:
Authorization → Bearer <token>

🧹 Future Enhancements

ML-based recommendation engine

Booking & payment integration

Wishlist / saved packages

Admin analytics dashboard

Chatbot for travel planning


📜 License

MIT License