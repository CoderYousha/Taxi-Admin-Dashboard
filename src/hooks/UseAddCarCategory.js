import { useState } from "react";

export function useAddCarCategory (){
    const [category, setCategory] = useState('');    
    const [type, setType] = useState('KM');    
    const [price, setPrice] = useState('');

    return {
        category, setCategory, type, setType, price, setPrice
    };
}