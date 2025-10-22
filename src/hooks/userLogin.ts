import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formData = new FormData();

    const login = async (memberId: string, memberPwd: string) => {
        console.log('Login function called with:', { memberId, memberPwd });
        formData.append("memberId", memberId);
        formData.append("memberPwd", memberPwd);
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://api.chanolja.com/member/login', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            
            const data = await response.json();
            

            if (!response.ok) {
                throw new Error(data.message || '로그인 실패');
            }
            return data;
        }
        catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};
