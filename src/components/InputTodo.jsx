import { useState } from "react";

const InputTodo = (props) => {
  // 入力されたTodoをデータベースに追加
  const { addTodo } = props;
  const [todoTitle, setTodoTitle] = useState("");

  //  入力中の文字をそのまま保存
  const handleInputChange = (event) => {
    //event.target.value = 入力欄に今入力されている文字列全体→それをsetTodoTitleで文字列をstateに保存
    setTodoTitle(event.target.value);
  };

  // 追加する時に空白をチェック
  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== "") {
      addTodo(todoTitle);
      // 入力欄をクリア
      setTodoTitle("");
      // HTML の中から id="my_modal" の要素を探し、要素（モーダル）を閉じる
      document.getElementById("my_modal").close();
    }
  };

  return (
    <div>
      <button
        className="btn bg-blue-300"
        // ＋ボタン
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
