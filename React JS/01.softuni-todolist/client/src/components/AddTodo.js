

export default function AddTodo({addTodo}) {


    return (
        <div className="add-btn-container">
            <button className="btn" onClick={() => addTodo()}>+ Add new Todo</button>
        </div>
    )
}