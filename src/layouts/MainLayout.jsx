const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-primary">Elcom AI</div>
            <div className="flex gap-6">
              <a href="/home" className="hover:text-primary transition-colors">Home</a>
              <a href="/products" className="hover:text-primary transition-colors">Products</a>
              <a href="/cart" className="hover:text-primary transition-colors">Cart</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          © 2025 Elcom AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
