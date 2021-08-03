import React, { useEffect, useState } from "react";
import { dataToDoType } from "../../App";
import Item from "./Item";
import axios from "axios";
import GreenCheckbox from "../GrennCheckBox"

import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

type Props = {
  id: number;
  title: string;
  status: statusType;
  listsTodo?: Array<dataToDoType>;

  accordion: string;
  openAccordion: string;
  setOpenAccordion: React.Dispatch<React.SetStateAction<string>>;
};

export type statusType = "pending" | "completed";

export type dataSubTaskType = {
  id: number;
  todo_id: number;
  title: string;
  status: statusType;
  created_at: string;
};

const Comp: React.FC<Props> = ({
  id,
  title,
  status,
  listsTodo,
  accordion,
  openAccordion,
  setOpenAccordion,
}) => {
  const [titleSubTask, setTitleSubTask] = useState<string>("");
  const [listsSubTask, setListsSubTask] = useState<Array<dataSubTaskType>>([]);
  const [rowSubTask, setRowSubTask] = useState<number>(0);
  const [completedSubTask, setCompletedSubTask] = useState<number>(0);

  const handleChangeAccordion = (value: string) => {
    if (value === openAccordion) {
      setOpenAccordion("");
    } else {
      setOpenAccordion(value);
    }
  };

  const handleChangeTextField = (
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitleSubTask(element.target.value);
  };

  const submitInsertSubTask = async (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (!!titleSubTask && e.key === "Enter") {
      await axios.post("http://localhost:8080/insert/subtask", {
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
    if (!!result?.data) {
      setListsSubTask(result.data);
    }
  };

  const handleDescriptionSubTask = () => {
    if (!!listsSubTask && listsSubTask.length > 0) {
      const row = listsSubTask.length;
      const completed = listsSubTask.filter((value: dataSubTaskType) => {
        return value.status === "completed";
      }).length;

      setRowSubTask(row);
      setCompletedSubTask(completed);
    } else {
      setRowSubTask(0);
      setCompletedSubTask(0);
    }
  };

  useEffect(() => {
    getData();
    handleDescriptionSubTask();
  }, [listsTodo, listsSubTask]);

  return (
    <Accordion
      expanded={accordion === openAccordion}
      onChange={() => handleChangeAccordion(accordion)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        {!!title && (
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={
              <GreenCheckbox
                checked={accordion === openAccordion}
                onChange={() => handleChangeAccordion(accordion)}
              />
            }
            label={title}
          />
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {`${completedSubTask} of ${rowSubTask} completed`}
        </div>
      </AccordionSummary>
      {!!listsSubTask &&
        listsSubTask?.map((value, key) => {
          return <Item {...value} key={key} />;
        })}
      <div style={{ padding: "16px" }}>
        <TextField
          id="outlined-full-width"
          label="SubTask"
          placeholder="What are the step?"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onKeyDown={(e) => submitInsertSubTask(e)}
          onChange={(e) => handleChangeTextField(e)}
          value={titleSubTask}
        />
      </div>
    </Accordion>
  );
};

export default Comp;
