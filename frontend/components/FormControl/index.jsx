import {
  FormControl as Control,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

const FormControl = props => {
  const { children, label, labelfor, helpertext, errormessage } = props

  return (
    <Control {...props}>
      <FormLabel htmlFor={labelfor}>{label}</FormLabel>
      {children}
      {helpertext && <FormHelperText>{helpertext}</FormHelperText>}
      {errormessage && <FormErrorMessage>{errormessage}</FormErrorMessage>}
    </Control>
  )
}

export default FormControl
