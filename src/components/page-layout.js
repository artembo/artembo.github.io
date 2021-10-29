import * as React from "react"

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const IndexPage = ({ children }) => {
  return (
    <main style={pageStyles}>
     { children }
    </main>
  )
}

export default IndexPage
