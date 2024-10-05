'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">CrypTools</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className="nav-link" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/indicators" className="nav-link">Indicators</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
