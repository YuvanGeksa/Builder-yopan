export const metadata = {
  title: "Yopandelreyz — Website Builder",
  description: "Build your Bio Links / Portfolio / CV / Business Profile instantly.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
