export function buildCarCategoryFormData ({
    category,
    kmPrice,
    timePrice,
    id
}){
    const formData = new FormData();

    formData.append('name', category);
    formData.append('timePrice', timePrice);
    formData.append('KMPrice', kmPrice);
    formData.append('id', id);

    return formData;
}