import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editedCabinId, ...editedCabinData } = cabinToEdit || {};
  const isEditSession = Boolean(editedCabinId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editedCabinData : {},
  });

  const { errors } = formState;

  const { isCreateLoading, createCabin } = useCreateCabin();
  const { isEditLoading, editCabin } = useUpdateCabin(editedCabinId);

  function onSubmit(data) {
    const dataCabin = { ...data, image: data.image[0] };

    if (isEditSession) {
      editCabin(dataCabin);
    } else {
      createCabin(dataCabin);
    }
    reset();
    onCloseModal?.();
  }

  function onError(errors) {
    toast.error(
      Object.values(errors)
        .map((error) => error.message)
        .join(", "),
    );
  }

  function validateDiscount(value) {
    const regularPrice = parseFloat(getValues("regularPrice"));
    const discount = parseFloat(value);

    if (isNaN(discount) || discount < 0) {
      return "Discount must be a positive number";
    }

    if (discount > regularPrice) {
      return "Discount cannot exceed regular price";
    }

    return true;
  }

  return (
    <>
      {(isCreateLoading || isEditLoading) && <Spinner />}
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow label="Cabin name" error={errors.name?.message}>
          <Input
            type="text"
            id="name"
            {...register("name", { required: "Cabin name is required" })}
          />
        </FormRow>

        <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", {
              required: "Maximum capacity is required",
              min: { value: 1, message: "Capacity must be at least 1" },
              max: { value: 10, message: "Capacity cannot exceed 10" },
            })}
          />
        </FormRow>

        <FormRow label="Regular price" error={errors.regularPrice?.message}>
          <Input
            type="number"
            id="regularPrice"
            {...register("regularPrice", {
              required: "Regular price is required",
              min: { value: 0, message: "Price must be at least 0" },
            })}
          />
        </FormRow>

        <FormRow label="Discount" error={errors.discount?.message}>
          <Input
            type="number"
            id="discount"
            defaultValue={0}
            {...register("discount", {
              validate: (value) => validateDiscount(value),
            })}
          />
        </FormRow>

        <FormRow
          label="Description for website"
          error={errors.description?.message}
        >
          <Textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </FormRow>
        <FormRow label="Cabin photo" error={errors.image?.message}>
          <FileInput
            id="image"
            accept="image/*"
            type="file"
            {...register("image", {
              required: isEditSession ? false : "Cabin photo is required",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isCreateLoading || isEditLoading}>
            {isEditSession ? "Update cabin" : "Add cabin"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
