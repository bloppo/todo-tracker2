import {useState, type CSSProperties, type ReactNode} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface MyAccordionProps {
    id: string;
    title: string;
    style: CSSProperties & {
        width: number;
        bgHeaderColor: string;
        bgBodyColor: string;
    };
    children: ReactNode;
}

const MyAccordion = (props: MyAccordionProps) => {

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

    return (
        <div style={{margin: '10px'}}>
            <div className={"myaccordion-header"}
                 style={{
                     width: props.style.width, top: props.style.top, left: props.style.left,
                     backgroundColor: props.style.bgHeaderColor
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
                     width: props.style.width, top: props.style.top, left: props.style.left,
                     backgroundColor: props.style.bgBodyColor
                 }}>
                {props.children}
            </div>
        </div>
    )

}

export default MyAccordion
