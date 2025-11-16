import { useState } from "react";

const InputTodo = (props) => {
  const { addTodo } = props;
  const [todoTitle, setTodoTitle] = useState("");

  const handleInputChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== "") {
      addTodo(todoTitle);
      setTodoTitle("");
      document.getElementById("my_modal").close();
    }
  };

  return (
    <div className="">
      <button
        className="btn bg-blue-300"
        onClick={() => document.getElementById("my_modal").showModal()}
      >
        +
      </button>
      <dialog id="my_modal" className="modal">
        <div className="modal-box">
          <input
            type="text"
            className="input w-full"
            placeholder="やること"
            onChange={handleInputChange}
            value={todoTitle}
          />
          <div className="modal-action ">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex justify-center">
                {/*追加*/}
                <button type="submit" className="btn mr-10">
                  追加
                </button>
                {/*閉じる*/}
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("my_modal").close()}
                >
                  閉じる
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default InputTodo;
