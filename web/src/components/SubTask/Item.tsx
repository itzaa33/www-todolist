import React, { useState } from "react";
import { dataSubTaskType } from "../SubTask/index";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

type Props = dataSubTaskType

const Comp: React.FC<Props> = ({ id, title, status }) => {
  const defaultStatus = (status === "completed") ? true : false ;
  const [statusSubTask, setStatusSubTask] = useState<boolean>(defaultStatus);

  const handleChange = () => {

    const status = (!statusSubTask) ? "completed" : "pending";
    setStatusSubTask(!statusSubTask);
    axios.put("http://localhost:8080/update/subtask_status", {
      id: id,
      status: status,
    });
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      style={{ display: "flex", justifyContent: "end" }}
      fullWidth
      onClick={() => handleChange()}
    >
      <Checkbox
        checked={statusSubTask}
        onChange={() => handleChange()}
      />
      {title}
    </Button>
  );
};

export default Comp;
