import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Guest ${data.guestName} checked out successfully`);
      queryClient.invalidateQueries({
        active: true,
        queryKey: ["booking", data.id],
      });
    },
    onError: () => {
      toast.error("Failed to check out guest");
    },
  });

  return { checkout, isCheckingOut };
}
