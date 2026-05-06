# 🐅 Tigerit Delivery API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)
![API](https://img.shields.io/badge/API-REST-blue)

# TigerIt - E-Commerce & Marketplace Backend

TigerIt is a comprehensive Node.js and TypeScript-based backend solution designed for a modern e-commerce and marketplace platform. It features real-time messaging, AI-powered chatbot assistance, secure payment processing, and a robust verification system for both users and administrators.

## Features

- **User & Admin Verification**: Secure authentication and verification flows for different user roles.
- **E-Commerce Management**: Complete product lifecycle management, including categories, inventory, and wishlists.
- **Business Suite**: Tools for businesses to manage their profiles, products, and transactions.
- **Secure Payments**: Integrated with **Stripe** for seamless checkout experiences and wallet management.
- **AI-Powered Chatbot**: Integration with **OpenAI** to provide intelligent customer support and shopping assistance.
- **Real-Time Communication**: Powered by **Socket.IO** for instant notifications and chat functionality.
- **Media Management**: Cloud-based image and video storage via **Cloudinary**.
- **Email Notifications**: Automated email services using **Nodemailer**.
- **Geocoding**: Location-based services for business and delivery tracking.

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using [Mongoose](https://mongoosejs.com/))
- **Real-time**: [Socket.IO](https://socket.io/)
- **AI Integration**: [OpenAI API](https://openai.com/api/)
- **Payments**: [Stripe](https://stripe.com/)
- **Cloud Storage**: [Cloudinary](https://cloudinary.com/)
- **Authentication**: [Firebase Admin SDK](https://firebase.google.com/docs/admin)

##  Project Structure

```text
Src/
├── Config/         # Database and environment configurations
├── Controller/     # Request handlers
├── ErrorHandler/   # Global error handling logic
├── Firebase/       # Firebase admin initialization
├── Interfaces/     # TypeScript interfaces
├── Middlewares/    # Custom Express middlewares
├── Models/         # Mongoose schemas and models
├── Repositories/   # Data access layer
├── Routes/         # API endpoint definitions
├── Services/       # Business logic and external integrations (Socket, AI, etc.)
├── Types/          # Custom TypeScript types
├── Utils/          # Helper functions
└── server.ts       # Application entry point
```

##     Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saadkhan86/TigerIt.git
   cd TigerIt
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=8080
   MONGODB_URL=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the application**:
   - **Development mode**:
     ```bash
     npm run dev
     ```
   - **Build for production**:
     ```bash
     npm run build
     ```

##  API Endpoints

The API is versioned and accessible under `/api/v1`.

| Category | Endpoint | Description |
| :--- | :--- | :--- |
| **Verification** | `/verification/admin` | Admin authentication and verification |
| | `/verification/user` | User authentication and verification |
| **AI Assistant** | `/chat-with-ai-assistant` | AI-powered chatbot endpoint |
| **Messaging** | `/chat` | Real-time chat services |
| **Commerce** | `/product` | Product catalog management |
| | `/order` | Order processing and history |
| | `/wishlist` | User wishlist management |
| **Payments** | `/checkout` | Stripe payment integration |
| | `/transaction` | Transaction history |
| | `/wallet` | Digital wallet management |
| **Business** | `/business` | Business profile and management |
| **Profile** | `/profile` | User profile management |

## License

This project is licensed under the ISC License.
