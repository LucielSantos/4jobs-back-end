interface createErrorMessageInterface {
  toastMessage?: string,
  formErrors?: any,
}

export const createErrorMessage = (error: createErrorMessageInterface) => {
  return error
}
