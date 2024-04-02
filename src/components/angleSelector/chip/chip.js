import { useState } from 'react';
export const Chip = (props) => {
    const [active,setActive] = useState(0)

    const _handleClick = (index) => {
        setActive(index);
        props.onChange(props.options[index])
    }
    return <>
    {props.options.map((option,i) => <button style={{background:active===i?'lightblue':'#cecece'}} onClick={() => _handleClick(i)}>{option}</button>)}    
    </>
}