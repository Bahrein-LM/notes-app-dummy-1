import mongoose from 'mongoose'

// this file is for handling the database mongodb

export const connectDB = async () => {

    try {
        await mongoose.connect(process.env.DB_URI)

        console.log('MongoDB connected');

    } catch (err) {

        console.log("error connecting to db: ",err)
        process.exit(1) // exit with failure
    }
}