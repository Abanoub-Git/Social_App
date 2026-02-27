import { Button } from '@heroui/react'

export default function AppButton({children, ...prop}) {
  return (
    <Button {...prop}>
      {children}
    </Button>
  )
}
