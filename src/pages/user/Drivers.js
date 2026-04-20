import { Avatar, Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import { FormattedMessage, useIntl } from "react-intl";
import { usePopups } from "../../hooks/UsePopups";
import { useSearch } from "../../hooks/UseSearch";
import { useTableStyles } from "../../hooks/UseTableStyles";
import { usePagination } from "../../hooks/UsePagination";
import SnackbarAlert from "../../components/SnackBar";
import useSnackBar from "../../hooks/UseSnackBar";
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Fetch from "../../services/Fetch";
import DeleteDialog from "../../popup/DeleteDialog";
import AddDriver from "../../popup/user/AddDriver";
import UpdateDriver from "../../popup/user/UpdateDriver";
import DriverImage from "../../popup/user/DriverImage";

function Drivers() {
    const { language, host } = useConstants();
    // const { wait } = useContext(AuthContext);
    const theme = useTheme();
    const { getWait, setGetWait } = useWaits();
    const { setPopup } = usePopups();
    const { search, setSearch } = useSearch();
    const intl = useIntl();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const { page, setPage, currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();
    const [driversCounts, setDriversCounts] = useState();
    const [drivers, setDrivers] = useState([]);
    const [driver, setDriver] = useState('');

    {/* Get Drivers Function */ }
    const getDrivers = async () => {
        let result = await Fetch(host + `/api/drivers/index?page=${page + 1}`, 'GET', null);
        if (result.status === 200) {
            setTotalPages(result.data.data.last_page);
            setDriversCounts(result.data.data.total);
            setDrivers(result.data.data.data);
            setCurrentPage(page);
        }

        setGetWait(false);
    }

    {/*  Get Specefic Driver Details */ }
    const driverDetails = async (id) => {
        // setClient(clients.filter((client) => client.id === id)[0]);
    }

    {/* Delete Driver Function */ }
    const deleteDriver = async () => {
        let result = await Fetch(host + `/api/drivers/destroy/${driver.id}`, 'DELETE', null);

        if (result.status === 200) {
            setDrivers((prevDrivers) => prevDrivers.filter((prevDriver) => prevDriver.id !== driver.id));
            setDriversCounts(driversCounts - 1);
            setSnackBar('success', <FormattedMessage id="deleted_success" />);
            setDriver('');
        }
    }

    useEffect(() => {
        getDrivers();
    }, [page, search]);

    return (
        <>
            {/* {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center" sx={{ float: language === 'en' && 'right' }}>
                        <CircularProgress className="!text-yellow-500" size={70} />
                    </Box>
                    : */}
            <Box sx={{ backgroundColor: theme.palette.background.default }}>
                <Box className="w-4/5 rounded-xl relative" dir={language === 'en' ? 'ltr' : "rtl"} sx={{ float: language === 'en' && 'right' }}>
                    {
                        getWait ?
                            <Box className="w-full h-screen relative flex justify-center items-center">
                                <CircularProgress className="!text-yellow-500" size={70} />
                            </Box>
                            :
                            <Box sx={{ backgroundColor: theme.palette.background.paper }} className="bg-white rounded-xl px-2">
                                {/* Top Section */}
                                <Box sx={{ backgroundColor: theme.palette.background.default }} className="flex justify-between items-center px-2">
                                    <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='drivers' /></Typography>
                                    <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="!bg-yellow-500">
                                        <AddIcon />
                                        <FormattedMessage id='add_driver' />
                                    </Button>
                                </Box>

                                <Box>
                                    <TableContainer className="" component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                        {/* Top Table */}
                                        <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                            <Box className="w-full flex items-center">
                                                {/* <FilterAltOutlinedIcon onClick={() => setPopup('filter', 'flex')} className="cursor-pointer" fontSize="large" /> */}
                                                <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                    <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-11/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intl.formatMessage({ id: "search_driver" })} />
                                                    <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{ right: language === 'en' && '90%' }} />
                                                </Box>
                                            </Box>
                                            <Box className="flex w-2/4 items-center justify-end max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_drivers' />: {driversCounts}</Typography>
                                            </Box>
                                        </Box>

                                        {/* Clients Table */}
                                        <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead className="bg-gray-200">
                                                <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                    <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='image' /></StyledTableCell>
                                                    <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='full_name' /></StyledTableCell>
                                                    <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='phone' /></StyledTableCell>
                                                    <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='car_category' /></StyledTableCell>
                                                    <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='car_number' /></StyledTableCell>
                                                    <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='car_type' /></StyledTableCell>
                                                    <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center"><FormattedMessage id='procedures' /></StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {drivers.map((driver, index) => (
                                                    <StyledTableRow key={index} className="hover:bg-gray-200 duration-100 cursor-pointer">
                                                        <StyledTableCell align={language === 'en' ? "left" : "right"} component="th" scope="row">
                                                            {
                                                                driver.image ?
                                                                    <Avatar className="w-10 h-10" src={`${host}/storage/${driver.image}`} />
                                                                    :
                                                                    <Box className='w-10 h-10 rounded-full bg-gray-400 text-white text-3xl flex justify-center items-center'>
                                                                        {driver.user.firstName.charAt(0)}
                                                                    </Box>
                                                            }
                                                        </StyledTableCell>
                                                        <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{driver.user.firstName + ' ' + driver.user.lastName}</StyledTableCell>
                                                        <StyledTableCell align={language === 'en' ? "left" : "right"}>{driver.user.number}</StyledTableCell>
                                                        <StyledTableCell align={language === 'en' ? "left" : "right"} className="text-center">{driver.trans_type.name}</StyledTableCell>
                                                        <StyledTableCell align={language === 'en' ? "left" : "right"} className="text-center">{driver.carNumber}</StyledTableCell>
                                                        <StyledTableCell align={language === 'en' ? "left" : "right"} className="text-center">{driver.type}</StyledTableCell>
                                                        <StyledTableCell align="right">
                                                            <Box className="!flex justify-around items-center">
                                                                <Button variant="contained" className="!bg-red-300 !font-bold !text-red-800 hover:!bg-red-500 hover:!text-white duration-300" onClick={(e) => { setDriver(driver); setPopup('delete', 'flex') }}><FormattedMessage id='delete' /></Button>
                                                                <Button variant="contained" className="!bg-green-300 !font-bold !text-green-800 hover:!bg-green-500 hover:!text-white duration-300" onClick={(e) => { setDriver(driver); setPopup('update', 'flex') }}><FormattedMessage id='update' /></Button>
                                                                <Button variant="contained" className="!bg-orange-300 !font-bold !text-orange-800 hover:!bg-orange-500 hover:!text-white duration-300" onClick={(e) => { setDriver(driver); setPopup('image', 'flex') }}><FormattedMessage id='id_image' /></Button>
                                                            </Box>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>

                                        {/* Pagination Buttons */}
                                        <Box className="flex justify-center items-center" dir="rtl">
                                            <Button disabled={page + 1 === totalPages} className="cursor-pointer" onClick={() => setPage(currentPage + 1)}>
                                                <NavigateNextIcon fontSize="large" />
                                            </Button>
                                            <Typography variant="body1" className="!text-xl" dir='ltr'>{currentPage + 1} / {totalPages}</Typography>
                                            <Button disabled={page + 1 === 1} className="cursor-pointer" onClick={() => setPage(currentPage - 1)}>
                                                <NavigateBeforeIcon fontSize="large" />
                                            </Button>
                                        </Box>
                                    </TableContainer>
                                </Box>
                            </Box>
                    }
                </Box>

                {/* Add New Driver Popup */}
                <Box id="add" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                    <AddDriver getDrivers={getDrivers} onClickCancel={() => setPopup('add', 'none')} setSnackBar={setSnackBar} setDrivers={setDrivers} />
                </Box>

                {/* Update Driver Popup */}
                <Box id="update" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                    <UpdateDriver driver={driver} onClickCancel={() => setPopup('update', 'none')} getDrivers={getDrivers} setSnackBar={setSnackBar} />
                </Box>

                {/* Delete Drivrt Popup */}
                <Box id="delete" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                    <DeleteDialog onClickConfirm={deleteDriver} onClickCancel={() => setPopup('delete', 'none')} title={<FormattedMessage id="delete_driver_title" />} subtitle={<FormattedMessage id="delete_driver_description" />} />
                </Box>

                {/* ID Image Drivrt Popup */}
                <Box id="image" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                    <DriverImage onClickCancel={() => setPopup('image', 'none')} driver={driver} />
                </Box>

                {/* Snackbar Alert */}
                <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
            </Box>
            {/* } */}
        </>
    );
}

export default Drivers;