import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

const BioDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 60px;

  p {
    font-size: 16px;
    margin-bottom: 0;
  }
`

const Avatar = styled.div`
  margin-right: 20px;
`

const Intro = styled.div`
  margin-bottom: 0;
`

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        childImageSharp {
          fixed(width: 70, height: 70, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <BioDiv>
      {avatar && (
        <Avatar>
          <Image fixed={avatar} alt={author?.name || ``} />
        </Avatar>
      )}
      <Intro>
        <p>
          Hi, I'm <strong>Jinn Wang</strong>. Frontend developer in Vancouver.
        </p>
        <p>
          I blog about web development and JavaScript. See more side projects
          at: &nbsp;
          <a href="https://jinnwang.com/" target="_blank" rel="noreferrer">
            jinnwang.com
          </a>
        </p>
      </Intro>
    </BioDiv>
  )
}

export default Bio
