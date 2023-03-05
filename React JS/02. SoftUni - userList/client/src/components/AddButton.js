
export default function AddButton ({onAddClick}) {
    
    return (
        <button className="btn-add btn" onClick={()=> onAddClick()} >Add new user</button>
     )
}