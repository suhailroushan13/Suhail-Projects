import express from "express";
import mongoose from "mongoose"
import multer from "multer"
import serveIndex from "serve-index";
import config from "config"
import adminAuth from "../../middlewares/auth/adminAuth.js";
import { addBookValidations, errorMiddleware } from "../../middlewares/validations/index.js";
import Book from "../../models/Book/index.js";
import Admin from "../../models/Admin/index.js"
let route = express.Router();


route.use('/uploads', serveIndex("uploads", { icons: true }), express.static('uploads'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.toLowerCase().split(' ').join('-'))
    }
})
var upload = multer({ storage: storage })
/*
    API --> /api/admin/book
    Method --> POST
    Route Type --> Private
    Description --> Add a Book
*/
route.post("/book", adminAuth, upload.single('image'), addBookValidations(), errorMiddleware, async (req, res) => {
    try {

        let adminData = await Admin.findById(req.payload._id);
        if (!adminData) return res.status(400).json({ error: "Invalid credentials !" });

        let bookData = await Book.findOne({ idNo: req.body.idNo });
        if (bookData) return res.status(400).json({ error: "book with the same ID already exists !" });

        if (!(req.file)) return res.status(400).json({ error: "Upload Image !" });

        let book = new Book(req.body);
        book.coverImageUrl = `${config.get("URL")}/api/admin/${req.file.path}`
        await book.save();
        res.status(200).json({ success: "book added successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Issue" });
    }
});

/*
    API --> /api/admin/book/:book_id
    Method --> PUT
    Route Type --> Private
    Description --> Edit a Book
*/
route.put("/book/:book_id", adminAuth, addBookValidations(), errorMiddleware, async (req, res) => {
    try {
        let _id = mongoose.Types.ObjectId.isValid(req.params.book_id)

        let adminData = await Admin.findById(req.payload._id);
        if (!adminData) return res.status(400).json({ error: "Unauthorized access !" });

        // Checking if Student exists
        if (!_id) return res.status(404).json({ error: `Invalid Book ID!` });
        let bookData = await Book.findById(req.params.book_id);

        let book = req.body;
        book._id = req.params.book_id;

        await Book.findByIdAndUpdate(req.params.book_id, book);
        res.status(200).json({ msg: "book edited successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Issue" });
    }
});

/*
    API --> /api/admin/book/:book_id
    Method --> DELETE
    Route Type --> Private
    Description --> Delete a Book
*/
route.delete("/book/:book_id", adminAuth, async (req, res) => {
    try {
        let _id = mongoose.Types.ObjectId.isValid(req.params.book_id)

        let adminData = await Admin.findById(req.payload._id);
        if (!adminData) return res.status(400).json({ error: "Unauthorized access !" });

        // Checking if Student exists
        if (!_id) return res.status(404).json({ error: `Invalid Book ID!` });

        let bookData = await Book.findById(req.params.book_id);
        if (!bookData) return res.status(400).json({ error: "Book doesn't exist !" });

        await Book.findByIdAndRemove(req.params.book_id);

        // let book = req.body;
        // book._id = req.params.book_id;
        // bookData = book

        // await bookData.save();
        res.status(200).json({ msg: "book deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Issue" });
    }
});

/*
    API End Point : /api/admin/book/:book_id
    Method : GET
    Access Type : Private
    Validations:
    Valid book ID
    Description: Fetch a Particular book with ID
*/

route.get("/book/:book_id", adminAuth, async (req, res) => {
    try {
        let _id = mongoose.Types.ObjectId.isValid(req.params.book_id)

        let adminData = await Admin.findById(req.payload._id);
        if (!adminData) return res.status(400).json({ error: "Unauthorized access !" });

        // Checking if Student exists
        if (!_id) return res.status(404).json({ error: `Invalid Book ID!` });

        let book = await Book.findById(req.params.book_id);
        if (!book) return res.status(401).json({ error: "Book doesn't exist !" });

        res.status(200).json({ book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


/*
    API End Point : /api/admin/books
    Method : GET
    Access Type : Private
    Description: Fetch all books
*/

route.get("/books", async (req, res) => {
    try {

        // let adminData = await Admin.findById(req.payload._id);
        // if (!adminData) return res.status(400).json({ error: "Unauthorized access !" });

        let books = await Book.find();

        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default route;