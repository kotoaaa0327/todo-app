const TodoItem = (props) => {
  const { id, title, isDone, checkTodo, deleteTodo } = props;
  return (
    <div className="flex items-center overflow-hidden justify-between py-2">
      <div className="flex items-center">
        {/* チェックボックス */}
        <input
          type="checkbox"
          className="checkbox checkbox-xs"
          style={{
            backgroundColor: isDone ? "#93c5fd" : "transparent",
            borderColor: "#93c5fd",
          }}
          checked={isDone}
          onChange={() => checkTodo(id, title, isDone)}
        />

        <span className={`ml-3 ${isDone && "line-through"}`}>{title}</span>
      </div>
      {/* 削除ボタン */}
      <button
        type="button"
        // onClick={() => deleteTodo(id)}
        onClick={() =>
          document.getElementById(`delete_modal_${id}`).showModal()
        }
        className="hover:opacity-70 transition-opacity"
        aria-label="削除"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 stroke-red-500 md:size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>

      {/* 削除確認モーダル */}
      <dialog id={`delete_modal_${id}`} className="modal">
        <div className="modal-box">
          <p className="text-center">本当に削除しますか？</p>
          <div className="modal-action ">
            <div className="flex justify-center gap-4 w-full">
              {/*削除*/}
              <button
                className="btn"
                onClick={() => {
                  deleteTodo(id);
                  document.getElementById(`delete_modal_${id}`).close();
                }}
              >
                削除
              </button>
              {/*閉じる*/}
              <button
                type="button"
                className="btn "
                onClick={() =>
                  document.getElementById(`delete_modal_${id}`).close()
                }
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TodoItem;
