import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useUpdateCabin(editedCabinId) {
  const queryClient = useQueryClient();

  const { isEditLoading, mutate: editCabin } = useMutation({
    mutationFn: (updatedCabin) => updateCabin(editedCabinId, updatedCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin updated successfully");
    },
    onError: (error) => toast.error("Error updating cabin: " + error.message),
  });

  return { isEditLoading, editCabin };
}
