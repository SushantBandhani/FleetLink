import { FaCar } from 'react-icons/fa';
import { MdBookOnline } from 'react-icons/md';

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Add Vehicle",
        icon: FaCar,
        path: "/vehicle"
    },
    {
        id: "02",
        label: "Search & Book",
        icon: MdBookOnline,
        path: "/get-vehicles"

    },
]