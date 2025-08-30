import {format} from "date-fns/format";


const Header = () => {

    const today = format(new Date(), "MM/dd/yy");

    return (
        <div className={"header"}>
            <h2>To Do Tracker</h2>
            <div className={"header-link"}>
                <a href="https://github.com/bloppo/todo-tracker2" target={"github"}>GitHub</a>
                {today}
            </div>
        </div>
    )
}

export default Header;