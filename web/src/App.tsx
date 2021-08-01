import React, { useState, useEffect } from "react";
import ToDo from "./components/CreatToDo";
import SubTask from "./components/SubTask/index";
import axios from "axios";

export type dataToDoType = {
  id: number;
  title: string;
  status: boolean;
  created_at: string;
};

const Comp: React.FC<any> = () => {
  const [lists, setLists] = useState<Array<dataToDoType>>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await axios.get("http://localhost:8080/get/todos");
    if(!!result?.data && result.data.length > 0)
    {
      setLists(result.data);
    }
  };

  return (
    <div>
      <h1> To do App</h1>
      <ToDo setLists={setLists} />
      <div>
        {lists?.map((data, key) => {
          return (
            <div key={key}>
              <SubTask 
                id={data.id} 
                title ={data.title}
                status={data.status} 
                listsTodo={lists}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comp;
