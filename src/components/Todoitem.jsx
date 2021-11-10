import { useState } from "react"

export const Todoitem = ({ prop1, prop2 }) => {

    const [text, setText] = useState("")

    const addtext = (e) => {
        setText(e.target.value)
    }

    const addTolist = () => {

        if (!text.trim().length) {
            alert("Add Something")
            return;
        };

        fetch("http://localhost:3001/todos", {
            method: "POST",
            body: JSON.stringify({
                title: text,
                status: false
            }),

            headers: {
                "Content-Type": "application/json"
            },
        }).then(() => {
            prop2()
            setText("")
            prop1()
        })
    }


    return <div id="todoinput">
        <input value={text} type="text" placeholder="Add a to-do..." onChange={addtext}></input>
        <button onClick={addTolist}>+</button>
    </div>
}