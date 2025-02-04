import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col transition-all duration-500 ease-in-out">
      {/* ヘッダー */}
      <header className="bg-blue-500 dark:bg-gray-800 text-white p-4 transition-all duration-500">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">MyApp</h1>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
          </ul>
          <DarkModeToggle />
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 container mx-auto p-4 transition-opacity duration-500">
        {children}
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white text-center p-4 transition-all duration-500">
        © 2025 MyApp
      </footer>
    </div>
  );
}
