const convertToTitleCase = (string) =>
  string
    .toLowerCase()
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");

const convertToDropdownOptions = (arr) => {
  return arr.map((el) => {
    return {
      label: convertToTitleCase(el),
      value: el,
    };
  });
};

const convertCostStructureDropdownOptions = (arr) => {
  return arr.map((el) => {
    return {
      label: convertToTitleCase(el.label),
      value: el.value,
    };
  });
};

module.exports = {
  convertToDropdownOptions,
  convertCostStructureDropdownOptions,
};
