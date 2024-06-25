import { useEffect, useState } from 'react';
import styles from './editStudent.module.css';
import { CreateUserApi, EditUserApi, GetUserApi } from '@/app/api/userApi';

interface editProps {
    id?: number;
    clear: any;
    alert: any;
    refresh: any;
}

export default function editStudent(props: editProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(17);
    const [pass, setPass] = useState("");

    async function AddUser() {
        if(firstName == "" || lastName == "" || age == null) {
            props.alert("Please enter All Fields!", true);
            return;
        }
        const response = await CreateUserApi(firstName, lastName, age, pass);
        if(response.message) {
            props.alert(response.message, true);
        } else {
            props.alert(response, false);
            props.clear();
            props.refresh();
        }
    }

    async function EditUser() {
        if(firstName == "" || lastName == "" || age == null) {
            props.alert("Please enter All Fields!", true);
            return;
        }
        const response = await EditUserApi(props.id || 0, firstName, lastName, age, pass);
        if(response.message) {
            props.alert(response.message, true);
        } else {
            props.alert(response, false);
            props.clear();
            props.refresh();
        }
    }

    useEffect(() => {
        async function getUserInfo() {
            if(props.id) {
                const response = await GetUserApi(props.id);
                if(response.message) {
                    props.alert(response.message, true);
                    return;
                } 
                setFirstName(response.firstName);
                setLastName(response.lastName);
                setAge(response.age || 17);
            }
        }

        getUserInfo();
    }, [props.id]);

    return(
        <div className={styles.overlay}>
        <div className={styles.container}>
            <span className={styles.header}>{props.id ? "სტუდენტის შეცვლა" : "სტუდენტის დამატება"}</span>
            <div className={styles.halfInputs}>
                <div className={styles.inputDiv}>
                    <label htmlFor="firstName">სახელი</label>
                    <input required id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" />
                </div>
                <div className={styles.inputDiv}>
                    <label htmlFor="lastName">გვარი</label>
                    <input required id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
                </div>
            </div>
            <div className={styles.inputDiv}>
                <label htmlFor="age">ასაკი</label>
                <input required id='age' value={age} onChange={(e) => setAge(Number(e.target.value))} type="number" />
            </div>
            <div className={styles.inputDiv}>
                <label htmlFor="pass">პაროლი</label>
                <input placeholder={props.id ? "" : 'IF Null Password Will Generate Automatic'} id='pass' value={pass} onChange={(e) => setPass(e.target.value)} type="password" />
            </div>
            <div className={styles.buttons}>
                <button onClick={() => props.clear()} className={styles.deactive}>Cancel</button>
                <button onClick={() => {props.id ? EditUser() : AddUser()}} className={styles.active}>OK</button>
            </div>
        </div>
        </div>
    )
}