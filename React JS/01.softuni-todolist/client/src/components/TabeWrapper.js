import Todo from "./Todo"

export default function TableWarapper({ todos, changeStatus }) {


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

                    {todos.map(todo => ( <Todo key={todo._id} changeStatus={changeStatus} {...todo}/>

                    ))}



                </tbody>
            </table>
        </div>
    )
}