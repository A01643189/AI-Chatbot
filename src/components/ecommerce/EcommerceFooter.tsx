export default function Footer() {
    return (
      <footer className="bg-[#fefefe] text-black dark:bg-black dark:text-white border-t border-gray-200 dark:border-gray-700 mt-12 px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-2">BRAND</h4>
            <ul className="space-y-1">
              <li><a href="#">Stores</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="font-bold mb-2">LEGAL</h4>
            <ul className="space-y-1">
              <li><a href="#">Legal Notice</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="font-bold mb-2">SUPPORT</h4>
            <ul className="space-y-1">
              <li><a href="#">Returns</a></li>
              <li><a href="#">Order Tracking</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
  
        <p className="text-center text-xs mt-8">&copy; {new Date().getFullYear()} StreetWear</p>
      </footer>
    );
  }
  