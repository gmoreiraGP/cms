import React, { forwardRef } from 'react'
import {
  Box,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  label?: string
  name: string
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest },
  ref
) => {
  return <ChakraInput name={name} ref={ref} height='50px' {...rest} />
}

export default forwardRef(Input)
