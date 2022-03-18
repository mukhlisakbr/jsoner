import { NextPage } from 'next'
import { FaGithub } from 'react-icons/fa'

const Navbar: NextPage = () => {
  return (
    <div className="navbar bg-base-200 p-4 px-8">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">JSONer</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-circle btn-ghost">
          <a
            href="https://github.com/mukhlisakbr/jsoner"
            target={'_blank'}
            rel="noreferrer"
          >
            <FaGithub size={24} />
          </a>
        </button>
      </div>
    </div>
  )
}

export default Navbar
