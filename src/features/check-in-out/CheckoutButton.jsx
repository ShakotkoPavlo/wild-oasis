import Button from "../../ui/Button";
import { useCheckout } from "./../bookings/useCheckout";
import SpinnerMini from "./../../ui/SpinnerMini";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      variant="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      {isCheckingOut ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
