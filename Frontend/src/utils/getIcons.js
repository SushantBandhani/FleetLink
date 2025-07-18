import { GiCargoTruck, GiTractor } from "react-icons/gi";
import { FaTruckPickup, FaBusAlt } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

export const getVehicleIcon = (name) => {
  if (/tractor/i.test(name)) return <GiTractor />;
  if (/pickup/i.test(name)) return <FaTruckPickup />;
  if (/cargo/i.test(name)) return <GiCargoTruck />;
  if (/bus/i.test(name)) return <FaBusAlt />;
  return <TbTruckDelivery />;
};
