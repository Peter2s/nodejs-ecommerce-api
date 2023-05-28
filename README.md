
# eCommerce Node.js API

This is a Node.js API for an eCommerce platform that allows users to manage products, categories, and orders. It provides endpoints for creating, updating, deleting, and retrieving various resources.

## Features

- User authentication and authorization (user - manger - admin)
- CRUD operations for products
- CRUD operations for categories
- CRUD operations for Subcategories
- CRUD operations for brands
- CRUD operations for users
- Order management
- Error handling and validation


## Technologies Used

- Node.js
- Express.js
- MongoDB 
- JSON Web Tokens (JWT) for authentication
- Mongoose 
- Multer for file upload
- Shrap for image processing
- express validator 
- bcrypt for password hashing
- readis for caching

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.
- MongoDB should be installed and running.

### Installation



  ```bash
   git clone [https://github.com/your-username/ecommerce-nodejs-api.git](https://github.com/Peter2s/nodejs-ecommerce-api)
   cd ecommerce-nodejs-api
   npm install
   npm start
   ``` 
 
## API Documentation   
Here are some examples of the API endpoints:

- GET /api/v1/products - Get all products
- GET /api/v1/products/:id - Get a product by ID
- POST /api/v1/products - Create a new product
- PATCH /api/v1/products/:id - Update a product
- DELETE /api/v1/products/:id - Delete a product
  
