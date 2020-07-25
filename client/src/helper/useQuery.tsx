import { useState, useEffect } from 'react';
import { environment } from '../environments/environment.json';
import { get } from './http-service';

export function useQuery<T>(path: string, queryParams: object | null, initialValue: T) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T>(initialValue);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let isCanceled = false;
        (async () => {
            setIsLoading(true);
            try {
                const result = await get<T>(`${environment.apiUrl}/api/${path}`, {
                    params: queryParams,
                    withCredentials: true,
                });
                setErrorMessage('');
                if (!isCanceled) {
                    setData(result.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
                if (error.response) {
                    setErrorMessage(error.response.data);
                } else setErrorMessage('Internal server error');
            } finally {
                setIsLoading(false);
            }
        })();
        return () => {
            isCanceled = true;
        };
    }, []);

    return [data, isLoading, errorMessage] as const;
}
