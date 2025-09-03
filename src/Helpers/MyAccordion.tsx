import {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type {MyAccordionPropsType} from "../Types/DataTypes.ts";

const MyAccordion = (props: MyAccordionPropsType) => {

    const [btnValue, setBtnValue] = useState("+")

    const handleChange = (id: string) => {
        const element = document.getElementById(id);
        if (btnValue === '+') {
            setBtnValue("-")
            element!.classList.add("myaccordion-show");
            element!.classList.remove("myaccordion-hide");
        } else if (btnValue === '-') {
            setBtnValue("+")
            element!.classList.add("myaccordion-hide")
            element!.classList.remove("myaccordion-show")
        }

    }

    //, top: props.style.top, left: props.style.left,
//, top: props.style.top, left: props.style.left,

    return (
        <div style={{margin: '10px'}}>
            <div className={"myaccordion-header"}
                 style={{
                     width: props.style.width, backgroundColor: props.style.bgHeaderColor
                 }}>
                <div>
                    <ExpandMoreIcon
                        className={btnValue === '-' ? 'myaccordion-rotated' : ''}
                        onClick={() => handleChange(props.id)}/>
                </div>
                <div><b>{props.title}</b></div>
            </div>
            <div id={props.id} className={"myaccordion-body myaccordion-hide"}
                 style={{
                     width: props.style.width, backgroundColor: props.style.bgBodyColor
                 }}>
                {props.children}
            </div>
        </div>
    )

}

export default MyAccordion
