export function updateSelectOptions($select, newOptions) {
    // Get the current selected option
    const currentText = $select.find("option:selected").text();
  
    // Create a new set of options from the new options array
    const $newOptions = newOptions.map((option, index) => {
      return $("<option>", { value: index, text: option });
    });
  
    // Empty the current select options
    $select.empty();
  
    // Append the new set of options
    $select.append($newOptions);
  
    // Select the previously selected option, if it exists in the new options
    const optionWithCurrentText = $select.find("option").filter(function () {
      return $(this).html() == currentText;
    });
    $select.val(optionWithCurrentText.val());
  }