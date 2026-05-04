export function buildCarCategoryFormData ({
    category,
    kmPrice,
    timePrice,
    openPrice,
    id
}){
    const formData = new FormData();

    formData.append('name', category);
    formData.append('timePrice', timePrice);
    formData.append('KMPrice', kmPrice);
    formData.append('openPrice', openPrice);
    formData.append('id', id);

    return formData;
}