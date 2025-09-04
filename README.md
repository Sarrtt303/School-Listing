# School Details Display and Creation:


The App strcture has been used

src/app/page.tsx          → Home
src/app/addSchool/page.tsx → Form to Add School 
src/app/showSchool/page.tsx → School listing
src/app/api/addSchool/route.ts → API for making new school entries   GET
src/app/api/getSchools/route.ts → API for gettting information about available schools  POST


A database named schooldb has been setup with a single table "schools"

There is a folder in public, named schoolImages that will contain images of the schools. Created using addSchool.


This is the table strcture:

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  email_id VARCHAR(150) NOT NULL,
  image VARCHAR(255)
);

The app is hosted on vercel. 

Resposiveness:
Added a Hamburger Menu for the Navbar.
The display changes from flex to row with decreaseing screen size.


Considerations:
1. There is a homepage but I have removed it from root document to stick to the two page requirement.
2. file uploads only work locally due to serverless hosting restrictions. We can implement cloudinary for url based image integration.
3. I have filed up the db with Dummy image urls i using lorem picsum.
4. This image upload will work if a the mentioned sql table is created inside schools database. Make sure that your mysql server is running. 
5. Look into lib/db.js for configuring the app. You can set any table or db name you want as long as you keep it up to date with db.js.



