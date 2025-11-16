import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import InputTodo from "./InputTodo";
import TodoItem from "./TodoItem";

const TodoApp = () => {
  const [activeTab, setActiveTab] = useState("todo");
  const [todoTasks, setTodoTasks] = useState([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  // Todo取得
  const fetchTodo = async () => {
    // data: 成功した場合、取得したTodoのリスト
    // error: 失敗した場合、エラー内容
    const { data, error } = await supabase
      // todos テーブルにアクセス
      .from("todos")
      // 全てのカラム（id, title, isDone, created_at）を取得
      .select("*")
      // created_at（作成日時）の古い順に並べ替え
      // ascending: true = 昇順（古い→新しい）。false = 降順（新しい→古い）
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      // エラーがなければデータを更新 → 画面に表示される
      setTodoTasks(data);
    }
  };

  // Todo追加
  const addTodo = async (inputTitle) => {
    const { error } = await supabase
      .from("todos")
      //新しいデータを追加する(title: ユーザーが入力したタイトル isDone: 最初は未完了で false)
      .insert([{ title: inputTitle, isDone: false }]);

    if (error) {
      console.error("Error adding todos:", error);
    } else {
      // 成功したら: fetchTodo() を実行。fetchTodo() で最新のデータを再取得 → 画面が更新される
      fetchTodo();
    }
  };

  // Todoのチェック変更
  // id: どのTodoか
  const checkTodo = async (id, title, isDone) => {
    const { error } = await supabase
      .from("todos")
      // データを更新 isDone:!isDone = isDoneの反対にする /false → true（未完了 → 完了）/true → false（完了 → 未完了）
      .update({ isDone: !isDone })
      // どのデータを更新するかを指定/idカラムが引数のidと等しい行を更新
      .eq("id", id);

    if (error) {
      console.error("Error updating todos:", error);
    } else {
      fetchTodo();
    }
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todos:", error);
    } else {
      fetchTodo();
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto max-w-3xl p-6 md:px-20">
        <div role="tablist" className="tabs tabs-boxed grid grid-cols-2">
          <button
            role="tab"
            className={`tab ${activeTab === "todo" ? "tab-active" : ""}`}
            style={
              activeTab === "todo"
                ? { backgroundColor: "#3b82f6", color: "white" }
                : {}
            }
            onClick={() => setActiveTab("todo")}
          >
            やること
          </button>

          <button
            role="tab"
            className={`tab ${activeTab === "done" ? "tab-active" : ""}`}
            style={
              activeTab === "done"
                ? { backgroundColor: "#3b82f6", color: "white" }
                : {}
            }
            onClick={() => setActiveTab("done")}
          >
            完了
          </button>
        </div>

        <div>
          {activeTab === "todo" && (
            <div className="bg-base-100 border border-base-300 rounded-box py-3 px-10 text-sm min-h-[80vh] relative">
              {todoTasks.map((task) => {
                if (!task.isDone) {
                  return (
                    <TodoItem
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      isDone={task.isDone}
                      checkTodo={checkTodo}
                      deleteTodo={deleteTodo}
                    />
                  );
                }
                return null;
              })}
              <div className="absolute right-4 bottom-4">
                <InputTodo addTodo={addTodo} />
              </div>
            </div>
          )}
          {activeTab === "done" && (
            <div className="bg-base-100 border border-base-300 rounded-box p-6 text-sm min-h-[80vh]">
              {todoTasks.map((task) => {
                if (task.isDone) {
                  return (
                    <TodoItem
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      isDone={task.isDone}
                      checkTodo={checkTodo}
                      deleteTodo={deleteTodo}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
