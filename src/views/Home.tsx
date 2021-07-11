import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>React + Typescript FTW</h1>
      <Link to="/users">Users</Link>
    </div>
  )
}
