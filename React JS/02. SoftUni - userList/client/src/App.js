
import * as userService from "./services/userService";
import { useEffect, useState } from "react";

import "./App.css";


import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import UserList from "./components/UserList";
import AddButton from "./components/AddButton";
import Pagination from "./components/Pagination";




function App() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        userService.getAll()
        .then(users => {
            setUsers(users)
        })
        .catch(err => {
            console.log(err.message)
        })
    },[]);

    const [addButton, setAddButton] = useState(false);

    const onAddClick = () => {
        setAddButton(true);
    }

    const onCloseForm = () => {
        setAddButton(false)
    }

    const createCallBack = (user) => {
            setUsers(state => [...state, user])
    }

    const deleteCallBack = (userId) => {
            setUsers( state => state = state.filter(u => u._id !== userId));
    }

  

    return (
        <>
            < Header />
            <main className="main">
                <section className="card users-container">
                    < Search />

                    < UserList users={users} addButton={addButton} onCloseForm={onCloseForm} createCallBack={createCallBack} deleteCallBack={deleteCallBack} />

                    < AddButton onAddClick={onAddClick}/>

                    < Pagination />

                </section>
            </main>
            < Footer />
        </>
    );
}

export default App;
