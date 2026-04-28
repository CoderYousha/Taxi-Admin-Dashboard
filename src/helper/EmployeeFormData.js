export function buildEmployeeFormData ({
    firstName,
    lastName,
    phone,
    image,
    status,
    role,
    password
}){
    const formData = new FormData();

    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('phone', phone);
    if(image) formData.append('image', image);
    formData.append('status', status);
    formData.append('role', role);
    formData.append('password', password);

    return formData;
}