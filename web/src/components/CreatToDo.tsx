import React, { useState } from "react";
import { dataToDoType } from "../App";
import axios from "axios";

type Props = {
  setLists: React.Dispatch<React.SetStateAction<dataToDoType[]>>;
};

const Comp: React.FC<Props> = ({ setLists }) => {
  const [title, setTitle] = useState<string>("");

  const getData = async () => {
    const result = await axios.get("http://localhost:8080/get/lists");
    setLists(result.data);
  };

  const submitInsertToDo = async () => {
    if (!!title) {
      await axios.post("http://localhost:8080/insert/todo", {
        title: title,
      });
      setTitle("");
      await getData();
    }
  };

  function handleChange(element: React.ChangeEvent<HTMLInputElement>) {
    setTitle(element.target.value);
  }

  return (
    <div>
      <input type="text" onChange={(e) => handleChange(e)} value={title} />
      <button type="button" onClick={submitInsertToDo}>
        New List
      </button>
    </div>
  );
};

export default Comp;
