import styles from './studentsList.module.css';
import { useEffect, useState } from 'react';
import { BlockUserApi, DeleteUserApi, GetUsersApi } from '@/app/api/userApi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import "../../Toast.css";
import EditStudent from './editStudent/editStudent';

export default function studentsList() {
    const [choose, setChoose] = useState(true);
    const [studentsList, setStudentsList] = useState<any[]>();
    const [search, setSearch] = useState("");
    const [refresh, setRefresh] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [studentId, setStudentId] = useState<number>();

    function clearEdits() {
        setIsAdding(false);
        setIsEditing(false);
        setStudentId(undefined);
    }

    function alertToast(message: string, isError: boolean) {
        if(isError) {
            toast.error(message);
        } else {
            toast.success(message);
        }
    }

    useEffect(() => {
        async function getAllStudents() {
            const response = await GetUsersApi(choose, search);
            if(response.message) {
                toast.error(response.message);
                return;
            }

            setStudentsList(response);
        }

        getAllStudents();
    }, [choose, search, refresh])

    return(
        <>
        {isAdding && <EditStudent clear={clearEdits} alert={alertToast} refresh={() => setRefresh(refresh + 1)} />}
        {isEditing && <EditStudent id={studentId} clear={clearEdits} alert={alertToast} refresh={() => setRefresh(refresh + 1)}/>}
        <ToastContainer
            position='top-center'
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
        />
        <div className={styles.chooseList}>
            <span onClick={() => setChoose(true)} className={choose ? styles.active : styles.default}>სტუდენტები</span>
            <span onClick={() => setChoose(false)} className={!choose ? styles.active : styles.default}>ადმინები</span>
        </div>
        <div className={styles.main}>
            <div className={styles.search}>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='ძებნა'/>
                <button onClick={() => {setIsAdding(true)}}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="plus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
                    სტუდენტის დამატება
                </button>
            </div>
            <table className={styles.studentTable}>
                <thead>
                    <tr>
                    <th className={styles.tableHeader}></th>
                      <th className={styles.tableHeader}>{choose ? "სტუდენტი:" : "ადმინი"}</th>
                      <th className={styles.tableHeader}>ქულების რაოდენობა:</th>
                      <th className={styles.tableHeader}>ასაკი:</th>
                      <th className={styles.tableHeader}>ბლოკირება:</th>
                      <th className={styles.tableHeader}></th>
                    </tr>
                </thead>
                <tbody>
                    {studentsList && studentsList.map((student) => (
                        <tr key={student.id} className={styles.tableRow}>
                        <td className={styles.tableCell}><img src={student.profileImage || "/default/user.jpg"} alt="user" width={50} /></td>
                        <td className={styles.tableCell}>{student.firstName} {student.lastName}</td>
                        <td className={styles.tableCell}>null</td>
                        <td className={styles.tableCell}>{student.age || "***"}</td>
                        <td className={styles.tableCell}>{student.isBlocked ? "აქტიური" : "არააქტიური"}</td>
                        <td className={styles.tableCell}>
                            <div className={styles.editStudent}>
                                <img onClick={async () => {
                                    const response = await BlockUserApi(student.id.toString())
                                    response.message ? toast.error(response.message) : toast.success(response);
                                    setRefresh(refresh + 1);
                                }} src={student.isBlocked ? '/admin/unblock.svg' : '/admin/block.svg'} width={18} />
                                <img onClick={() => {
                                    setIsEditing(true)
                                    setStudentId(student.id)
                                }} src='/admin/edit.svg' />
                                <img onClick={async () => {
                                    const response = await DeleteUserApi(student.id.toString())
                                    response.message ? toast.error(response.message) : toast.success(response);
                                    setRefresh(refresh + 1);
                                }} src='/admin/trash.svg' />
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}