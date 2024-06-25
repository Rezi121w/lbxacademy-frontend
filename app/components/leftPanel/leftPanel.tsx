import styles from './leftPanel.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// User_INFO //
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/app/atoms';


export default function leftPanel() {
    const [user, _] = useRecoilState<any>(userInfoState);
    const pathname = usePathname();

    return(
        <div className={styles.main}>
            <div className={styles.logoDiv}>
                <img src="/menu/logo.jpeg" alt="logo" />
            </div>
            <div className={styles.menuItems}>
                <Link href="/"><Image src={pathname !== "/" ? "/menu/home.svg" : "/menu/homeActive.svg"} alt='home.svg' width={24} height={24} /></Link>
                {user && user.role == "admin" ? 
                <Link href="/students"><Image src={pathname !== "/students" ? "/menu/students.svg" : "/menu/studentsActive.svg"} alt='students.svg' width={24} height={24} /></Link> 
                : ""}
                <Link href="/announcement"><Image src={pathname !== "/announcement" ? "/menu/announcement.svg" : "/menu/announcementActive.svg"} alt='announcement.svg' width={24} height={24} /></Link>
                <Link href="/leaderboard"><Image src="/menu/leaderBoard.svg" alt='leaderBoard.svg' width={24} height={24} /></Link>
                <Link href="/games"><Image src="/menu/game.svg" alt='game.svg' width={24} height={24} /></Link>
                <Link href="/homework"><Image src="/menu/homework.svg" alt='homework.svg' width={24} height={24} /></Link>
            </div>

        </div>
    )
}