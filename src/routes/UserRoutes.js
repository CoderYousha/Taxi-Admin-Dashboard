import Drivers from "../pages/user/Drivers";
import Employees from "../pages/user/Employees";


function UserRoutes(){
    return [
        {
            path: "/drivers",
            element: <Drivers />
        },
        {
            path: "/employees",
            element: <Employees />
        },
    ];
}

export default UserRoutes;