const StoreInfo = () => {
  return (
    <section className="store-section">
      <div className="store-container">
        <div className="store-text">
          <h2 className="store-title">Visit Our Pet shelter</h2>
          <p className="store-address">
            📍 Najjera, Kampala, Ugnda
          </p>
          <p className="store-hours">
            🕒 Mon–Sat: 9:00 AM – 6:00 PM<br />
            🕒 Sun: Closed
          </p>
          <p className="store-contact">
            ☎️ +256 709 848 167<br />
            ✉️ support@automobile.ug
          </p>
        </div>

        {/* <div className="store-map">
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.952438084463!2d3.379205314773689!3d6.524379495286894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf507f5d18c57%3A0x469d7e9fd6d1b9c!2sLagos!5e0!3m2!1sen!2sng!4v1683571453731"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-iframe"
          ></iframe>
        </div> */}
      </div>
    </section>
  );
};

export default StoreInfo;