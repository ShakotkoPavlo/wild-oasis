import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error("Signup failed for user with email " + email);
  }

  return data?.user;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("Login failed for user with email " + email);
  }

  return data?.user;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const updates = {
    fullName,
    avatar,
  };

  let updateData;

  if (password) {
    updateData = { password };
  }

  if (fullName || avatar) {
    updateData = {
      data: updates,
    };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Date.now()}`;

  const { error: uploadAvatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadAvatarError) {
    throw new Error(uploadAvatarError.message);
  }

  // Get the public URL for the uploaded avatar
  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: publicUrlData.publicUrl,
      },
    });

  if (updateUserError) {
    throw new Error(updateUserError.message);
  }

  return updatedUser;
}
