import { Box, Button, CircularProgress, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import { FormattedMessage, useIntl } from "react-intl";
import { usePopups } from "../../hooks/UsePopups";
import { useSearch } from "../../hooks/UseSearch";
import { useTableStyles } from "../../hooks/UseTableStyles";
import SnackbarAlert from "../../components/SnackBar";
import useSnackBar from "../../hooks/UseSnackBar";
import AddIcon from '@mui/icons-material/Add';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Fetch from "../../services/Fetch";
import AddCarCategory from "../../popup/car_category/AddCarCategory";
import UpdateCarCategory from "../../popup/car_category/UpdateCarCategory";
import DeleteDialog from "../../popup/DeleteDialog";
import { useNavigate } from "react-router-dom";

function CarCategories() {
    const { language, host } = useConstants();
    const { wait } = useContext(AuthContext);
    const theme = useTheme();
    const { getWait, setGetWait } = useWaits();
    const { setPopup } = usePopups();
    const { search, setSearch, searchType, setSearchType } = useSearch();
    const intl = useIntl();
    const { StyledTableCell, StyledTableRow } = useTableStyles();
    const { openSnackBar, type, message, setSnackBar, setOpenSnackBar } = useSnackBar();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const navigate = useNavigate();

    {/* Check Login Function */ }
    const checkLogin = async () => {
        if (localStorage.getItem('token')) {
            navigate('/login');
        }
    }

    {/* Get Categories Function */ }
    const getCategories = async () => {
        let result = await Fetch(host + `/api/car-types/index?name=${search}&${searchType && `type=${searchType}`}`, 'GET', null);
        if (result.status === 200) {
            setCategories(result.data.carTypes);
        }

        setGetWait(false);
    }

    {/* Delete Category Function */ }
    const deleteCategory = async () => {
        let result = await Fetch(host + `/api/car-types/${category.id}/force`, 'DELETE', null);

        if (result.status === 200) {
            setCategories((prevCategories) => prevCategories.filter((prevCategory) => prevCategory.id !== category.id));
            setSnackBar('success', <FormattedMessage id="deleted_success" />);
            setCategory('');
        }
    }

    useEffect(() => {
        getCategories();
    }, [search, searchType]);

    return (
        <>
            {
                wait ?
                    <Box className="4/5 h-screen relative flex justify-center items-center">
                        <CircularProgress className="!text-yellow-500" size={70} />
                    </Box>
                    :
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
                                            <Typography variant="h5" className="py-2 px-3 max-sm:!text-lg"><FormattedMessage id='car_categories' /></Typography>
                                            <Button variant="contained" onClick={() => setPopup('add', 'flex')} className="!bg-yellow-500">
                                                <AddIcon />
                                                <FormattedMessage id='add_category' />
                                            </Button>

                                        </Box>


                                        <Box>
                                            <TableContainer className="" component={Paper} dir={language === 'en' ? 'ltr' : "rtl"}>
                                                {/* Top Table */}
                                                <Box className="min-h-12 py-2 px-2 flex justify-between items-center max-sm:flex-col">
                                                    <Box className="w-full flex items-center">
                                                        {/* <FilterAltOutlinedIcon onClick={() => setPopup('filter', 'flex')} className="cursor-pointer" fontSize="large" /> */}
                                                        <Box className="w-2/4 relative mr-3 max-sm:w-full">
                                                            <input style={{ backgroundColor: theme.palette.background.default }} onChange={(e) => setSearch(e.target.value)} className="w-11/12 h-12 rounded-md border indent-14 outline-none max-sm:w-full" placeholder={intl.formatMessage({ id: "search_category" })} />
                                                            <SearchOutlinedIcon className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500" sx={{ right: language === 'en' && '90%' }} />
                                                        </Box>
                                                    </Box>
                                                    <Box className="flex w-2/4 items-center justify-end max-sm:mt-2 max-sm:w-full max-sm:justify-between">
                                                        <Typography variant="body1" className="!text-gray-500"><FormattedMessage id='total_categories' />: {categories.length}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Categories Table */}
                                                <Table className="" sx={{ minWidth: 700 }} aria-label="customized table">
                                                    <TableHead className="bg-gray-200">
                                                        <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"}><FormattedMessage id='category' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? "left" : "right"} className=""><FormattedMessage id='km_price' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className=""><FormattedMessage id='time_price' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className=""><FormattedMessage id='open_price' /></StyledTableCell>
                                                            <StyledTableCell align={language === 'en' ? 'left' : 'right'} className="!text-center"><FormattedMessage id='procedures' /></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            categories.map((category, index) =>
                                                                <StyledTableRow className="hover:bg-gray-200 duration-100 cursor-pointer">
                                                                    <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{category.name}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{category.KMPrice}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{category.timePrice}</StyledTableCell>
                                                                    <StyledTableCell align={language === 'en' ? "left" : "right"} className="">{category.openPrice}</StyledTableCell>
                                                                    <StyledTableCell align="right">
                                                                        <Box className="!flex justify-center items-center">
                                                                            <Button variant="contained" className="!bg-red-300 !font-bold !text-red-800 hover:!bg-red-500 hover:!text-white duration-300 !mr-2" onClick={(e) => { setCategory(category); setPopup('delete', 'flex') }}><FormattedMessage id='delete' /></Button>
                                                                            <Button variant="contained" className="!bg-green-300 !font-bold !text-green-800 hover:!bg-green-500 hover:!text-white duration-300" onClick={(e) => { setCategory(category); setPopup('update', 'flex') }}><FormattedMessage id='update' /></Button>
                                                                        </Box>
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            )
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </Box>
                            }
                        </Box>

                        {/* Add New Car Category Popup */}
                        <Box id="add" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <AddCarCategory setCategories={setCategories} onClickCancel={() => setPopup('add', 'none')} setSnackBar={setSnackBar} />
                        </Box>

                        {/* Update Car Category Popup */}
                        <Box id="update" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <UpdateCarCategory categ={category} onClickCancel={() => setPopup('update', 'none')} getCategories={getCategories} setSnackBar={setSnackBar} />
                        </Box>

                        {/* Delete Car Category Popup */}
                        <Box id="delete" sx={{ right: language === 'en' && '0' }} className="w-4/5 h-screen fixed top-0 bg-gray-200 bg-opacity-5 hidden justify-center items-center">
                            <DeleteDialog onClickConfirm={deleteCategory} onClickCancel={() => setPopup('delete', 'none')} title={<FormattedMessage id="delete_category_title" />} subtitle={<FormattedMessage id="delete_category_description" />} />
                        </Box>

                        {/* Snackbar Alert */}
                        <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
                    </Box>
            }
        </>
    );
}

export default CarCategories;