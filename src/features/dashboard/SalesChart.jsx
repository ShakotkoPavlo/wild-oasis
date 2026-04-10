import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "./../../ui/Heading";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, sub } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDays = eachDayOfInterval({
    start: sub(new Date(), { days: numDays - 1 }),
    end: new Date(),
  });

  const salesData = allDays.map((day) => {
    const dayBookings = bookings.filter((booking) =>
      isSameDay(new Date(booking.created_at), day),
    );

    return {
      label: format(day, "MMM dd"),
      totalSales: dayBookings.reduce(
        (sum, booking) => sum + booking.totalPrice,
        0,
      ),
      extrasSales: dayBookings.reduce(
        (sum, booking) => sum + booking.extrasPrice,
        0,
      ),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDays[0], "MMM dd")} to{" "}
        {format(allDays[allDays.length - 1], "MMM dd")}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={salesData}>
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              border: "none",
            }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
          />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis stroke={colors.text} unit="$" />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
