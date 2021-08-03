import React, { useEffect, useState } from "react";
import { dataToDoType } from "../../App";
import Item from "./Item";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
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

  const submitInsertSubTask = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    
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
    if (!!result?.data && result.data.length > 0) {
      setListsSubTask(result.data);
    }
  };

  useEffect(() => {
    getData();
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
              <Checkbox
                checked={accordion === openAccordion}
                onChange={() => handleChangeAccordion(accordion)}
              />
            }
            label={title}
          />
        )}
      </AccordionSummary>
      {!!listsSubTask &&
        listsSubTask?.map((value, key) => {
          return (
            <AccordionDetails key={key} style={{padding:"0 40px",height:56}}>
              <Item {...value} />
            </AccordionDetails>
          );
        })}
      <div style={{ padding: "16px" }}>
        <TextField
          id="outlined-full-width"
          label="SubTask"
          placeholder="What to do?"
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
