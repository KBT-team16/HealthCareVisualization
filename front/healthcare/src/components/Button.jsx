import { useState } from 'react';

const Button = (props) => {

    const [state, setState] = useState(2);

    return (
        <>
            <h1>{state}</h1>
            <button 
                onClick={()=> {
                    setState(state+1);

                }}>
                증가!
            </button>
            <button
                onClick={()=>{
                    setState(state-1);
                }}>
                    감소!!
            </button>
        </>
    )
}

Button.defaultProps = {
    color: "black",
};

export default Button;