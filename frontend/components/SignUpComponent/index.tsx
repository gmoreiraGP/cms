import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'

import { ButtonGroup, IconButton, Icon, Button, Flex } from '@chakra-ui/react'
import { Heading, Link as ChakraLink, Stack, Text } from '@chakra-ui/layout'
import Input from '@/components/Input'
import FormControl from '@/components/FormControl'
import { ArrowLeftIcon, ArrowRightIcon } from '@/lib/icons'

const SignUpComponent = () => {
  const [formStep, setFormStep] = useState(0)
  const toast = useToast()

  const nextFormStep = () => {
    setFormStep(old => old + 1)
  }
  const prevFormStep = () => {
    setFormStep(old => old - 1)
  }

  const handleButton = formStep => {
    switch (formStep) {
      case 0:
        return (
          <ButtonGroup size='sm' isAttached variant='outline'>
            <IconButton
              aria-label='Próximo passo'
              icon={<ArrowLeftIcon />}
              disabled={true}
            />
            <Button w='100%' disabled={true} e>
              {formStep + 1} / 3
            </Button>
            <IconButton
              aria-label='Passo anterior'
              icon={<ArrowRightIcon />}
              onClick={() => nextFormStep()}
            />
          </ButtonGroup>
        )

      case 1:
        return (
          <ButtonGroup size='sm' isAttached variant='outline'>
            <IconButton
              aria-label='Próximo passo'
              icon={<ArrowLeftIcon />}
              onClick={() => prevFormStep()}
            />
            <Button w='100%' disabled={true}>
              {formStep + 1} / 3
            </Button>
            <IconButton
              aria-label='Passo anterior'
              icon={<ArrowRightIcon />}
              onClick={() => nextFormStep()}
            />
          </ButtonGroup>
        )

      case 2:
        return (
          <ButtonGroup size='sm' isAttached variant='outline'>
            <IconButton
              aria-label='Próximo passo'
              icon={<ArrowLeftIcon />}
              onClick={() => prevFormStep()}
            />
            <Button w='100%' disabled={true}>
              {formStep + 1} / 3
            </Button>
            <IconButton
              disabled={true}
              aria-label='Passo anterior'
              icon={<ArrowRightIcon />}
            />
          </ButtonGroup>
        )
    }
  }

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  const {
    handleSubmit,
    register,
    reset: formReset,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log(values)
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        nextStep()
        reset()
        formReset()
        resolve()
      }, 3000)
    })
  }

  return (
    <Flex>
      <Flex as='form' onSubmit={handleSubmit(onSubmit)}>
        <ButtonGroup size='sm' isAttached variant='outline'>
          <IconButton
            aria-label='Próximo passo'
            icon={<ArrowLeftIcon />}
            onClick={() => prevStep()}
          />
          <Button w='100%' disabled={true}>
            {activeStep + 1} / 3
          </Button>
          <IconButton
            // disabled={true}
            aria-label='Passo anterior'
            icon={<ArrowRightIcon />}
            onClick={() => nextStep()}
          />
        </ButtonGroup>
        <Steps activeStep={activeStep}>
          <Step label='Infos pessoais' key={0}>
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
                placeholder='Sua senha aqui...'
                autoComplete='email'
                {...register('email', {
                  required: 'O email é necessário',
                })}
              />
            </FormControl>
          </Step>
          <Step label='Password' key={1}>
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
                  required: 'A senha é necessária',
                })}
              />
            </FormControl>
          </Step>
          <Step label='Congratulations' key={2}>
            <Button type='submit' w='100%' isLoading={isSubmitting}>
              Registrar-se
              <Text>Sucesso</Text>
            </Button>
          </Step>
        </Steps>
      </Flex>
    </Flex>
    // <Flex justifyContent='space-around' alignItems='center' w='100vw' h='100vh'>
    //   <Stack>
    //     <Heading>Bem vindo ao Ultimate CMS</Heading>
    //     <Text>Torne-se um membro em apenas 3 etapas</Text>
    //   </Stack>
    //   <Flex
    //     justifyContent='center'
    //     alignItems='center'
    //     flexDir='column'
    //     minW='400px'
    //     p={4}
    //     as='form'
    //     onSubmit={handleSubmit(onSubmit)}
    //   >
    //     {formStep == 0 && (
    //       <>
    //         <FormControl
    //           label='Email'
    //           id='email'
    //           helpertext='O campo email precisa ser inserido'
    //           isInvalid={errors.email}
    //           errormessage={errors.email && errors.email.message}
    //           m={4}
    //         >
    //           <Input
    //             type='text'
    //             name='email'
    //             placeholder='Seu email aqui...'
    //             autoComplete='email'
    //             {...register('email', {
    //               required: 'O email é necessário',
    //             })}
    //           />
    //         </FormControl>
    //       </>
    //     )}

    //     {formStep == 1 && (
    //       <>
    //         <FormControl
    //           label='Senha'
    //           id='password'
    //           helpertext='O campo senha precisa ser inserido'
    //           isInvalid={errors.password}
    //           errormessage={errors.password && errors.password.message}
    //           m={4}
    //         >
    //           <Input
    //             type='password'
    //             name='password'
    //             placeholder='Sua senha aqui...'
    //             autoComplete='current-password'
    //             {...register('password', {
    //               required: 'A senha é necessário',
    //             })}
    //           />
    //         </FormControl>
    //       </>
    //     )}

    //     {formStep == 2 && (
    //       <Button type='submit' w='100%' isLoading={isSubmitting}>
    //         Registre-se
    //       </Button>
    //     )}
    //     {handleButton(formStep)}
    //     <Text display='flex' w='100%'>
    //       Já possui uma conta?
    //       <Text color='purple.600' fontWeight='bold' ml={2}>
    //         <Link href='/'>
    //           <a>Entrar</a>
    //         </Link>
    //       </Text>
    //     </Text>
    //   </Flex>
    // </Flex>
  )
}

export default SignUpComponent
