import React, { useEffect, useState } from "react";
import { dataToDoType } from "../../App";
import Item from "./Item";
import axios from "axios";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type Props = {
  id: number;
  title: string;
  status: "pending" | "completed";
  listsTodo?: Array<dataToDoType>;
};

export type dataSubTaskType = {
  id: number;
  todo_id: number;
  title: string;
  status: "pending" | "completed";
  created_at: string;
};

const Comp: React.FC<Props> = ({ id, title, status, listsTodo }) => {
  const [titleSubTask, setTitleSubTask] = useState<string>("");
  const [checkbox,setCheckbox] = useState<string>(status);
  const [listsSubTask, setListsSubTask] = useState<Array<dataSubTaskType>>([]);

  const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    setTitleSubTask(element.target.value);
  }

  const submitInsertSubTask = async () => {
    if (!!titleSubTask) {
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
    <Accordion>
       <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
         {
            !!title &&
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox />}
              label={title}
            />
         }
        </AccordionSummary>
        {!!listsSubTask &&
          listsSubTask?.map((value, key) => {
            return (
              <AccordionDetails key={key}>
                <Item {...value} listsTodo={listsTodo} />
            </AccordionDetails>
            
            );
          })}
      </Accordion>
    //   <input type="checkbox" defaultChecked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
    //   {title}
    //   </div>
    //   <div style={{ color: "red" }}>
    //     {!!listsSubTask &&
    //       listsSubTask?.map((value, key) => {
    //         return (
    //           <div key={key}>
    //             <Item {...value} listsTodo={listsTodo} />
    //           </div>
    //         );
    //       })}
    //   </div>
    //   <div>
    //     <input
    //       type="text"
    //       onChange={(e) => handleChange(e)}
    //       value={titleSubTask}
    //     />
    //     <button type="button" onClick={submitInsertSubTask}>
    //       New Subtask
    //     </button>
    //   </div>
    // </div> 
  );
};

export default Comp;
