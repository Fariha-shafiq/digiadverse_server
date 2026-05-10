import app from './src/app.js'

import connectDB from './src/config/database.js';

connectDB()
const PORT = 5000;
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});