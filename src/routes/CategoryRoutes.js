import CarCategories from "../pages/category/CarCategories";

function CategoryRoutes(){
    return [
        {
            path: "/car-categories",
            element: <CarCategories />
        },
    ];
}

export default CategoryRoutes;