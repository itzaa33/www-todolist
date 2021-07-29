import React, { useState } from 'react';
import axios from 'axios';

const Comp: React.FC<any> = () =>
{

    const [count, setCount] = useState("");

    axios.get("http://localhost:8080/").then((result) => {
      setCount(result.data);
    })
    .catch( (error) => {
      setCount("error");
    })

    return (
        <p>{count} eiei</p>
    );
}

export default Comp;