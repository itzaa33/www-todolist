import React, { useEffect, useState } from "react";
import { dataSubTaskType } from "../SubTask/index";
import axios from "axios";
import GreenCheckbox from "../GrennCheckBox"

import Button from "@material-ui/core/Button";
import AccordionDetails from "@material-ui/core/AccordionDetails";

type Props = dataSubTaskType;

const Comp: React.FC<Props> = ({ id, title, status }) => {
  const [statusSubTask, setStatusSubTask] = useState<boolean>(
    status === "completed" ? true : false
  );

  const handleChange = () => {
    const status = !statusSubTask ? "completed" : "pending";
    setStatusSubTask(!statusSubTask);
    axios.put("http://localhost:8080/update/subtask_status", {
      id: id,
      status: status,
    });
  };

  useEffect(() => {
    setStatusSubTask(status === "completed" ? true : false);
  }, [id]);

  return (
    <AccordionDetails style={{ padding: "0 40px", height: 56 }}>
      <Button
        variant="outlined"
        color="default"
        style={{ display: "flex", justifyContent: "end" }}
        fullWidth
        onClick={() => handleChange()}
      >
        <GreenCheckbox checked={statusSubTask} onChange={() => handleChange()}/>
        {title}
      </Button>
    </AccordionDetails>
  );
};

export default Comp;
