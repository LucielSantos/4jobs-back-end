export const requiredMessage: string = 'Campo obrigatório'

export const invalidPassword: string = 'Senha não cumpre com os requisitos'

export const matchPasswordError: string = 'Senhas não são iguais'

export const mountMaxChar = (maxChars: number): string =>
  `Deve conter no máximo ${maxChars} caractéres`

export const mountMinChar = (minChars: number): string =>
  `Deve conter no mínimo ${minChars} caractéres`
