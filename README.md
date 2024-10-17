MajorCapStone

https://github.com/MajorDigi/MajorCapStone

Overview:
MajorCapStone "Travel Sense" is a full-stack web application designed for travel enthusiasts to journal their adventures. Built using the MERN (MongoDB, Express, React, Node) stack, the app allows users to create, view, and manage journal entries detailing their travel experiences. Users can also upload images and search through their entries, providing a rich and interactive way to document their journeys.

Features

User Authentication & Authorization:
- Users can register and log in, ensuring that only authenticated individuals can access the app.
- Profile picture uploads are supported, allowing users to personalize their accounts.

Home Page:
- Displays a list of all journal entries created by the user, including a snapshot of each entry.
- Users can search for entries based on title, location, and date.
- Each entry features a "Read More" button for detailed viewing.

Create Page:
- Users can create journal entries by providing details such as date, title, location, and up to three images.

View Page:
- Showcases all details of a selected entry, including an image carousel for multiple images.

Logout Functionality:
- Ensures user data is securely erased from the browser cache upon logout.

Authorization:
- Only the authors of journal entries can view and delete their entries, maintaining user privacy.

Delete Entry:
- Users can permanently erase their journal entries from the application.

State Management:
- Implemented using the Context API to facilitate efficient state management throughout the application.

Technical Approach

Technologies Used:
- MERN Stack: MongoDB, Express.js, React.js, Node.js

Authentication: 
- Implemented using JSON Web Tokens (JWT) for secure user authentication.

Image Management: 
- Integrated with Cloudinary for storing and managing images. Cloudinary offers a powerful cloud-based image management solution that allows for image uploading, transformation, and delivery with ease.

Deployment:
- Successfully deployed the backend using Render, a platform that provides seamless cloud deployment services. Although the backend was deployed successfully, the frontend deployment faced challenges.

Challenges Faced:
- Implementing user authentication using JWT proved to be a complex task that required thorough understanding and secure handling of API keys.
- Safely using and passing API keys and other sensitive information to maintain application security.

Something New and Interesting:
- Cloudinary: Utilized for image storage and management. Cloudinary provides a robust solution for image uploads, transformations, and delivery,   enhancing the overall functionality of the travel journaling application.

Render Deployment: 
- Attempted to deploy the application on Render, which simplifies the process of deploying web applications to the cloud. While the backend was  successfully deployed, the frontend encountered some deployment issues.

Installation:
- To run this application locally, follow these steps:

Clone the repository:

git clone [https://github.com/MajorDigi/MajorCapStone]
cd MajorCapStone

Install dependencies:
- npm install
- Set up your environment variables, including your MongoDB URI and Cloudinary credentials.

Run the application:
- Server: node index.js
- Client: npm run build

Contributing:
- Contributions are welcome! Please feel free to open issues or submit pull requests for improvements or bug fixes.
