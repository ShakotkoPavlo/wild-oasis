import styled from "styled-components";
import { Flag } from "../../ui/Flag";
import Button from "./../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Tag = styled.div`
  background-color: ${(props) =>
    props.type === "green"
      ? "var(--color-green-100)"
      : "var(--color-blue-100)"};
  color: ${(props) =>
    props.type === "green"
      ? "var(--color-green-700)"
      : "var(--color-blue-700)"};
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.2rem 0.8rem;
  border-radius: var(--border-radius-sm);
  text-align: center;
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} />

      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button size="small" variant="primary" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}

      {status === "checked-in" && (
        <CheckoutButton bookingId={id}>Check out</CheckoutButton>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
