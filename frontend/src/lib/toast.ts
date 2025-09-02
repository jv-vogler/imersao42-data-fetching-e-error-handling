import { createToaster } from '@/components/ui/toast'

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
  max: 10,
})

export const showToast = {
  success: (message: string) => {
    toaster.create({
      title: 'Sucesso',
      description: message,
      type: 'success',
      duration: 2000,
    })
  },

  error: (message: string) => {
    toaster.create({
      title: 'Erro',
      description: message,
      type: 'error',
      duration: 3000,
    })
  },

  info: (message: string) => {
    toaster.create({
      title: 'Informação',
      description: message,
      type: 'info',
      duration: 2000,
    })
  },
}
