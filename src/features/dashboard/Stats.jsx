import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ stays, confirmedStays, bookings, numDays, cabinsCount }) {
  const numberBookings = bookings?.length;
  const sales = bookings?.reduce(
    (total, booking) => total + booking.totalPrice,
    0,
  );
  const checkIns = stays?.length;
  const occupation =
    cabinsCount && numDays
      ? confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
        (cabinsCount * numDays)
      : 0;

  return (
    <>
      <Stat
        title="Bookings"
        value={numberBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineCurrencyDollar />}
      />
      <Stat
        title="Check ins"
        value={checkIns}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
