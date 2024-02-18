import axios,{ AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiResponse<T>{
    loading: boolean;
    errors:Error | null;
    data: T | null;
    doRequest:()=>void;
}

const useQuery = <T>(
    method:RequestMethod,
    url:string,
    requestBody:any,
    onSuccess:(data:T)=> void
):ApiResponse<T> => {

    const [loading,setLoading] = useState<boolean>(false);
    const [errors,setErrors] = useState<Error | null>(null);
    const [data,setData] = useState<T|null>(null);

    const doRequest = async()=>{
        try {
            axios.defaults.withCredentials = true;
            const config:AxiosRequestConfig={
                method:method,
                url:url,
                data:requestBody,
                headers:{
                    'Content-Type':'application/json',
                },
            }
            const response:AxiosResponse<T> = await axios(config);
            setData(response.data);
            onSuccess(response.data); 
        } catch (error) {
            setErrors(error as Error);
        }finally{
            setLoading(false);
        }
    }
    return { loading, errors, data, doRequest};
}

export default useQuery;