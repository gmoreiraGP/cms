import { AuthContext } from '@/contexts/AuthContext'
import { getApiClient } from '@/utils/axios'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useContext } from 'react'

const Dashboard = () => {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)
  const apiClient = getApiClient(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
