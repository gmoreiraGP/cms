import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Button, Flex } from '@chakra-ui/react'
import { Heading, Link as ChakraLink, Text } from '@chakra-ui/layout'

import Input from '@/components/Input'
import FormControl from '@/components/FormControl'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

const Login = () => {
  const { signIn } = useContext(AuthContext)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(values) {
    await signIn(values)
  }

  return (
    <Flex justifyContent='space-around' alignItems='center' w='100vw' h='100vh'>
      <Heading>ULTIMATE CMS</Heading>
      <Flex
        justifyContent='center'
        alignItems='center'
        flexDir='column'
        minW='400px'
        p={4}
        as='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          label='Email'
          id='email'
          helpertext='O campo email precisa ser inserido'
          isInvalid={errors.email}
          errormessage={errors.email && errors.email.message}
          m={4}
        >
          <Input
            type='text'
            name='email'
            placeholder='Seu email aqui...'
            autoComplete='email'
            {...register('email', {
              required: 'O email é necessário',
            })}
          />
        </FormControl>

        <FormControl
          label='Senha'
          id='password'
          helpertext='O campo senha precisa ser inserido'
          isInvalid={errors.password}
          errormessage={errors.password && errors.password.message}
          m={4}
        >
          <Input
            type='password'
            name='password'
            placeholder='Sua senha aqui...'
            autoComplete='current-password'
            {...register('password', {
              required: 'A senha é necessário',
            })}
          />
        </FormControl>
        <Button type='submit' w='100%' isLoading={isSubmitting}>
          Entrar
        </Button>
        <Text>
          Ainda não possui uma conta?{' '}
          <ChakraLink
            color='purple.600'
            fontWeight='bold'
            href='/signup'
            as={Link}
          >
            <a>Registre-se</a>
          </ChakraLink>
        </Text>
      </Flex>
    </Flex>
  )
}

export default Login
