scStoreReact  is functional online store built with **React + Vite**, **Node.js**, **Express**, and **MongoDB Atlas**, featuring authentication, admin panel, product management and a modern responsive UI.


Live Demo

https://scstorereact-client.onrender.com

NOTE!!! This app is deployed on Render free plan. It needs time to wake up the server, it may take about min..... !!!!

for testing admin:
user: admin@scstore.com
pass: 123456

*The application uses a Weather Widget that displays the current temperature for the user's city.
To detect your city automatically, the app requests browser geolocation permission.
If you allow access - your actual city and local temperature will be shown.
This feature is optional and does not affect any other part of the application.

Features:
**Authentication & Users**
- Register and Login with JWT authentication
- Protected routes based on user role (User/Admin)
- User profile data & logout functionality

 **Store Features**
- Product catalog
- Product filter & details
- Add to cart / remove from cart
- Review system (add, read, delete reviews)
- Responsive layout

**Admin Panel**
Admins can manage:

Products
- Create, edit, delete products
- Upload images (Cloudinary)

Orders
- See all orders
- Change order statuses

 Reviews
- View & moderate all product reviews  

Users
- List all users
- Edit roles (promote/demote)
- Delete users  

Technologies Used

**Frontend**
- React 19
- Vite
- React Router DOM
- Bootstrap & React-Bootstrap
- Swiper / Slick Carousel
- React Toastify

 **Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt
- CORS
- Cloudinary (image hosting)

 Other
- Server warm-up handler for Render cold start
- Custom error handling system
- Modular service-based API calls  


run in local machine:
1. have to change in index.js (on server):
- mongoose.connect(productionDb);with mongoose.connect(localDbUrl)
2. in utils/createAdmin (on server)
- mongoose.connect(process.env.PRODUCTION_DATABASE_URL)  with mongoose.connect(process.env.LOCAL_DATABASE_URL)
3. have to comment export const BASEURL = "https://scstorereact.onrender.com/api" and uncomment //export const BASEURL = "http://localhost:3000/api";

run commands: 
1. for server: nodemon index.js /dev mode/  or node index.js /standard mode/
2. for client: npm run dev


