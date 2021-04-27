interface createErrorMessageInterface {
  toastMessage?: string,
  formErrors?: any,
  isFormError: boolean,
}

export const createErrorMessage = (error: createErrorMessageInterface) => {
  return error
}
