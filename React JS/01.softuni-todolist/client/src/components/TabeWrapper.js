export default function TableWarapper({ todos, changeStatus }) {

    console.log(todos)

    return (
        <div className="table-wrapper">

            {/* <!-- Loading spinner - show the load spinner when fetching the data from the server--> */}

            {/* <Loading /> */}

            {/* <!-- Todo list table --> */}
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-header-task">Task</th>
                        <th className="table-header-status">Status</th>
                        <th className="table-header-action">Action</th>
                    </tr>
                </thead>


                <tbody>

                    {todos.map(todo => (
                        <tr key={todo._id} className={todo.isCompleted ? "todo is-completed" : "todo" }>
                            <td>{todo.text}</td>
                            <td>{todo.isCompleted ? 'Complete' : 'Incomplete'}</td>
                            <td className="todo-action">
                                <button className="btn todo-btn" onClick={() => changeStatus(todo._id) }>Change status</button>
                            </td>
                        </tr>
                    ))}



                </tbody>
            </table>
        </div>
    )
}