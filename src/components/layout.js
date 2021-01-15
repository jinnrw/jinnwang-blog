import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Header = styled.div`
  background: var(--color-light-grey);
  width: 100%;
  padding: 20px 80px;
`

const Logo = styled.div`
  a {
    font-size: 1.125rem;
    font-weight: 700;
  }
`
const Footer = styled.div`
  width: 100%;
  max-width: var(--maxWidth-800);
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
  font-size: var(--fontSize-0);
`
const Copyright = styled.div`
  color: var(--color-text-light);
`

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header>
        <Logo>
          <Link to="/">Blog by Jinn Wang</Link>
        </Logo>
      </Header>
      <main className="main-wrapper">{children}</main>
      <Footer>
        <Copyright>Jinn Wang © {new Date().getFullYear()}</Copyright>
      </Footer>
    </div>
  )
}

export default Layout
