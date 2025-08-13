import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-base-100 shadow">
      <div className="navbar px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Home
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/clock" className="font-bold">
                Clock
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
