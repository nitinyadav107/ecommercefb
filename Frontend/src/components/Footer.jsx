import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-300 dark:text-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8 justify-items-center text-center md:text-left">
  {/* Quick Links */}
  <div className="p-4">
    <h3 className="text-lg font-semibold">Quick Links</h3>
    <ul className="mt-4 space-y-2">
      <li>
        <a
          href="/privacy-policy"
          className="text-gray-400 hover:text-gray-900"
        >
          Privacy Policy
        </a>
      </li>
      <li>
        <a
          href="/terms-and-conditions"
          className="text-gray-400 hover:text-gray-900"
        >
          Terms and Conditions
        </a>
      </li>
      <li>
        <a
          href="/cancellation-refund"
          className="text-gray-400 hover:text-gray-900"
        >
          Cancellation and Refund
        </a>
      </li>
      <li>
        <a
          href="/shipping-delivery"
          className="text-gray-400 hover:text-gray-900"
        >
          Shipping and Delivery
        </a>
      </li>
      <li>
        <a href="/contact-us" className="text-gray-400 hover:text-gray-900">
          Contact Us
        </a>
      </li>
    </ul>
  </div>

  {/* Customer Support */}
  <div className="p-4">
    <h3 className="text-lg font-semibold">Customer Support</h3>
    <p className="mt-4 text-gray-400">
      Need help? Contact us anytime for assistance with orders, returns, or
      general inquiries.
    </p>
    <p className="mt-4">
      <span className="block text-gray-800 font-medium">Call us: 1800-123-456</span>
      <span className="block text-gray-400">Mon-Fri: 9am to 7pm</span>
    </p>
    <p className="mt-4 text-gray-400">Email: support@example.com</p>
  </div>

  {/* Social Media */}
  <div className="p-4">
    <h3 className="text-lg font-semibold">Follow Us</h3>
    <div className="flex justify-center md:justify-start space-x-4 mt-4">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-900"
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-900"
      >
        <i className="fab fa-twitter"></i>
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-900"
      >
        <i className="fab fa-instagram"></i>
      </a>
    </div>
  </div>
</div>


        {/* Divider */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Footer Bottom */}
        <div className="text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Your E-commerce Website. All rights
            reserved.
          </p>
          <p className="mt-4">
            Designed with ❤️ by <a href="#">Your Company</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
