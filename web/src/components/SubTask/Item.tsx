import React, { useEffect, useState } from "react";
import { dataSubTaskType } from "../SubTask/index";
import { dataToDoType } from "../../App";
import axios from "axios";

type Props = {
  listsTodo?: Array<dataToDoType>;
} & dataSubTaskType;

const Comp: React.FC<Props> = ({ id, title, status, listsTodo }) => {

    const [checkbox,setCheckbox] = useState<boolean>(status);

  return (
    <div>
        <input type="checkbox" defaultChecked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
        {title}
    </div>
  )
};

export default Comp;
