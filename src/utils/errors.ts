interface createErrorMessageInterface {
  toastMessage?: string,
}

export const createErrorMessage = ({ toastMessage }: createErrorMessageInterface) => {
  return {
    toastMessage,
  }
}
