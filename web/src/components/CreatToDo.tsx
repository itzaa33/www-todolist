import React, { useState } from "react";
import { dataToDoType } from "../App";
import axios from "axios";

import TextField from "@material-ui/core/TextField";

type Props = {
  setLists: React.Dispatch<React.SetStateAction<dataToDoType[]>>;
};

const Comp: React.FC<Props> = ({ setLists }) => {
  const [title, setTitle] = useState<string>("");

  const getData = async () => {
    const result = await axios.get("http://localhost:8080/get/todos");
    setLists(result.data);
  };

  const submitInsertToDo = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!!title && e.key === "Enter") {
      await axios.post("http://localhost:8080/insert/todo", {
        title: title,
      });
      setTitle("");
      await getData();
    }
  };

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(element.target.value);
  };

  return (
    <TextField
      id="outlined-full-width"
      label="Label"
      placeholder="Placeholder"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      onKeyDown={(e) => submitInsertToDo(e)}
      onChange={(e) => handleChange(e)}
      value={title}
    />
  );
};

export default Comp;
