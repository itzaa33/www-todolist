import React, { useEffect, useState } from "react";
import { dataToDoType } from "../../App";
import Item from "./Item";
import axios from "axios";

type Props = {
  id: number;
  title: string;
  status: boolean;
  listsTodo?: Array<dataToDoType>;
};

export type dataSubTaskType = {
  id: number;
  todo_id: number;
  title: string;
  status: boolean;
  created_at: string;
};

const Comp: React.FC<Props> = ({ id, title, status, listsTodo }) => {
  const [titleSubTask, setTitleSubTask] = useState<string>("");
  const [checkbox,setCheckbox] = useState<boolean>(status);
  const [listsSubTask, setListsSubTask] = useState<Array<dataSubTaskType>>([]);

  function handleChange(element: React.ChangeEvent<HTMLInputElement>) {
    setTitleSubTask(element.target.value);
  }

  const submitInsertSubTask = async () => {
    if (!!titleSubTask) {
      await axios.post("http://localhost:8080/insert/subtasks", {
        title: titleSubTask,
        todo_id: id,
      });
      setTitleSubTask("");

      await getData();
    }
  };

  const getData = async () => {
    const result = await axios.get(
      "http://localhost:8080/get/subtasks?id=" + id
    );
    if (!!result?.data && result.data.length > 0) {
      setListsSubTask(result.data);
    }
  };

  useEffect(() => {
    getData();
  }, [listsTodo, listsSubTask]);

  return (
    <div>
      <div>
      <input type="checkbox" defaultChecked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
      {title}
      </div>
      <div style={{ color: "red" }}>
        {!!listsSubTask &&
          listsSubTask?.map((value, key) => {
            return (
              <div key={key}>
                <Item {...value} listsTodo={listsTodo} />
              </div>
            );
          })}
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={titleSubTask}
        />
        <button type="button" onClick={submitInsertSubTask}>
          New Subtask
        </button>
      </div>
    </div>
  );
};

export default Comp;
