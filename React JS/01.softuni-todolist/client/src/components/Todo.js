

export default function Todo( {_id, text, isCompleted, changeStatus}) {

    return (
        <tr  className={isCompleted ? "todo is-completed" : "todo" }>
        <td>{text}</td>
        <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
        <td className="todo-action">
            <button className="btn todo-btn" onClick={() => changeStatus(_id) }>Change status</button>
        </td>
    </tr>
    )
}