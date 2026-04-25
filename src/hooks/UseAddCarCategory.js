import { useState } from "react";

export function useAddCarCategory (){
    const [category, setCategory] = useState('');       
    const [kmPrice, setKmPrice] = useState('');
    const [timePrice, setTimePrice] = useState('');

    return {
        category, setCategory, kmPrice, setKmPrice, timePrice, setTimePrice
    };
}