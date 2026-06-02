Render deployment steps

1. Create a new Web Service on Render and connect your repository.
2. Set the root to the `backend` folder (Render will detect the `package.json`).
3. Set the build and start commands:
   - Build command: `npm install`
   - Start command: `npm start`
4. Set environment variables in Render's dashboard:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a long random string
   - `PORT` = 5000 (optional; Render sets this automatically)
5. Deploy. Render will run `npm install` and `npm start` to run the Node server.

Notes:
- Make sure your MongoDB Atlas allows connections from Render's IP ranges or set network access appropriately.
