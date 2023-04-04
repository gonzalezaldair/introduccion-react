import React from "react";
import  { useLocalStorage } from "./useLocalStorage"

const TodoContext = React.createContext();



function TodoProvider(props)
{

    const {
        item: Todos,
        saveItem: saveTodos,
        loading,
        error
      } = useLocalStorage("TODOS_V1", []);
    
      const [searchValue, setSearchValue] = React.useState("");
      const [openModal, setOpenModal] = React.useState(false);
    
      const completedTodos = Todos.filter((todo) => !!todo.completed).length;
      const totalTodos = Todos.length;
    
      let searchedTodos = [];
    
      if (!searchValue.length >= 1) {
        searchedTodos = Todos;
      } else {
        searchedTodos = Todos.filter((todo) => {
          const todoText = todo.text.toLowerCase();
          const searchText = searchValue.toLowerCase();
    
          return todoText.includes(searchText);
        });
      }


      const addTodo = (text) => {

        const newTodos = [...Todos];

        newTodos.push({
          completed: false,
          text
        });
    
        saveTodos(newTodos);
      };
    
      const completeTodo = (text) => {
        const newTodos = [...Todos];
    
        const todoIndex = Todos.findIndex((todo) => todo.text === text);
        newTodos[todoIndex].completed = true;
    
        saveTodos(newTodos);
      };
    
      const deleteTodo = (text) => {
        const newTodos = [...Todos];
    
        const todoIndex = Todos.findIndex((todo) => todo.text === text);
    
        newTodos.splice(todoIndex, 1);
    
        saveTodos(newTodos);
      };
    


    return (
        <TodoContext.Provider value={{
            
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            addTodo,
            completeTodo,
            deleteTodo,
            openModal, 
            setOpenModal

         }}>
            {props.children}
        </TodoContext.Provider>
    );
}



export { TodoContext, TodoProvider };
