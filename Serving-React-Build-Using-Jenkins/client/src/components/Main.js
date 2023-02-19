import BookItem from "./BookItem"
import Loading from "./Loading"

function Main({ data, loading }) {

    if (loading)
        return <Loading />

    return (
        <div className="main">
            <div >
                {data.map((elem, index) => (
                    <BookItem key={index} elem={elem} />
                ))}
            </div>
        </div>
    )
}

export default Main;