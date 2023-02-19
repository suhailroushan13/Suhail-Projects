import { useState } from "react";
import axios from "axios";

function Body({ alert, showAlert }) {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        idNo: "",
        pageCount: null,
        publisher: "",
        synopsis: "",
        image: null
    });

    const onChangeHandler = (e) => {
        setBookData({
            ...bookData,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            console.log(bookData)
            let token = JSON.parse(localStorage.getItem("token"))
            let { data } = await axios.post("/api/admin/book", bookData, { headers: { 'Content-Type': 'multipart/form-data',"x-auth-token": token.token } });
            showAlert({
                type: "success",
                msg: data.success
            });
        } catch (err) {
            let data
            if (err.response.data.error)
                data = err.response.data.error

            if (err.response.data.errors)
                data = err.response.data.errors.map(e => e.msg).join(" ,")
            showAlert({
                type: "error",
                msg: data
            });
        }
    }

    return (
        <div className="main">
            <div>
                <h1>Add Book </h1>
                {alert !== null && <div className={`alert-${alert.type}`} style={{ width: "90%" }}> {alert.msg}</div>}
            </div>
            <br /><br />
            <div>
                <form onSubmit={submitHandler}>
                    <label htmlFor="title"><b> Title : </b></label><br />
                    <input type="text" name="title" onChange={onChangeHandler} /><br /><br />

                    <label htmlFor="author"><b> Author : </b></label><br />
                    <input type="text" name="author" onChange={onChangeHandler} /><br /><br />

                    <label htmlFor="image"><b>Cover Image URL : </b></label><br />
                    <input type="file" name="image" onChange={(e) => {
                        setBookData({
                            ...bookData,
                            [e.target.name]: e.target.files[0]
                        })
                    }} /> <br /><br />

                    <label htmlFor="idNo"><b> id Number : </b></label><br />
                    <input type="text" name="idNo" onChange={onChangeHandler} /><br /><br />

                    <label htmlFor="pageCount"><b> Page Count : </b></label><br />
                    <input type="text" name="pageCount" onChange={onChangeHandler} /><br /><br />

                    <label htmlFor="publisher"><b> Publisher : </b></label><br />
                    <input type="text" name="publisher" onChange={onChangeHandler} /><br /><br />

                    <label htmlFor="synopsis"><b> Synopsis : </b></label><br />
                    <input type="text" name="synopsis" onChange={onChangeHandler} /><br /><br />
                    <input type="submit" value="Add" />
                </form>
            </div>
            {/* </center> */}
        </div>
    )
}

export default Body;