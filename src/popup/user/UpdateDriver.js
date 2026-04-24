import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import PhoneInput from "react-phone-input-2";
import { useWaits } from "../../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AuthContext from "../../context/AuthContext";
import Fetch from "../../services/Fetch";
import { useAddDriver } from "../../hooks/UseAddDriver";
import { buildDriverFormData } from "../../helper/DriverFormData";
import FetchContent from "../../services/FetchContent";
import { useEffect, useState } from "react";

function UpdateDriver({ onClickCancel, setSnackBar, driver, getDrivers }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { firstName, carNumber, carType, category, idImage, image, insurance, lastName, mechanics, password, phone, price, setCarNumber,
        setCarType, setCategory, setFirstName, setIdImage, setImage, setInsurance, setLastName, setMechanics, setPassword, setPhone,
        setPrice, setType, type, carTypeId, setCarTypeId,
    } = useAddDriver();
    const [carCategories, setCarCategories] = useState([]);

    const handlePhone = (value, country, e, formattedValue) => {
        setPhone(value);
    };

    const getCarCategories = async () => {
        let result = await Fetch(host + `/api/car-types/index`, 'GET', null);
        if (result.status === 200) {
            setCarCategories(result.data.carTypes);
        }
    }

    const updateUser = async () => {
        setSendWait(true);

        const formData = buildDriverFormData({
            carNumber: carNumber,
            carType: carType,
            category: category,
            firstName: firstName,
            idImage: idImage,
            image: image,
            insurance: insurance,
            lastName: lastName,
            mechanics: mechanics,
            password: password,
            phone: phone,
            price: price,
            // type: type,
            carTypeId: carTypeId,
        });


        let result = await Fetch(host + `/api/drivers/update/${driver.id}`, 'POST',
            formData
            //  JSON.stringify({
            // carNumber: carNumber,
            // typeCar: carType,
            // category: category,
            // firstName: firstName,
            // IDImage: idImage,
            // image: image,
            // insurance: insurance,
            // lastName: lastName,
            // mechanics: mechanics,
            // password: password,
            // number: phone,
            // price: price,
            // type: type,
            // CarTypeId: carTypeId,
            // })
        );

        if (result.status === 200) {
            setSnackBar('success', <FormattedMessage id="updated_success" />);
            getDrivers();
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', <FormattedMessage id="fields_empty" />);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setFirstName(driver.user.firstName);
        setLastName(driver.user.lastName);
        setPassword('');
        setPhone(driver.user.number);
        setImage('');
        setCarNumber(driver.carNumber);
        setCarType(driver.type);
        setMechanics(driver.mechanics);
        setInsurance(driver.insurance);
        setCategory(driver.trans_type.name);
        setPrice(driver.trans_type.price);
        setType(driver.trans_type.type);
        setCarTypeId(driver.trans_type.id);
    }

    useEffect(() => {
        getCarCategories();
    }, []);

    useEffect(() => {
        if (driver)
            resetValue();
    }, [driver])

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-screen rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll max-sm:h-screen" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='update_driver' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="first_name" />} className="w-2/5 max-sm:w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <TextField variant="outlined" label={<FormattedMessage id="last_name" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Box>
                <Box className='flex justify-between mt-3 max-sm:flex-col'>
                    <TextField type="number" variant="outlined" label={<FormattedMessage id="phone" />} className="w-2/5 max-sm:w-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    {/* <Box dir="ltr" className="w-2/5 h-14 mt-5 max-sm:h-12 max-sm:w-full"> */}
                    {/* <Typography variant="body2" className="!mb-2"><FormattedMessage id="phone" /></Typography>
                        <PhoneInput value={phone} onChange={handlePhone} country={'us'} containerStyle={{ width: "100%" }} inputStyle={{
                            width: '100%',
                            height: "100%"
                        }} /> */}
                    {/* </Box> */}
                    <TextField type="password" variant="outlined" label={<FormattedMessage id="password" />} className="w-2/5 max-sm:w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                {/* <Box className='flex justify-between mt-5 max-sm:flex-col'>
                    <TextField variant="outlined" label='Category' className="w-2/5 max-sm:w-full" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <select value={type} className="w-2/5 border-2 rounded-md py-3 outline-none max-sm:w-full" onChange={(e) => setType(e.target.value)}>
                        <option selected value="" disabled><FormattedMessage id="type" /></option>
                        <option selected value="KM"><FormattedMessage id="km" /></option>
                        <option value="Time"><FormattedMessage id="time" /></option>
                    </select>
                </Box>
                <Box className='flex justify-between mt-5 max-sm:flex-col'>
                    <TextField type="number" variant="outlined" label='Price' className="w-2/5 max-sm:w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <TextField variant="outlined" label='Car Number' className="w-2/5 max-sm:w-full max-sm:!mt-3" value={carNumber} onChange={(e) => setCarNumber(e.target.value)} />
                </Box> */}
                <Box className='flex justify-between mt-5 max-sm:flex-col'>
                    <TextField variant="outlined" label='Insurance' className="w-2/5 max-sm:w-full" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
                    <TextField variant="outlined" label='Mechanics' className="w-2/5 max-sm:w-full max-sm:!mt-3" value={mechanics} onChange={(e) => setMechanics(e.target.value)} />
                </Box>
                <Box className='flex justify-between mt-5 max-sm:flex-col'>
                    <TextField variant="outlined" label='Car Type' className="w-2/5 max-sm:w-full" value={carType} onChange={(e) => setCarType(e.target.value)} />
                    <select value={carTypeId} className="w-2/5 border-2 rounded-md py-3 outline-none max-sm:w-full" onChange={(e) => setCarTypeId(e.target.value)}>
                        <option selected value="" disabled>Car Category</option>
                        {
                            carCategories.map((carCategory, index) =>
                                <option selected value={carCategory.id}>{carCategory.name}</option>
                            )
                        }
                    </select>
                </Box>
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="image" /></Typography>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="id_image" /></Typography>
                    <input type="file" accept="image/*" onChange={(e) => setIdImage(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={updateUser} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                        {
                            sendWait ?
                                <CircularProgress size={20} className="" color="white" />
                                :
                                <FormattedMessage id="update" />
                        }
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default UpdateDriver;