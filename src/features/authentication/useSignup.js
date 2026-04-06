import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onError: (error) => {
      toast.error("Signup failed: " + error.message);
      throw new Error("Signup failed: " + error.message);
    },
    onSuccess: (user) => {
      toast.success(
        "Signup successful for user with email " +
          user.email +
          ". Please check your email to confirm your account.",
      );
    },
  });

  return { signup, isLoading };
}
