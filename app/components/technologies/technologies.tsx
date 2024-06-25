import styles from './technologies.module.css';
import { useEffect, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import "../../Toast.css";
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/app/atoms';
import { GetTechsApi } from '@/app/api/technologiesApi';


export default function technologies() {
    const [user, _] = useRecoilState<any>(userInfoState);
    const [technologies, setTechnologies] = useState<any>();

    useEffect(() => {
        async function patchTechs() {
            const response = await GetTechsApi();
            if(response.message) {
                toast.error(response.message);
                return;
            }

            setTechnologies(response);
        }

        patchTechs();
    }, [])

    return(
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
        <main className={styles.container}>
            <span>კომპიუტერული მეცნიერება</span>
            <div className={styles.cards}>
            { technologies && technologies.map((technique: any) => (
                <div className={styles.card}>
                <div className={styles.imgDiv}>
                    <img src={technique.image || ""} alt="image" />
                </div>
                <h3>{technique.name}</h3>
                <div className={styles.count}>
                    <span>{technique.topicsCount} ლექცია</span>
                    <div>
                        {user && user.role == 'admin' ? <img src='/admin/edit.svg' /> : ""}
                        {user && user.role == 'admin' ? <img src='/admin/trash.svg' /> : ""}
                    </div>
                </div>
            </div>
            ))
            }

            </div>
        </main>
        
        </>
    )
}