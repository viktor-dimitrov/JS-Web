import {useEffect, useState} from 'react';
import AddTodo from './components/AddTodo';
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

  const onChangeStatus = (id) => {
    setTodos(state => state.map(todo => todo._id === id ? ({...todo, isCompleted: !todo.isCompleted}) : todo))
  }

  const onAddTodo = () => {
    const newTodo = {
        _id : `todo_${Number(todos[todos.length -1]._id.split('_')[1]) + 1}`,
        text : prompt('Task text:'),
        isCompleted : false
    }
    setTodos(state => [...state, newTodo ]);
  }

  return (
    <>
    <Header />
    {/* <!-- Main content --> */}
    <main className="main">
  
      {/* <!-- Section container --> */}
      <section className="todo-list-container">
        <h1>Todo List</h1>

        < AddTodo addTodo={onAddTodo} />

  
      <TableWarapper todos={todos} changeStatus={onChangeStatus}/>

      </section>
    </main>
  
    {/* <!-- Footer --> */}
<Footer />
    </>
  );
}

export default App;
