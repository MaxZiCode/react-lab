const defaultValues = {
  notImplementedValidationFn: () => (): boolean => {
    throw new Error("Function not implemented.");
  },
};

export default defaultValues;
