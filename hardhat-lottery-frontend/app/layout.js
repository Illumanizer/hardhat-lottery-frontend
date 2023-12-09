import './globals.css'


export const metadata = {
  title: 'Solidity Lottery',
  description: 'Lottery app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
