const Footer = () => {
  return (
    <footer className="foodblastFooter">

      
      <div className="footerContainer">

       
        <div className="footerBrand">
          <h2>
            Food<span>Blast</span>
          </h2>

          <p>
            Discover delicious food from your favorite
            restaurants and enjoy it at your doorstep.
          </p>
        </div>


        
        <div className="footerColumn">
          <h3>FoodBlast</h3>

          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/help">Help & Support</a>
        </div>


        
        <div className="footerColumn">
          <h3>For Partners</h3>

          <a href={import.meta.env.VITE_VENDOR_URL}>
            Register as Vendor
          </a>

          <a href={import.meta.env.VITE_VENDOR_URL}>
            Vendor Login
          </a>

          <a href={import.meta.env.VITE_VENDOR_URL}>
            Partner With Us
          </a>
        </div>


       
        <div className="footerColumn">
          <h3>Follow Us</h3>

          <div className="socialLinks">
            <a href="#" aria-label="Instagram">
              Instagram
            </a>

            <a href="#" aria-label="Facebook">
              Facebook
            </a>

            <a href="#" aria-label="Twitter">
              Twitter
            </a>
          </div>
        </div>

      </div>


      
      <div className="footerBottom">

        <p>
          © {new Date().getFullYear()} FoodBlast. All rights reserved.
        </p>

        <div className="footerBottomLinks">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

      </div>

    </footer>
  );
};

export default Footer;

