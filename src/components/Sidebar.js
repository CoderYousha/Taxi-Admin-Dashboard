import { Avatar, Box, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useConstants } from "../hooks/UseConstants";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { usePopups } from "../hooks/UsePopups";
import LogoutPopup from "../popup/Logout";
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Logo from "../images/logo/GS-taxi.png";

function Sidebar() {
    const { host } = useConstants();
    const { wait, profile } = useContext(AuthContext);
    const navigate = useNavigate();
    const { setPopup } = usePopups();
    const contents = [
        {
            "title": <FormattedMessage id="dashboard" />,
            "icon": <DashboardOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/dashboard",
        },
        {
            "title": <FormattedMessage id="car_categories" />,
            "icon": <LocalTaxiIcon fontSize="large" className="text-yellow-500" />,
            "path": "/car-categories",
        },
        {
            "title": <FormattedMessage id="drivers" />,
            "icon": <PeopleOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/drivers",
        },
        {
            "title": <FormattedMessage id="employees" />,
            "icon": <SupervisedUserCircleOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/employees",
        },
        {
            "title": <FormattedMessage id="tracking" />,
            "icon": <FmdGoodOutlinedIcon fontSize="large" className="text-yellow-500" />,
            "path": "/track",
        },
    ];

    return (
        <>
            {
                !wait &&
                <Box className='w-1/5 h-screen overflow-y-scroll none-view-scroll bg-white px-5 float-left'>
                    <img src={Logo} className="mt-5" />
                    <Box className='py-5 flex items-center'>
                        <Box className='px-1 py-1 border border-yellow-400 border-r-4 border-b-4 rounded-full relative'>
                            <Box onClick={() => navigate('/profile')} className='w-10 h-10 rounded-full bg-gray-400 text-white text-3xl flex justify-center items-center cursor-pointer'>
                                {profile.name.charAt(0)}
                            </Box>
                        </Box>
                        <Box className='!ml-5 max-sm:hidden'>
                            <Typography variant="h6" fontWeight={800}>{profile.name}</Typography>
                            <Typography variant="body2">Admin</Typography>
                        </Box>
                    </Box>
                    <Box className=''>
                        {
                            contents.map((content, index) =>
                                <NavLink key={index} to={content.path} className='mt-5 flex justify-between cursor-pointer rounded-full px-3 py-2'>
                                    {content.icon}
                                    <Typography variant="h6" className="text-yellow-500 max-sm:hidden">{content.title}</Typography>
                                </NavLink>
                            )
                        }
                        <Box className='mt-5 flex justify-between cursor-pointer rounded-full px-3 py-2' onClick={() => setPopup('logout', 'flex')}>
                            <LogoutOutlinedIcon fontSize="large" className="text-yellow-500" />
                            <Typography variant="h6" className="text-yellow-500 max-sm:hidden"><FormattedMessage id="logout" /></Typography>
                        </Box>
                    </Box>
                </Box>
            }
            <Box id="logout" className="w-screen h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center max-sm:left-0" sx={{ zIndex: 1000 }}>
                <LogoutPopup onClickCancel={() => setPopup('logout', 'none')} />
            </Box>
        </>
    );
}

export default Sidebar;