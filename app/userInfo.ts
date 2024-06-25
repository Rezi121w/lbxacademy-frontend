import { GetMeApi } from './api/userApi';

export async function patchUserInfo(router: any) {
    if(typeof window === "undefined") return;

    // If Token Request //
    const request = await GetMeApi();
    if(!request.id) {
        const currentPath = router ? router.pathname : "/";
        localStorage.removeItem("user");

        if (currentPath !== '/login') {
            router.push('/login');
        }
        return;
    }

    return request;
}