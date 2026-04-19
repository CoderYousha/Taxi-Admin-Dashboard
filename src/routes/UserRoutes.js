import Drivers from "../pages/user/Drivers";


function UserRoutes(){
    return [
        {
            path: "/drivers",
            element: <Drivers />
        },
    ];
}

export default UserRoutes;