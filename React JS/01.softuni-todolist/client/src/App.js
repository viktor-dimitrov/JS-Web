import {useEffect, useState} from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import TableWarapper from './components/TabeWrapper';
// import Loading from './components/Loading'


function App() {

  const [todos, setTodos] = useState([])

  useEffect( () => {
    fetch(`http://localhost:3030/jsonstore/todos`)
    .then(res => res.json())
    .then(data => {
      setTodos(Object.values(data));
    })
  }, []);

  const changeStatus = (id) => {
    setTodos(state => state.map(todo => todo._id === id ? ({...todo, isCompleted: !todo.isCompleted}) : todo))
  }



  return (

    <>
 
    <Header />

  
    {/* <!-- Main content --> */}
    <main className="main">
  
      {/* <!-- Section container --> */}
      <section className="todo-list-container">
        <h1>Todo List</h1>
  

        <div className="add-btn-container">
            <button className="btn">+ Add new Todo</button>
        </div>
  
      <TableWarapper todos={todos} changeStatus={changeStatus}/>


      </section>
    </main>
  
    {/* <!-- Footer --> */}
<Footer />
    </>
  );
}

export default App;
