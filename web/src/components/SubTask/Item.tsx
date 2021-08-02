import React, { useEffect, useState } from "react";
import { dataSubTaskType } from "../SubTask/index";
import { dataToDoType } from "../../App";
import axios from "axios";

import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

type Props = {
  listsTodo?: Array<dataToDoType>;
} & dataSubTaskType;

const Comp: React.FC<Props> = ({ id, title, status, listsTodo }) => {
  const [checkbox, setCheckbox] = useState<string>(status);

  const handleChange = () => {
    // setCheckbox(!checkbox);

    axios.put("http://localhost:8080/update/subtask_status", {
      id: id,
      status: !checkbox,
    });
  };

  return (
    // <div>
    //   {/* <input
    //     type="checkbox"
    //     defaultChecked={checkbox}
    //     onClick={() => handleChange()}
    //   /> */}
    //   {title}
    // </div>
    <Typography color="textSecondary">{title}</Typography>
  );
};

export default Comp;
