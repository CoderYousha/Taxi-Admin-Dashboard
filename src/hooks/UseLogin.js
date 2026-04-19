import { useState } from "react";

export function useLogin () {
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();

    return {
        phone, setPhone, password, setPassword
    };
}