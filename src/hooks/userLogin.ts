import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        console.log('Login function called with:', { email, password });
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('api.chanolja.com/', {
                method: 'GET' ,
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({ email, password }),
                credentials: 'include'

            });
            
        }

        // try {
        //     setLoading(true);
        //     setError(null);

        //     const response = await fetch('https://your-server.com/api/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ email, password }),
        //     });

        //     const data = await response.json();

        //     if (!response.ok) {
        //         throw new Error(data.message || '로그인 실패');
        //     }

        //     return data;
        // } catch (err: any) {
        //     setError(err.message);
        //     throw err;
        // } finally {
        //     setLoading(false);
        // }
    };

    return { login, loading, error };
};
