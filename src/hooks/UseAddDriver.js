import { useState } from "react";

export function useAddDriver(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [idImage, setIdImage] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [insurance, setInsurance] = useState('');
    const [mechanics, setMechanics] = useState('');
    const [carType, setCarType] = useState('');
    const [carTypeId, setCarTypeId] = useState('');

    return {
        firstName, setFirstName, lastName, setLastName, phone, setPhone, password, setPassword, category, setCategory, type, 
        setType, price, setPrice, image, setImage, idImage, setIdImage, carNumber, setCarNumber, insurance, setInsurance,
        mechanics, setMechanics, carType, setCarType, carTypeId, setCarTypeId,
    };
}