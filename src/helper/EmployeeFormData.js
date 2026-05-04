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

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('number', phone);
    if(image) formData.append('image', image);
    formData.append('status', status);
    formData.append('role', role);
    formData.append('password', password);

    return formData;
}