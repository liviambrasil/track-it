import styled from 'styled-components';
import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';
import axios from 'axios'

export default function Habits () {

    const { user } = useContext(UserContext);
    const { token } = user;
    const [newHabit, setNewHabit] = useState("")
    const [habitDays, setHabitDays] = useState([])
    const [boolean, setBoolean] = useState(false)
    const [habits, setHabits] = useState([])
    const [displayForm, setDisplayForm] = useState(false)


    const config = {headers: {"Authorization": `Bearer ${token}`}}

    useEffect (() => {
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        request.then(response => {setHabits(response.data)
        })
    }
    , []);

    return (
        <HabitPage>
            <MyHabits>
                <h1>Meus hábitos</h1>
                <button onClick={() => setDisplayForm(true)}>+</button>
            </MyHabits>
            <AddHabit   displayForm={displayForm}
                        newHabit={newHabit} setNewHabit={setNewHabit}
                        boolean={boolean} setBoolean={setBoolean}
                        habitDays={habitDays} setHabitDays={setHabitDays}
                        config={config}
                        />
            <Habit habits={habits}/>
            <NoHabit habits={habits}/>
        </HabitPage>
    )
}

function AddHabit (props) {

    const {displayForm, newHabit, setNewHabit, boolean, setBoolean, habitDays, setHabitDays, config} = props

    function SaveHabit () {
        console.log("rodou SaveHabit")
        const { habitDays, newHabit, config } = props
        const body = { name: newHabit, days: habitDays}
        console.log(body)
    
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
        request.then((response) => console.log(response))
    }

    if (displayForm){
        return (
            <AddHabitsDiv>
                <input  onChange={(event) => setNewHabit(event.target.value)}
                        type="text" 
                        placeholder="nome do hábito" 
                        disabled={boolean} />
                <Days>
                    <button onClick={() => setHabitDays([...habitDays, 1])} disabled={boolean}>D</button>
                    <button onClick={() => setHabitDays([...habitDays, 2])} disabled={boolean}>S</button>
                    <button onClick={() => setHabitDays([...habitDays, 3])} disabled={boolean}>T</button>
                    <button onClick={() => setHabitDays([...habitDays, 4])} disabled={boolean}>Q</button>
                    <button onClick={() => setHabitDays([...habitDays, 5])} disabled={boolean}>Q</button>
                    <button onClick={() => setHabitDays([...habitDays, 6])} disabled={boolean}>S</button>
                    <button onClick={() => setHabitDays([...habitDays, 7])} disabled={boolean}>S</button>
                </Days>
                <Commands>
                    <p>Cancelar</p>
                    <button onClick={SaveHabit}>
                        Salvar
                    </button>
                </Commands>
            </AddHabitsDiv>
        )
    }
    else { return (<> </>)}
}       

function NoHabit (props) {
    const { habits } = props
    if(habits.length === 0 || habits === undefined) {
        return (
            <NoHabits>
                <h1>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </h1>
            </NoHabits>
        )
    }
    else {
        return (<> </>)
    }
}
function Habit (props) {
    const { habits } = props
    if(habits.length === 0 || habits === undefined) {
        return (<> </>)
    }
    else {
    return (
        <HabitDiv>
            <h1>Nome do hábito</h1>
            <Days>
                <button>D</button>
                <button>S</button>
                <button>T</button>
                <button>Q</button>
                <button>Q</button>
                <button>S</button>
                <button>S</button>
            </Days>
            <img src="img/trash.png" />
        </HabitDiv>
    )}
}
function SaveHabit (props) {
    console.log("rodou SaveHabit")
    const { habitDays, newHabit, config } = props
    const body = { name: newHabit, days: habitDays}
    console.log(props)

    //const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
}

//styled component
const HabitPage = styled.div `
    width: 100%;
    height: 100vh;
    background: #f2f2f2;
    margin-top: 68px;
    padding: 28px 18px;
`
const HabitDiv = styled.div `
    width: 341px;
    height: 91px;
    background: #fff;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 15px;
    color: #666666;

    h1 {
        font-size: 20px;
        margin-bottom: 8px;
    }
    img {
        position: absolute;
        top: 11px;
        right: 10px;
    }
`
const Days = styled.div `
    display: flex;
    button {
            width: 30px;
            height: 30px;
            background: #fff;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            font-size: 20px;
            font-weight: 400;
            color: #DBDBDB;
            margin-right: 4px;
        }
`
const MyHabits = styled.div `
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
    h1 {
        font-size: 23px;
        font-weight: 400;
        color: #126BA5;
    }
    button {
        width: 40px;
        height: 35px;
        background:#52B6FF;
        border-radius: 4.5px;
        color: #fff;
        font-size: 27px;
        border:none;
    }
`
const NoHabits = styled.div `
    h1{
        color:#666666;
        font-size: 17.98px;
        line-height:22.47px;
        font-weight: 400;
        margin-top: 20px;
    }
`
const AddHabitsDiv = styled.div `
    width: 341px;
    height: 180px;
    background: #fff;
    border-radius: 5px;
    padding: 18px;
    margin-bottom: 10px;
    position: relative;
        input {
            width:303px;
            height: 45px;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            margin-bottom: 8px;
            padding-left: 11px;
            font-size: 20px;
            color:#666666;
        }
        ::placeholder {
        color: #DBDBDB;
    }
`
const Commands = styled.div `
    display:flex;
    align-items: center;
    position: absolute;
    bottom: 15px;
    right: 15px;

    p {
        color: #52B6FF;
        font-size: 16px;
        font-weight: 400;
        margin-right: 23px;
    }
    button {
        width:84px;
        height: 35px;
        background:#52B6FF;
        border-radius: 4.5px;
        border: none;
        font-size: 16px;
        color: #fff;  
    }
`