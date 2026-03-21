import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useEditSettings() {
  const query = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: (newSetting) => updateSettingApi(newSetting),
    onSuccess: () => {
      query.invalidateQueries(["settings"]);
      toast.success("Settings updated successfully");
    },
    onError: (error) =>
      toast.error("Error updating settings: " + error.message),
  });

  return { updateSetting, isUpdating };
}
