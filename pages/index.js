import MainLayout from '../components/main-layout'

export default function Home() {
  return (
    <></>
  )
}
Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}