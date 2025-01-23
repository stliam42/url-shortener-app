# URL Shortener Service

The **URL Shortener Service** is a backend application for generating, managing, and analyzing shortened URLs. Built with **NestJS**, **TypeORM**, and **PostgreSQL**, it supports robust URL shortening and analytics functionality.

---

## 📋 Features

- **URL Shortening**: Generates unique 6-character hashes for URLs.
- **Redirection**: Redirects users to the original URL using the shortened link.
- **Analytics**: Collects and provides data about URL clicks, such as IP address and access date.
- **REST API**:
  - **POST** `/shorten`: Generate a shortened URL.
  - **GET** `/:shortUrl`: Redirect to the original URL.
  - **GET** `/analytics/:shortUrl`: Retrieve analytics data for a shortened URL.

---

## 🚀 Getting Started

### 1. Prerequisites

1. Install **Docker** and **Docker Compose**.
2. Create a `.env` file in the root of the project based on `.env.example`.

### 2. Running the Project

1. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

2. Access the application at `http://localhost:3000`.

---

## 📙 API Endpoints

### 1. Create a Short URL
**POST** `/shorten`

**Request Example**:
```json
{
  "originalUrl": "https://example.com"
}
```

**Response Example**:
```json
{
  "shortUrl": "abc123",
  "originalUrl": "https://example.com"
}
```

---

### 2. Redirect to the Original URL
**GET** `/:shortUrl`

Redirects the user to the original URL associated with the short URL.

---

### 3. Retrieve Analytics
**GET** `/analytics/:shortUrl`

**Response Example**:
```json
{
  "clickCount": 10,
  "analytics": [
    {
      "ipAddress": "192.168.1.1",
      "accessDate": "2025-01-22T14:00:00.000Z"
    },
    {
      "ipAddress": "192.168.1.2",
      "accessDate": "2025-01-22T13:00:00.000Z"
    }
  ]
}
```

---

## 🛠️ Technologies Used

- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Docker**: For containerizing the application and the database.

---
