export function buildDriverFormData({
    firstName,
    lastName,
    phone,
    password,
    category,
    type,
    price,
    image,
    idImage,
    carNumber,
    insurance,
    mechanics,
    carType,
    carTypeId,
}) {
    const formData = new FormData();

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('number', phone);
    formData.append('password', password);
    formData.append('roll', 'Driver');
    formData.append('name', category);
    formData.append('firstName', firstName);
    if (type) formData.append('type', type);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('IDImage', idImage);
    formData.append('carNumber', carNumber);
    formData.append('insurance', insurance);
    formData.append('mechanics', mechanics);
    formData.append('typeCar', carType);
    formData.append('CarTypeId', carTypeId);

    return formData;
}