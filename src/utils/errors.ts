interface createErrorMessageInterface {
  toastMessage?: string,
  formErrors?: any,
  isFormError?: boolean,
}

export const createErrorMessage = ({ isFormError = false, ...rest }: createErrorMessageInterface) => {
  return { isFormError, ...rest }
}
