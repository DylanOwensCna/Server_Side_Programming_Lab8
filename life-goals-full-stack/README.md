# Life Goals

1. Clone repo to your local machine
   ```
   git clone https://github.com/johnmilley/life-goals-full-stack.git
   ```
2. Run `npm install` to install dependencies (remember, this generates the `node_modules` folder)
3. Create the `.env` file in the root of the project: 
   ```
   touch .env
   ```
4. Create a variable in `.env` with your mongoDB connection string as its value.

    **Example**
    ```
    MONGO_URI=mongodb+srv://USERNAME:PASSWORD@myatlasclusteredu.dww5zpx.mongodb.net/DATABASE?retryWrites=true&w=majority
    ```

    Replace username, password, and database with your own credentials from [mongoDB Atlas](https://www.mongodb.com/atlas/database)

    Require (import) the `dotenv` module in any file you need to access the conection string.

    **Example**
    ```
    /* snippet from app.js */

    // dotenv config
    var dotenv = require('dotenv');
    dotenv.config();

    // Set up mongoose connection
    mongoose.set('strictQuery', false);
    const mongoDB = `${process.env.MONGO_URI}`;

    main().catch(err => console.log(err));
    async function main() {
        await mongoose.connect(mongoDB);
    }
    ```

    `process.env` contains all environment variables declared in `.env`

5. [*Optional*] Run `populate_test_data.js` if you want test data inserted into your DB.
6. While in the project directory, run the development server: `npm run dev`