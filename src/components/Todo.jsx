import { useState, useEffect } from "react"
import { Todoitem } from "./Todoitem"
import { Todolist } from "./Todolist"
import '../styles/todo.css';

export const Todo = () => {

    const [list, setList] = useState([])
    const [flag, setFlag] = useState(false)
    const [datacount, setDatacount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch("http://localhost:3001/todos")
            .then((d) => d.json())
            .then((res) => {
                setDatacount(res.length);
            });
    }, [])

    useEffect(() => {
        getData()
    }, [page])

    async function getData() {
        const res = await fetch(`http://localhost:3001/todos?_page=${page}&_limit=3`)
            .then((d) => d.json()).then(setLoading(false))
        setList(res);
    }

    const handledatacount = () => {
        setDatacount(datacount + 1)
    }

    const handletoggle = (id, st) => {

        fetch(`http://localhost:3001/todos/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                status: !st
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(() => {
            getData()
        })
    }

    const handleDelete = (id) => {

        fetch(`http://localhost:3001/todos/${id}`, { method: "DELETE" }).then(() => {
            setDatacount(datacount - 1)
            getData()
        })
    }

    return loading ? <h1>Loading...</h1> : (<div id="todo">

        <Todoitem prop1={getData} prop2={handledatacount} />

        <Todolist passlist={flag ? list.filter(e => !e.status) : list} toggle={handletoggle} deleteTask={handleDelete} attr="todotasks" />
        
        <hr />

        <button id="buttonShow" onClick={() => setFlag(!flag)}> {flag ? "Show All" : "Show Completed Tasks"}</button>
        
        <Todolist passlist={flag ? list.filter(e => e.status) : []} toggle={handletoggle} deleteTask={handleDelete} attr="completedtodotasks" />

        <div id="navigators">
            <button id="prevShow" disabled={page === 1 ? true : false} onClick={() => setPage(page - 1)}>Prev</button>
            <button id="pagenumber">Page {page}</button>
            <button id="nextShow" disabled={page === Math.ceil(datacount / 3) ? true : false} onClick={() => setPage(page + 1)}>Next</button>
        </div>

    </div>)
}
