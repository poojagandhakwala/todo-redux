const initialState = {
  todos: [
    {
      id: 1,
      title: "Todo 1",
      description: "Desc 1",
      isCompleted: false,
      isPending: true,
    },
    {
      id: 2,
      title: "Todo 2",
      description: "Desc 2",
      isCompleted: true,
      isPending: false,
    },
    {
      id: 3,
      title: "Todo 3",
      description: "Desc 3",
      isCompleted: false,
      isPending: true,
    },
  ],
  isEdit: false,
  editTodoId: "",
};

const todoReducer = (state = initialState, action) => {
  if (action.type === "ADD_TODO") {
    const { id, title, description } = action.payload;

    return {
      ...state,
      todos: [
        ...state.todos,
        {
          id: id,
          title: title,
          description: description,
          isCompleted: false,
          isPending: true,
        },
      ],
      isEdit: action.isEdit,
    };
  } else if (action.type === "DELETE_TODO") {
    const newTodo = state.todos.filter((item) => item.id !== action.id);
    return {
      ...state,
      todos: newTodo,
    };
  } else if (action.type === "EDIT_TODO") {
    const editTodo = action.payload;
    const newEditTodo = state?.todos?.find((item) => item?.id === editTodo?.id);
    return {
      ...state,
      isEdit: action.isEdit,
      editTodo: newEditTodo,
    };
  } 
  else if (action.type === "UPDATE_TODO") {
    const { todoId, todoTitle, todoDescription } = action.payload;
    let todos = state.todos.filter((todo) => {
      return todo.id !== todoId;
    });

    let todo = state.todos.find((todo) => todo?.id === todoId);
    todo.title = todoTitle;
    todo.description = todoDescription;
    todo.isCompleted = todo?.isCompleted;
    todo.isPending = todo?.isPending;
    todos.push(todo);

    return {
      ...state,
      todos: [...todos],
      isEdit: false,
    };

  } else if (action.type === "MARK_COMPLETED") {
    const { selectedTodoId } = action.payload;
    let all_todos = [];

    selectedTodoId.forEach((id) => {
      all_todos = state.todos.filter((todo) => {
        return todo.id !== id;
      });

      const selectedTodo = state.todos.find((todo) => todo?.id === id);
     
      selectedTodo.title = selectedTodo?.title;
      selectedTodo.description = selectedTodo?.description;
      selectedTodo.isCompleted = true;
      selectedTodo.isPending = selectedTodo?.isPending;
      all_todos.push(selectedTodo);
    });

    return {
      ...state,
      todos: [...all_todos],
      isEdit: false,
    };
  } else if (action.type === "CLEAR_ALL_TODO") {
    return {
      ...state,
      todos: [],
    };
  } else {
    return state;
  }
};

export default todoReducer;
