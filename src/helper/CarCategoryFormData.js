export function buildCarCategoryFormData ({
    category,
    type,
    price,
    id
}){
    const formData = new FormData();

    formData.append('name', category);
    formData.append('type', type);
    formData.append('price', price);
    formData.append('id', id);

    return formData;
}