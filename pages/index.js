import MainLayout from '../components/main-layout'

export default function Home() {
  
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
    </div>
  )
}
Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}