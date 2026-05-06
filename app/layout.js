export const metadata = {
  title: 'Runshowrunner',
  description: 'Runshowrunner landing page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
