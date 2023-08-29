import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllTodo,
  deleteTodo,
  editTodo,
  markTodoCompleted,
} from "./../redux/actions/index";

const TodoLists = () => {
  const todos = useSelector((state) => state.todoItem.todos);
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState([]);

  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      dispatch(editTodo(data?.todo?.id));
    }
    if (data && data.type === "delete") {
      dispatch(deleteTodo(data?.todo?.id));
    }
  };

  const changeEvent = (e, todoId) => {
    if (e?.target?.name !== "select_all_todo" && e?.target?.checked === true) {
      console.log("yes"+selectedTodo.indexOf(todoId));
      if (selectedTodo.indexOf(todoId) === -1)
        setSelectedTodo((todo) => [...todo, todoId]);
    } else if (
      e.target.name !== "select_all_todo" &&
      e.target.checked === false
    ) {
      const todos = selectedTodo.filter((todo) => todo === todoId);
      setSelectedTodo(todos);
    }

    if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
      todos &&
        todos.forEach((todo, index) => {
          const checkbox = document.getElementsByName(`todo_${index}`);

          for (let item of checkbox) {
            item.checked = true;
            let todoId = item?.id;

            setSelectedTodo((todo) => [...todo, todoId]);
          }
        });

    } else if (
      e?.target?.name === "select_all_todo" &&
      e?.target?.checked === false
    ) {
      todos &&
        todos.forEach((todo, index) => {
          let checkbox = document.getElementsByName(`todo_${index}`);

          for (let item of checkbox) {
            item.checked = false;

            setSelectedTodo([]);
          }
        });
    }
    
  };

  const markCompleted = () => {
    dispatch(markTodoCompleted(selectedTodo));
    setSelectedTodo([]);

  };

  return (
    <div className="container my-2">
      <div className="row pb-4" style={{ height: "60px" }}>
        <div className="col-xl-12 text-right">
          {selectedTodo.length > 0 && (
            <>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(clearAllTodo())}
              >
                Clear Todos
              </button>
              <button className="btn btn-success ml-2" onClick={markCompleted}>
                Mark As Completed
              </button>
            </>
          )}
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th width="3%">
              <input
                type={"checkbox"}
                onChange={(e) => changeEvent(e)}
                name={"select_all_todo"}
              />
            </th>
            <th width="30%">Name</th>
            <th width="42%">Description</th>
            <th width="8%">Status</th>
            <th width="20%">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos &&
            todos.map((todo, index) => (
              <tr key={index}>
                <td>
                  <input
                    type={"checkbox"}
                    value={todo?.id}
                    onChange={(e) => changeEvent(e, todo?.id)}
                    name={`todo_${index}`}
                  />
                </td>
                <td>{todo?.title}</td>
                <td>{todo?.description}</td>
                <td>
                  {todo?.isCompleted ? (
                    <span className=" badge-success p-2">Completed</span>
                  ) : todo?.isPending ? (
                    <span className="badge-danger p-2">Pending</span>
                  ) : (
                    <span className="badge-secondary p-2">None</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mx-2"
                    onClick={() => actionClick({ todo: todo, type: "edit" })}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm "
                    onClick={() => actionClick({ todo: todo, type: "delete" })}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoLists;
