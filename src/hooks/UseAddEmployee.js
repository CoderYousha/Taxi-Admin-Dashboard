import { useState } from "react";

export function useAddEmployee (){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(0);

    return {
        firstName, setFirstName, lastName, setLastName, phone, setPhone, role, setRole, status, setStatus, image, setImage,
        password, setPassword
    };
}