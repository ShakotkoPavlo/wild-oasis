import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreateLoading, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createCabinApi(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin created successfully");
    },
    onError: (error) => toast.error("Error creating cabin: " + error.message),
  });

  return { isCreateLoading, createCabin };
}
