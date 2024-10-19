import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 RidePare. All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="hover:text-accent">Privacy Policy</a> |
          <a href="#" className="hover:text-accent ml-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
