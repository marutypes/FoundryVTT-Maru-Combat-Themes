export function updateSelectOptions($select, newOptions) {
  // Get the current selected option's value (assuming it's the playlist ID)
  const currentValue = $select.val();

  // Create a new set of options from the new options array
  const $newOptions = newOptions.map(option => {
      return $("<option>", { value: option.id, text: option.name });
  });

  // Empty the current select options
  $select.empty();

  // Append the new set of options
  $select.append($newOptions);

  // Set the selected value to the previous value, if it exists in the new options
  if (newOptions.some(option => option.id === currentValue)) {
      $select.val(currentValue);
  } else {
      // Handle the case where the previously selected playlist is no longer available
      $select.val("");
  }
}
