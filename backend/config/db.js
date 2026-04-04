import sequelize from "./sequelize.js";

const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log("PostgreSQL Connected");
    }
    catch(error) {
        console.log("DB Error", error);
    }
};

export default connectDB;