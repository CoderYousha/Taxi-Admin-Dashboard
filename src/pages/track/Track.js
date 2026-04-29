import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useConstants } from "../../hooks/UseConstants";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { FormattedMessage } from "react-intl";
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';

function Track() {
    const { language } = useConstants();
    const { wait } = useContext(AuthContext);
    const theme = useTheme();
    const [target, setTarget] = useState('');

    const markerIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    const redIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    function FlyToLocation({ coords }) {
        const map = useMap();
        if (coords) map.flyTo(coords, 13, { duration: 1.2 });
        return null;
    }

    return (
        <>
            {
                wait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress className="!text-yellow-500" size={70} />
                    </Box>
                    :
                    <Box sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box className="w-4/5 rounded-xl relative overflow-y-scroll none-view-scroll" dir={language === 'en' ? 'ltr' : "rtl"} sx={{ float: language === 'en' && 'right' }}>
                            <Box className="w-[650px] h-[650px] float-left">
                                <MapContainer center={[33.5138, 36.2765]} zoom={13}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                                    <Marker position={[33.5138, 36.2765]} icon={markerIcon}>
                                        <Popup>Damascus</Popup>
                                    </Marker>
                                    <Marker position={[34.7308, 36.7130]} icon={redIcon}>
                                        <Popup>Homs</Popup>
                                    </Marker>
                                    <Marker position={[36.2021, 37.1343]} icon={markerIcon}>
                                        <Popup>Aleppo</Popup>
                                    </Marker>

                                    <FlyToLocation coords={target} />
                                </MapContainer>
                            </Box>
                            <Box className="w-2/5 float-right bg-white shadow-lg rounded-md p-2">
                                <Typography fontWeight={800} variant="h6"><FormattedMessage id="active_drivers" /></Typography>
                                <Box className="mt-5 bg-gray-100 rounded-lg p-3 relative cursor-pointer" onClick={() => setTarget([33.5138, 36.2765])}>
                                    <Box className="flex items-center">
                                        <Box className="w-2 h-2 rounded-full bg-green-500"></Box>
                                        <Box className="ml-3">
                                            <Typography fontWeight={800} variant="body1">John Smith</Typography>
                                            <Typography variant="body2">Downtown Area</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="mt-5 bg-red-100 rounded-lg p-3 relative cursor-pointer" onClick={() => setTarget([34.7308, 36.7130])}>
                                    <ReportGmailerrorredRoundedIcon color="error" className="absolute top-2 right-2" />
                                    <Box className="flex items-center">
                                        <Box className="w-2 h-2 rounded-full bg-red-500"></Box>
                                        <Box className="ml-3">
                                            <Typography fontWeight={800} variant="body1">Sarah Johnson</Typography>
                                            <Typography variant="body2">Airport Road</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="mt-5 bg-gray-100 rounded-lg p-3 relative cursor-pointer" onClick={() => setTarget([36.2021, 37.1343])}>
                                    <Box className="flex items-center">
                                        <Box className="w-2 h-2 rounded-full bg-green-500"></Box>
                                        <Box className="ml-3">
                                            <Typography fontWeight={800} variant="body1">Mike Brown</Typography>
                                            <Typography variant="body2">City Center</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            }
        </>
    );
}

export default Track;