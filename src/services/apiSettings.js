import supabase from "./supabase";

let cachedSettingsId;

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  cachedSettingsId = data?.id;

  return data;
}

export async function updateSetting(newSetting) {
  if (!cachedSettingsId) {
    const settings = await getSettings();
    cachedSettingsId = settings?.id;
  }

  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", cachedSettingsId)
    .select()
    .single();

  if (error) {
    console.error(error);

    throw new Error("Settings could not be updated");
  }

  return data;
}
