import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/view/HomePage'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return <HomePage />
}
