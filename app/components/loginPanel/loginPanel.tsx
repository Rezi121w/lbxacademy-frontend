import styles from "./loginPanel.module.css";
import {useState} from "react";
import {Bounce, toast, ToastContainer} from "react-toastify";
import "../../Toast.css";
import { loginApi } from "@/app/api/loginApi";
// Recoil //
import { patchUserInfo } from "@/app/userInfo";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "@/app/atoms";
import { updateAccessToken } from "@/app/api/api";

export default function loginPanel({router}: any) {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const setUserInfo = useSetRecoilState(userInfoState);

    async function onLoginAttempt() {
        if(userName === "" || pass === "") {
            toast.warning("სახელი და პაროლი არ უნდა იყოს ცარიელი!");
            return;
        } 
        
        const loginAttempt = await loginApi(userName, pass);
        if(loginAttempt.accessToken) {
            toast.success(`გამარჯობა ${userName.split(" ")[0]}!`);
            localStorage.setItem('user', JSON.stringify(loginAttempt));

            // Go To Next Page And Patch User Info //////////////////////////////////
            const userInfo = await patchUserInfo(router);
            setUserInfo(userInfo);
            updateAccessToken();

            router.push("/");
            return;
        } 
        
        toast.error(loginAttempt.message);
    }

    return (
        <>
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

        <main className={styles.main}>
            <h1>ავტორიზაცია</h1>

            <div className={styles.input}>
                <label htmlFor="username">მიუთითეთ თქვენი username-ი</label>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" id="username" placeholder="UserName"/>
            </div>

            <div className={styles.input}>
                <label htmlFor="pass">მიუთითეთ თქვენი პაროლი</label>
                <div className={styles.passInput}>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type={passwordVisible ? 'text' : 'password'} id="pass" placeholder="Password"/>
                    <img onClick={() => setPasswordVisible(!passwordVisible)} src="/login/eye.svg" alt={"eye"} width={20} height={20} />
                </div>
            </div>

            <button onClick={() => {onLoginAttempt()}} className={styles.loginButton}><span>გაგრძელება</span></button>
        </main>
        </>
    );
}
