import { Button } from '@chakra-ui/button'

const RenderButton = props => {
  const { func, children } = props
  return (
    <Button w='100%' onClick={func} {...props}>
      {children}
    </Button>
  )
}

export default RenderButton
