import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaSortAlphaDown, FaCalendarAlt } from 'react-icons/fa';

const BrandsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const premiumBrands = [
    {
      id: 1,
      name: 'Maison Francis Kurkdjian',
      logo: 'https://www.franciskurkdjian.com/on/demandware.static/Sites-MFK_XBORDER-Site/-/default/dw2a7bdb5f/images/logo-kurky.png',
      description: 'Parisian luxury fragrances since 2009',
      origin: 'France',
      established: 2009,
    },
    {
      id: 2,
      name: 'Le Labo',
      logo: 'https://s.yimg.com/fz/api/res/1.2/.D_xl_WPc6.cn1IgIZf6Gg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/077bacc5-e6e5-35e6-a31e-f9903f100241/t_500x300',
      description: 'Artisan fragrances with a soul, hand-blended in-store',
      origin: 'USA',
      established: 2006,
    },
    {
      id: 3,
      name: 'Diptyque',
      logo: 'https://www.diptyqueparis.com/on/demandware.static/Sites-diptyque-Site/-/default/dw1f3b0c2d/images/logo.png',
      description: 'Timeless French perfumes and scented candles',
      origin: 'France',
      established: 1961,
    },
    {
      id: 4,
      name: 'Byredo',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Byredo_logo.svg/2560px-Byredo_logo.svg.png',
      description: 'Contemporary Swedish luxury with global appeal',
      origin: 'Sweden',
      established: 2006,
    },
    {
      id: 5,
      name: 'Jo Malone London',
      logo: 'https://www.jomalone.co.in/cdn/shop/files/logo_400x.png?v=1613185858',
      description: 'Elegant British scents with a playful twist',
      origin: 'United Kingdom',
      established: 1994,
    },
    {
      id: 6,
      name: 'Creed',
      logo: 'https://www.creedfragrances.co.uk/dw/image/v2/BCWB_PRD/on/demandware.static/-/Sites-creed-master-catalog/default/dw4c3f4d76/images/logo.png?sw=800&sh=800',
      description: 'Heritage-rich luxury fragrances since 1760',
      origin: 'United Kingdom',
      established: 1760,
    },
    {
      id: 7,
      name: 'Tom Ford',
      logo: 'https://www.tomford.com/cdn/slogo/TF/logo.svg',
      description: 'Bold and modern designer fragrances',
      origin: 'USA',
      established: 2005,
    },
    {
      id: 8,
      name: 'Amouage',
      logo: 'https://s.yimg.com/fz/api/res/1.2/DQCjARDIUCuwKhV.4G0IPw--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9Mjg2/https://s.yimg.com/zb/imgv1/c60d6937-c2d4-33ab-9fde-f65b9ddd544b/t_500x300',
      description: 'Opulent Middle Eastern perfume house with Western influence',
      origin: 'Oman',
      established: 1983,
    },
    {
      id: 9,
      name: 'Parfums de Marly',
      logo: 'https://www.parfums-de-marly.com/cdn/shop/files/logo_PdM_400x.png?v=1613707571',
      description: 'Fragrances inspired by 18th-century French luxury',
      origin: 'France',
      established: 2009,
    },
    {
      id: 10,
      name: 'Frédéric Malle',
      logo: 'https://www.fredericmalle.com/cdn/shop/files/FM_Logo_black_300x300.png?v=1613704467',
      description: 'Editions de Parfums – showcasing master perfumers',
      origin: 'France',
      established: 2000,
    },
    {
      id: 11,
      name: 'Initio Parfums Privés',
      logo: 'https://initioparfums.com/cdn/shop/files/Logo_Initio_Noir_300x300.png?v=1620045632',
      description: 'Fragrances with mysterious and sensual blends',
      origin: 'France',
      established: 2015,
    },
    {
      id: 12,
      name: 'Penhaligon’s',
      logo: 'https://www.penhaligons.com/cdn/shop/files/penhaligons-logo_300x300.png?v=1614305912',
      description: 'Quintessentially British perfume house with a royal warrant',
      origin: 'United Kingdom',
      established: 1870,
    },
    {
      id: 13,
      name: 'Nishane',
      logo: 'https://nishane.com/cdn/shop/files/NISHANE_LOGO_black_400x.png?v=1614313824',
      description: 'Artistic scents with Turkish storytelling roots',
      origin: 'Turkey',
      established: 2012,
    },
    {
      id: 14,
      name: 'Memo Paris',
      logo: 'https://www.memoparis.com/cdn/shop/files/Logo_MEMO_Paris_Noir_300x300.png?v=1620204038',
      description: 'Evocative scents inspired by world travel',
      origin: 'France',
      established: 2007,
    },
    {
      id: 15,
      name: 'Etat Libre d’Orange',
      logo: 'https://www.etatlibredorange.com/cdn/shop/files/logo-ELDO_400x.png?v=1614333251',
      description: 'Provocative and artistic French fragrance house',
      origin: 'France',
      established: 2006,
    },
    {
      id: 16,
      name: 'Aesop',
      logo: 'https://s.yimg.com/fz/api/res/1.2/bW.sXw7PhQJEv3KMjHoWAA--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/aeaa622d-6218-375a-839e-51a8f877622e/t_500x300',
      description: 'Minimalist luxury with botanical focus',
      origin: 'Australia',
      established: 1987,
    },
  ];

  const [brands] = useState(premiumBrands);

  const handleImageError = (e) => {
    if (!e.target.src.includes('via.placeholder.com')) {
      e.target.src = 'https://via.placeholder.com/200x100.png?text=Brand+Logo+Not+Found';
      e.target.style.objectFit = 'contain';
      e.target.style.padding = '1rem';
    }
  };

  const filteredBrands = brands
    .filter((brand) =>
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'established') return a.established - b.established;
      return 0;
    });

  return (
    <Container fluid className="cosmic-bg p-5 min-vh-100">
      <Row className="mb-4 justify-content-center">
        <Col md={8} className="mb-3 mb-md-0">
          <InputGroup className="cosmic-search-wrapper">
            <InputGroup.Text className="cosmic-search-prepend">
              <FaSearch className="search-icon" />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search luxury brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cosmic-search-input"
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cosmic-select"
          >
            <option value="name">Sort by Name</option>
            <option value="established">Sort by Established</option>
          </Form.Select>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4 px-3">
        {filteredBrands.map((brand) => (
          <Col key={brand.id}>
            <Card className="cosmic-brand-card h-100">
              <div className="brand-image-container">
                <Card.Img
                  loading="lazy"
                  variant="top"
                  src={brand.logo}
                  className="brand-logo-img"
                  alt={`${brand.name} logo`}
                  onError={handleImageError}
                  onLoad={(e) => {
                    e.target.style.objectFit = 'contain';
                    e.target.style.width = 'auto';
                    e.target.style.height = 'auto';
                    e.target.style.maxWidth = '100%';
                    e.target.style.maxHeight = '100%';
                  }}
                />
              </div>
              <Card.Body className="card-body-content">
                <Card.Title className="brand-name">
                  {brand.name}
                </Card.Title>
                <Card.Text className="brand-description">
                  {brand.description}
                </Card.Text>
                <div className="brand-meta-info">
                  <div className="meta-item">
                    <FaSortAlphaDown className="meta-icon" />
                    <span>{brand.origin}</span>
                  </div>
                  <div className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    <span>Est. {brand.established}</span>
                  </div>
                </div>
                <Card.Footer className="card-footer">
                  <Link
                    to={`/brands/${brand.id}`}
                    className="view-collections-btn"
                  >
                    View Collections
                  </Link>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <style>{`
        :root {
          --cosmic-bg: #f4f4f9;
          --stellar-purple: #5a4fcf;
          --cosmic-gold: #f4b400;
          --space-black: #ffffff;
          --star-dust: #444444;
          --transition: 0.3s ease-in-out;
        }

        .cosmic-bg {
          background: var(--cosmic-bg);
          color: var(--star-dust);
        }

        .cosmic-search-wrapper {
          border-radius: 2rem;
          background: var(--space-black);
          border: 1px solid rgba(90, 79, 207, 0.3);
          transition: all var(--transition);
        }

        .cosmic-search-wrapper:focus-within {
          border-color: var(--stellar-purple);
          box-shadow: 0 0 15px rgba(90, 79, 207, 0.4);
        }

        .cosmic-search-prepend {
          background: transparent;
          border: none;
          border-right: 1px solid rgba(90, 79, 207, 0.4);
          border-radius: 2rem 0 0 2rem;
          padding-left: 1.5rem;
        }

        .search-icon {
          color: var(--stellar-purple);
          font-size: 1.1rem;
        }

        .cosmic-search-input {
          background: transparent;
          border: none;
          color: var(--star-dust);
          padding: 0.75rem 1rem;
          border-radius: 0 2rem 2rem 0;
        }

        .cosmic-search-input::placeholder {
          color: rgba(68, 68, 68, 0.6);
        }

        .cosmic-select {
          background: var(--space-black);
          border: 1px solid rgba(90, 79, 207, 0.3);
          color: var(--star-dust);
          border-radius: 2rem;
          width: 100%;
          transition: all var(--transition);
          padding: 0.75rem 1.5rem;
        }

        .cosmic-select:focus {
          border-color: var(--stellar-purple);
          box-shadow: 0 0 15px rgba(90, 79, 207, 0.4);
        }

        .cosmic-brand-card {
          background: var(--space-black);
          border: 1px solid rgba(90, 79, 207, 0.3);
          border-radius: 1rem;
          transition: all var(--transition);
          overflow: hidden;
        }

        .cosmic-brand-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(90, 79, 207, 0.2);
        }

        .brand-image-container {
          height: 200px;
          background: rgba(244, 244, 249, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
        }

        .brand-logo-img {
          transition: transform 0.3s ease;
        }

        .cosmic-brand-card:hover .brand-logo-img {
          transform: scale(1.05);
        }

        .card-body-content {
          padding: 1.5rem;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(244, 244, 249, 0.9) 100%
          );
          position: relative;
          z-index: 1;
        }

        .brand-name {
          color: var(--cosmic-gold);
          font-weight: 600;
          margin-bottom: 1rem;
          min-height: 3rem;
          font-size: 1.25rem;
        }

        .brand-description {
          color: rgba(68, 68, 68, 0.8);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          min-height: 4rem;
          line-height: 1.5;
        }

        .brand-meta-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          color: rgba(68, 68, 68, 0.7);
          font-size: 0.9rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .meta-icon {
          color: var(--stellar-purple);
          font-size: 0.9rem;
        }

        .card-footer {
          background: transparent;
          border-top: 1px solid rgba(90, 79, 207, 0.3);
          padding: 1rem 0 0 0;
        }

        .view-collections-btn {
          background: transparent;
          border: 2px solid var(--stellar-purple);
          color: var(--stellar-purple);
          border-radius: 2rem;
          padding: 0.5rem 1.5rem;
          width: 100%;
          text-align: center;
          text-decoration: none;
          transition: all var(--transition);
          font-weight: 500;
        }

        .view-collections-btn:hover {
          background: var(--stellar-purple);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(90, 79, 207, 0.5);
        }

        @media (max-width: 768px) {
          .cosmic-brand-card {
            margin-bottom: 1.5rem;
          }
          
          .brand-name {
            font-size: 1.1rem;
          }
          
          .brand-description {
            font-size: 0.85rem;
          }
          
          .cosmic-select {
            padding: 0.5rem 1rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default BrandsPage;