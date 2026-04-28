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
import FetchContent from "../../services/FetchContent";
import { useEffect, useState } from "react";
import { useAddEmployee } from "../../hooks/UseAddEmployee";
import { buildEmployeeFormData } from "../../helper/EmployeeFormData";

function UpdateEmployee({ onClickCancel, setSnackBar, getEmployees, employee }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { firstName, lastName, password, phone, image, status, role, setFirstName, setLastName, setPhone, setImage,
        setStatus, setRole, setPassword } = useAddEmployee();

    const updateUser = async () => {
        setSendWait(true);

        const formData = buildEmployeeFormData({
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            image: image,
            status: status,
            role: role,
        });


        let result = await Fetch(host + `/api/employees/update/${employee.id}`, 'POST', formData);

        if (result.status === 200) {
            setSnackBar('success', <FormattedMessage id="updated_success" />);
            getEmployees();
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', <FormattedMessage id="fields_empty" />);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setFirstName(employee.first_name);
        setLastName(employee.last_name);
        setPassword('');
        setPhone(employee.phone);
        setImage('');
        setStatus(employee.status);
        setRole(employee.role);
    }

    useEffect(() => {
        if (employee)
            resetValue();
    }, [employee])

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll max-sm:h-screen" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='update_employee' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className='flex justify-between max-sm:flex-col'>
                    <TextField variant="outlined" label={<FormattedMessage id="first_name" />} className="w-2/5 max-sm:w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <TextField variant="outlined" label={<FormattedMessage id="last_name" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Box>
                <Box className='flex justify-between mt-3 max-sm:flex-col'>
                    <TextField type="number" variant="outlined" label={<FormattedMessage id="phone" />} className="w-2/5 max-sm:w-full max-sm:!mt-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <TextField type="password" variant="outlined" label={<FormattedMessage id="password" />} className="w-2/5 max-sm:w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box className='flex justify-between mt-5 max-sm:flex-col'>
                    <select value={role} className="w-full border-2 rounded-md py-3 outline-none max-sm:w-full" onChange={(e) => setRole(e.target.value)}>
                        <option selected value="" disabled><FormattedMessage id="role" /></option>
                        <option selected value="">Support</option>
                        <option selected value="">Manager</option>
                    </select>
                </Box>
                <FormControlLabel
                    control={<Checkbox checked={status} onChange={(e) => setStatus(e.target.checked)} />}
                    label={<FormattedMessage id="status" />}
                />
                <Box className="relative w-full h-32 bg-gray-200 rounded-xl mt-10 flex flex-col items-center justify-center cursor-pointer">
                    <CloudUploadOutlinedIcon fontSize="large" className="" />
                    <Typography variant="body1" className="text-gray-700"><FormattedMessage id="image" /></Typography>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full h-full opacity-0 absolute cursor-pointer" />
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

export default UpdateEmployee;