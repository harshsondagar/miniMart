import { Outlet, NavLink } from "react-router";

export default function RootLayout() {
  
  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
      isActive 
        ? "bg-blue-600 text-white" 
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100 ">

     <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
  {/* Three-column grid ensures the links stay perfectly dead-center */}
  <div className="mx-auto grid h-full max-w-7xl grid-cols-3 items-center">
    
    {/* 1. Left Column: Brand Logo */}
    <div className="flex items-center justify-start gap-2">
      <span className="text-xl">⚡</span>
      <h1 className="text-xl font-bold tracking-tight text-gray-900">
        MiniMart
      </h1>
    </div>

    {/* 2. Center Column: Navigation Links */}
    {/* 2. Center Column: Navigation Links */}
<nav className="flex flex-row items-center justify-center gap-1 sm:gap-4">
  <NavLink to="/" end className={linkStyles}>
    <span>🏠</span>
    <span className="hidden sm:inline">Home</span>
  </NavLink>

  <NavLink to="/products" className={linkStyles}>
    <span>📦</span>
    <span className="hidden sm:inline">Products</span>
  </NavLink>
  
  {/* ADDED: Orders Link */}
  <NavLink to="/orders" className={linkStyles}>
    <span>📋</span>
    <span className="hidden sm:inline">Orders</span>
  </NavLink>
  
  <NavLink to="/cart" className={linkStyles}>
    <span>🛒</span>
    <span className="hidden sm:inline">Cart</span>
  </NavLink>
  
  <NavLink to="/profile/123" className={linkStyles}>
    <span>👤</span>
    <span className="hidden sm:inline">Profile</span>
  </NavLink>
</nav>

    {/* 3. Right Column: Dynamic Login/Logout Button */}
    <div className="flex items-center justify-end">
      {/* Replace 'true' with your actual authentication state variable (e.g., isLoggedIn) */}
      {true ? (
        <button 
          onClick={() => console.log('logging out...')} 
          className="flex items-center gap-1 rounded-xl bg-gray-50 border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <span>🚪</span>
          <span className="hidden xs:inline">Logout</span>
        </button>
      ) : (
        <NavLink 
          to="/login" 
          className="flex items-center gap-1 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          <span>🔑</span>
          <span>Login</span>
        </NavLink>
      )}
    </div>

  </div>
</header>


      <main className="flex-1 mt-16 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
