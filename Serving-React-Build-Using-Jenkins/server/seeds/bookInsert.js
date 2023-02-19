import mongoose from "mongoose";
import config from "config";
import Books from "./config/books.js"

async function connectDB() {
    try {
        await mongoose.connect(config.get("DB_URL"));
        console.log(`DB Connected`);
    } catch (error) {
        console.log(error);
    }
}
connectDB();


let bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
});

let Book = new mongoose.model("Book", bookSchema, "book");

async function insertBook() {
    try {
        await Book.insertMany(Books)
        console.log(`Books Added Successfully`);
    } catch (error) {
        console.log(error);
    }
}
insertBook();

