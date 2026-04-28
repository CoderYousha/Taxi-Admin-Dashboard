import { Box, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';
import LocalTaxiOutlinedIcon from '@mui/icons-material/LocalTaxiOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

function Dashboard() {
    const { language } = useConstants();
    const theme = useTheme();

    return (
        <>
            <Box sx={{ backgroundColor: theme.palette.background.default }}>
                <Box className="w-4/5 rounded-xl relative h-screen overflow-y-scroll none-view-scroll" dir={language === 'en' ? 'ltr' : "rtl"} sx={{ float: language === 'en' && 'right' }}>
                    <Typography fontWeight={800} variant="h4" className="p-5"><FormattedMessage id="dashboard_title" /></Typography>
                    <Box className="flex justify-between px-5 gap-x-5 max-sm:flex-col max-sm:gap-y-5">
                        <Box className="bg-white w-full rounded-lg shadow-lg px-3 py-5 relative">
                            <Typography variant="body1"><FormattedMessage id="passenger_card" /></Typography>
                            <Typography className="py-2" variant="h4">12458</Typography>
                            <Typography className="text-green-500">+12.5% <FormattedMessage id="last_month" /></Typography>
                            <Box className="bg-yellow-500 rounded-lg absolute top-3 right-3 p-1">
                                <HailOutlinedIcon className="text-white" fontSize="large" />
                            </Box>
                        </Box>
                        <Box className="bg-white w-full rounded-lg shadow-lg px-3 py-5 relative">
                            <Typography variant="body1"><FormattedMessage id="driver_card" /></Typography>
                            <Typography className="py-2" variant="h4">387</Typography>
                            <Typography className="text-green-500">+8.2% <FormattedMessage id="last_month" /></Typography>
                            <Box className="bg-yellow-500 rounded-lg absolute top-3 right-3 p-1">
                                <LocalTaxiOutlinedIcon className="text-white" fontSize="large" />
                            </Box>
                        </Box>
                        <Box className="bg-white w-full rounded-lg shadow-lg px-3 py-5 relative">
                            <Typography variant="body1"><FormattedMessage id="financial_card" /></Typography>
                            <Typography className="py-2" variant="h4">84592$</Typography>
                            <Typography className="text-green-500">+18.7% <FormattedMessage id="last_month" /></Typography>
                            <Box className="bg-yellow-500 rounded-lg absolute top-3 right-3 p-1">
                                <AccountBalanceOutlinedIcon className="text-white" fontSize="large" />
                            </Box>
                        </Box>
                    </Box>
                    <Box className="px-5 mt-5">
                        <Box className="bg-white rounded-lg px-2 py-3">
                            <Box className="flex items-center">
                                <WarningAmberOutlinedIcon color="error" fontSize="large" />
                                <Typography fontWeight={700} variant="h5" className="pl-3"><FormattedMessage id="recent_alerts" /></Typography>
                            </Box>
                            <Box className="w-full p-3 flex justify-between items-center bg-red-100 border border-red-400 rounded-md mt-10">
                                <Box className="flex">
                                    <Box className="bg-red-500 rounded-lg py-3 px-2">
                                        <WarningAmberOutlinedIcon className="text-white" />
                                    </Box>
                                    <Box className="ml-3">
                                        <Typography fontWeight={800} variant="body1">John Smith</Typography>
                                        <Typography variant="body1">Downtown Area</Typography>
                                    </Box>
                                </Box>
                                <Box className="flex flex-col justify-center items-center">
                                    <Box className="rounded-full text-white bg-red-500 px-3 py-1">
                                        <Typography variant="body1">SOS</Typography>
                                    </Box>
                                    <Typography className="pt-2">2 mins ago</Typography>
                                </Box>
                            </Box>
                            <Box className="w-full p-3 flex justify-between items-center bg-red-100 border border-red-400 rounded-md mt-5">
                                <Box className="flex">
                                    <Box className="bg-red-500 rounded-lg py-3 px-2">
                                        <WarningAmberOutlinedIcon className="text-white" />
                                    </Box>
                                    <Box className="ml-3">
                                        <Typography fontWeight={800} variant="body1">Sarah Johnson</Typography>
                                        <Typography variant="body1">Airport Road</Typography>
                                    </Box>
                                </Box>
                                <Box className="flex flex-col justify-center items-center">
                                    <Box className="rounded-full text-white bg-red-500 px-3 py-1">
                                        <Typography variant="body1">SOS</Typography>
                                    </Box>
                                    <Typography className="pt-2">5 mins ago</Typography>
                                </Box>
                            </Box>
                            <Box className="w-full p-3 flex justify-between items-center bg-orange-100 border border-orange-400 rounded-md mt-5">
                                <Box className="flex">
                                    <Box className="bg-yellow-500 rounded-lg py-3 px-2">
                                        <WarningAmberOutlinedIcon className="text-white" />
                                    </Box>
                                    <Box className="ml-3">
                                        <Typography fontWeight={800} variant="body1">John Smith</Typography>
                                        <Typography variant="body1">City Center</Typography>
                                    </Box>
                                </Box>
                                <Box className="flex flex-col justify-center items-center">
                                    <Box className="rounded-full text-white bg-yellow-500 px-3 py-1">
                                        <Typography variant="body1">Alert</Typography>
                                    </Box>
                                    <Typography className="pt-2">2 mins ago</Typography>
                                </Box>
                            </Box>
                            <Box className="w-full p-3 flex justify-between items-center bg-orange-100 border border-orange-400 rounded-md mt-5">
                                <Box className="flex">
                                    <Box className="bg-yellow-500 rounded-lg py-3 px-2">
                                        <WarningAmberOutlinedIcon className="text-white" />
                                    </Box>
                                    <Box className="ml-3">
                                        <Typography fontWeight={800} variant="body1">John Smith</Typography>
                                        <Typography variant="body1">City Center</Typography>
                                    </Box>
                                </Box>
                                <Box className="flex flex-col justify-center items-center">
                                    <Box className="rounded-full text-white bg-yellow-500 px-3 py-1">
                                        <Typography variant="body1">Alert</Typography>
                                    </Box>
                                    <Typography className="pt-2">2 mins ago</Typography>
                                </Box>
                            </Box>
                            <Box className="w-full p-3 flex justify-between items-center bg-orange-100 border border-orange-400 rounded-md mt-5">
                                <Box className="flex">
                                    <Box className="bg-yellow-500 rounded-lg py-3 px-2">
                                        <WarningAmberOutlinedIcon className="text-white" />
                                    </Box>
                                    <Box className="ml-3">
                                        <Typography fontWeight={800} variant="body1">John Smith</Typography>
                                        <Typography variant="body1">City Center</Typography>
                                    </Box>
                                </Box>
                                <Box className="flex flex-col justify-center items-center">
                                    <Box className="rounded-full text-white bg-yellow-500 px-3 py-1">
                                        <Typography variant="body1">Alert</Typography>
                                    </Box>
                                    <Typography className="pt-2">2 mins ago</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;