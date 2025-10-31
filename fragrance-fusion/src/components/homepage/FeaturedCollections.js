import React from "react";

const FeaturedCollections = () => {
  const fragrances = [
    {
      title: "Nocturnal Blooms",
      description: "Jasmine · Sandalwood · Amber",
      image: "https://images.unsplash.com/photo-1641390322824-46593f96c416?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNhbmRhbHdvb2QlMjBwZXJmdW1lfGVufDB8fDB8fHww",
      price: "₹24,999",
      volume: "100ml Eau de Parfum"
    },
    {
      title: "Citrus Éclat",
      description: "Bergamot · Vetiver · Oakmoss",
      image: "https://images.unsplash.com/photo-1700473209752-395910c89003?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhbmRhbHdvb2QlMjBwZXJmdW1lfGVufDB8fDB8fHww",
      price: "₹19,999",
      volume: "100ml Eau de Toilette"
    },
    {
      title: "Oud Mystique",
      description: "Agarwood · Saffron · Leather",
      image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&auto=format&fit=crop&q=60",
      price: "₹34,999",
      volume: "50ml Extrait de Parfum"
    }
  ];

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-4 fw-light mb-3 text-ebony">
          <span className="d-block mb-2">Signature Fragrances</span>
          <span className="h4 d-block fw-normal text-muted">
            Crafted with Rare Essences
          </span>
        </h2>
      </div>

      <div className="row g-4 g-lg-5">
        {fragrances.map((fragrance, index) => (
          <div key={index} className="col-md-4">
            <div
              className="card h-100 border-0 shadow-sm-hover overflow-hidden transition-all perfume-card"
              style={{
                borderRadius: "12px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div
                className="card-img-top position-relative overflow-hidden"
                style={{
                  height: "400px",
                  clipPath: "inset(0 round 12px 12px 0 0)",
                  backgroundColor: "#f8f5f0"
                }}
              >
                <img
                  src={fragrance.image}
                  alt={fragrance.title}
                  className="img-fluid w-100 h-100 object-contain p-4"
                  loading="lazy"
                  style={{
                    transform: "scale(1.01)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1.01)")
                  }
                />
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-3 text-white"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(87, 70, 57, 0.8), transparent)",
                  }}
                >
                  <h3 className="h5 mb-0 fw-light">{fragrance.title}</h3>
                  <p className="small mb-0 opacity-75">{fragrance.volume}</p>
                </div>
              </div>

              <div className="card-body p-4 text-center bg-satin">
                <p className="text-muted mb-2 font-italic">{fragrance.description}</p>
                <div className="d-flex flex-column justify-content-center gap-2">
                  <span className="h5 mb-0 text-amber">{fragrance.price}</span>
                  <button
                    className="btn btn-outline-amber px-4 py-2 rounded-pill fw-light"
                    style={{
                      border: "1px solid #b76e79",
                      color: "#b76e79",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Discover Scent Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .text-ebony { color: #555152; }
        .text-amber { color: #b76e79; }
        .bg-satin { background-color: #f9f6f2; }
        .perfume-card:hover {
          box-shadow: 0 0.5rem 1.5rem rgba(183, 110, 121, 0.1) !important;
          transform: translateY(-3px);
        }
        .btn-outline-amber:hover {
          background: #b76e79;
          color: white !important;
          transform: translateY(-2px);
        }
        .object-contain {
          object-fit: contain;
          object-position: center;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCollections;
