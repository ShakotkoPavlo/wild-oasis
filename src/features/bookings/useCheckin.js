import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckinIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Guest ${data.guestName} checked in successfully`);
      queryClient.invalidateQueries({
        active: true,
        queryKey: ["booking", data.id],
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to check in guest");
    },
  });

  return { checkIn, isCheckinIn };
}
