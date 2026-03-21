import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useEditSettings from "./useEditSettings";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  const { updateSetting, isUpdating } = useEditSettings();

  return (
    <>
      {(isLoading || isUpdating) && <Spinner />}
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            onBlur={(e) => updateSetting({ minBookingLength: e.target.value })}
          />
        </FormRow>

        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            onBlur={(e) => updateSetting({ maxBookingLength: e.target.value })}
          />
        </FormRow>

        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            defaultValue={maxGuestsPerBooking}
            onBlur={(e) =>
              updateSetting({ maxGuestsPerBooking: e.target.value })
            }
          />
        </FormRow>

        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={breakfastPrice}
            onBlur={(e) => updateSetting({ breakfastPrice: e.target.value })}
          />
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
