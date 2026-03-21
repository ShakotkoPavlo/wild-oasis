import supabase from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Error fetching cabins:", error);
  }

  return data;
}

async function uploadImage(imageFile) {
  const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "-");

  const { error: imageError } = await supabase.storage
    .from("cabin")
    .upload(imageName, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (imageError) {
    throw new Error("Error uploading image: " + imageError.message);
  }

  const { data: imageData } = supabase.storage
    .from("cabin")
    .getPublicUrl(imageName);

  return imageData.publicUrl;
}

export async function createCabin(cabin) {
  let imageUrl = cabin.image;

  if (cabin.image instanceof File) {
    imageUrl = await uploadImage(cabin.image);
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert({
      ...cabin,
      image: imageUrl,
    })
    .select()
    .single();

  if (error) {
    throw new Error("Error creating cabin: " + error.message);
  }

  return data;
}

export async function deleteCabin(id) {
  // First fetch the cabin to get the image URL
  const { data: cabin, error: fetchError } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error("Error fetching cabin: " + fetchError.message);
  }

  // Delete the cabin from database
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Error deleting cabin: " + error.message);
  }

  // Delete the image from storage if it exists
  if (cabin.image) {
    const imagePath = cabin.image.split("/").pop();
    await supabase.storage.from("cabin").remove([imagePath]);
  }

  return true;
}

export async function duplicateCabin(id) {
  const { data: cabin, error: fetchError } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error("Error fetching cabin: " + fetchError.message);
  }

  // Remove id and create a copy with the same image URL
  const { id: _, ...cabinData } = cabin;

  return createCabin({ ...cabinData, name: `Copy of ${cabin.name}` });
}

export async function updateCabin(id, updatedCabin) {
  const { data: existingCabin, error: fetchError } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error("Error fetching cabin: " + fetchError.message);
  }

  let imageUrl = existingCabin.image;

  // Only handle image if a new one is provided
  if (updatedCabin.image && updatedCabin.image instanceof File) {
    imageUrl = await uploadImage(updatedCabin.image);

    // Delete old image if it exists
    if (existingCabin.image) {
      const oldImagePath = existingCabin.image.split("/").pop();
      await supabase.storage.from("cabin").remove([oldImagePath]);
    }
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...updatedCabin, image: imageUrl })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Error updating cabin: " + error.message);
  }

  return data;
}
