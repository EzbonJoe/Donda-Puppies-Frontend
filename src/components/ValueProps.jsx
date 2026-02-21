const values = [
  {
    icon: '🐾',
    title: 'Healthy Puppies',
    description: 'All our puppies are vaccinated, dewormed, and carefully cared for.',
  },
  {
    icon: '🏠',
    title: 'Forever Homes',
    description: 'We help every puppy find a loving family to call home.',
  },
  {
    icon: '💖',
    title: 'Trusted Breeder',
    description: 'Our breeders are experienced and prioritize puppy well-being.',
  },
  {
    icon: '🌿',
    title: 'Natural & Safe',
    description: 'We ensure a safe, clean, and nurturing environment for all puppies.',
  },
];

function ValueProps() {
  return (
    <section className="value-section">
      <div className="value-container">
        <h2 className="value-title">Why Choose Donda Puppies</h2>
        <div className="value-grid">
          {values.map((item, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{item.icon}</div>
              <h3 className="value-heading">{item.title}</h3>
              <p className="value-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueProps;
