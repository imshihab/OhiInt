DROP TABLE IF EXISTS site_content;

CREATE TABLE site_content (
    id INTEGER PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO site_content (id, data) VALUES (1, '{
    "siteTitle": "OHI International",
    "navbar": {
        "logo": "/logo.png",
        "cta": {
            "text": "Request a Quote",
            "href": "#contactos"
        },
        "links": [
            { "title": "Start", "href": "#hero" },
            { "title": "Who We Are", "href": "#about" },
            { "title": "Services", "href": "#services" },
            { "title": "Global Network", "href": "#network" },
            { "title": "Insights", "href": "#insights" },
            { "title": "Contacts", "href": "#contactos" }
        ]
    },
    "hero": {
        "video": [
            "/Video/hero-video1.mp4",
            "/Video/hero-video2.mp4",
            "/Video/hero-video3.mp4"
        ],
        "logo": "/logo1x1.png",
        "titlePart1": "OHI",
        "titlePart2": "International",
        "subtitle": [ "Transport", "Sea", "Solutions" ],
        "description": "We connect destinations, we drive business. Hehehe",
        "primaryCta": { "text": "Request a Quote", "href": "#contactos" },
        "secondaryCta": { "text": "Explore", "href": "#about" }
    },
    "trust": {
        "heading": "Companies that Trust Us",
        "logos": [ "Luso Textiles", "Douro wines", "PharmaTech", "Global Electronics", "Auto Parts PT", "National Ceramics" ]
    },
    "stats": [
        { "icon": "schedule", "number": "25+", "label": "Years of Experience" },
        { "icon": "directions_boat", "number": "15,000+", "label": "Shipments per Year" },
        { "icon": "public", "number": "120+", "label": "Countries Covered" },
        { "icon": "workspace_premium", "number": "98%", "label": "Customer Satisfaction" }
    ],
    "about": {
        "badge": "About Us",
        "heading": "Excellence in International Logistics",
        "description": "With over 25 years of experience, Blue Logistics is a leader in international transport and integrated logistics solutions. Our team of experts ensures that every shipment arrives at its destination safely and on time.",
        "mainImage": "/team-meeting.png",
        "secondaryImage": "/team-celebrating.png",
        "features": [
            { "title": "Global Experience", "description": "Covered in over 120 countries with trusted partners across every continent." },
            { "title": "Advanced Technology", "description": "Real-time tracking and a digital platform for complete management of your shipments." }
        ],
        "cta": { "text": "Discover Our History", "href": "#quem-somos" }
    },
    "services": {
        "badge": "Our Services",
        "heading": "Complete Logistics Solutions",
        "description": "We offer a full range of transport and logistics services to meet all the needs of your international business.",
        "items": [
            { "icon": "directions_boat", "title": "Maritime Transport", "description": "Full-service FCL and LCL shipping to major ports worldwide.", "href": "/servicos#maritimo" },
            { "icon": "flight", "title": "Air Transport", "description": "Fast and efficient air freight solutions for urgent cargo worldwide.", "href": "/servicos#aereo" },
            { "icon": "local_shipping", "title": "Road Transport", "description": "National and European road transport with our own fleet and trusted partners.", "href": "/servicos#rodoviario" },
            { "icon": "warehouse", "title": "Storage and Logistics", "description": "Integrated warehousing and logistics management solutions to optimize your supply chain.", "href": "/servicos#logistica" },
            { "icon": "fact_check", "title": "Customs Clearance", "description": "Full-service customs clearance and international trade consulting.", "href": "/servicos#aduaneiro" },
            { "icon": "inventory_2", "title": "Special Cargo", "description": "Transportation of special and oversized cargo, and turnkey industrial projects.", "href": "/servicos#projectos" },
            { "icon": "moving", "title": "Changes", "description": "Residential and commercial removals with vans and specialized personnel in Portugal.", "href": "/servicos#mudancas" }
        ],
        "viewAllCta": { "text": "View All Services", "href": "/servicos" }
    },
    "sectors": {
        "badge": "Sectors",
        "heading": "Industries We Serve",
        "items": [
            { "icon": "factory", "label": "Industry" },
            { "icon": "wine_bar", "label": "To feed" },
            { "icon": "medication", "label": "Pharmaceutical" },
            { "icon": "memory", "label": "Technology" },
            { "icon": "directions_car", "label": "Automobile" },
            { "icon": "shopping_bag", "label": "Retail" }
        ]
    },
    "whyUs": {
        "badge": "Why Blue Logistics?",
        "heading": "Why Choose Us?",
        "image": "/tracking-device.png",
        "items": [
            { "number": "01", "title": "Proven Experience", "description": "Over 25 years of experience in international transport and logistics." },
            { "number": "02", "title": "Global Network", "description": "Presence in over 120 countries with trusted partners." },
            { "number": "03", "title": "Technology", "description": "Digital platform for tracking and managing your shipments." },
            { "number": "04", "title": "Service", "description": "A dedicated team is available to support you throughout the entire process." }
        ]
    },
    "network": {
        "badge": "Global Network",
        "heading": "Our Global Presence",
        "description": "Global coverage with trusted partners on every continent.",
        "image": "cargo-ship.png",
        "cities": [ "Lisbon", "Harbor", "Sines", "Madrid", "Rotterdam", "Hamburg" ],
        "routes": [
            { "icon": "directions_boat", "from": "Lisbon/Sines", "to": "Rotterdam, Netherlands", "mode": "Maritime", "duration": "3-4 days", "frequency": "Daily" },
            { "icon": "directions_boat", "from": "Leixões", "to": "Hamburg, Germany", "mode": "Maritime", "duration": "5-6 days", "frequency": "3 times a week" },
            { "icon": "directions_boat", "from": "Sines", "to": "Shanghai, China", "mode": "Maritime", "duration": "28-32 days", "frequency": "Weekly" },
            { "icon": "travel", "from": "Lisbon", "to": "New York, USA", "mode": "Air", "duration": "2-3 days", "frequency": "Daily" },
            { "icon": "delivery_truck_bolt", "from": "Harbor", "to": "Madrid, Spain", "mode": "Road", "duration": "1 day", "frequency": "Daily" },
            { "icon": "delivery_truck_bolt", "from": "Lisbon", "to": "Paris, France", "mode": "Road", "duration": "2 days", "frequency": "Daily" }
        ]
    },
    "testimonials": {
        "badge": "Testimonials",
        "heading": "What Our Customers Say",
        "items": [
            { "quote": "Blue Logistics exceeded all our expectations. The reliability and professionalism of the team, combined with the tracking technology, make all the difference in our import operations.", "name": "Maria Santos", "role": "Operations Director", "company": "Luso Textiles, SA" },
            { "quote": "Blue Logistics'' responsiveness and flexibility have allowed us to expand our business into new markets with complete confidence. I highly recommend their services.", "name": "John Pereira", "role": "CEO", "company": "Douro Wines Export" },
            { "quote": "In the pharmaceutical sector, precision and meeting deadlines are critical. Blue Logistics demonstrates every day that it is up to this challenge with excellence.", "name": "Ana Rodrigues", "role": "Supply Chain Manager", "company": "PharmaTech Portugal" }
        ]
    },
    "cta": {
        "heading": "Ready to Optimize Your Logistics?",
        "description": "Get in touch and discover how we can boost your international business.",
        "background": "/intermodal-terminal.png",
        "primaryButton": { "text": "Contact Us", "href": "/contactos" },
        "secondaryButton": { "text": "Call us", "tel": "+351912766171" }
    },
    "footer": {
        "logo": "/logo.png",
        "tagline": "Global logistics solutions with excellence and commitment.",
        "social": { "facebook": "https://www.facebook.com/share/1EVHJykqPW/?mibextid=wwXIfr", "instagram": "https://www.instagram.com/bluelogistics.lisboa" },
        "columns": [
            { "heading": "Services", "links": [ { "text": "Maritime Transport", "href": "/servicos#maritimo" }, { "text": "Air Transport", "href": "/servicos#aereo" }, { "text": "Road Transport", "href": "/servicos#rodoviario" }, { "text": "Customs clearance", "href": "/servicos#aduaneiro" } ] },
            { "heading": "Enterprise", "links": [ { "text": "Who We Are", "href": "/quem-somos" }, { "text": "Insights", "href": "/insights" }, { "text": "Privacy Policy", "href": "/privacidade" }, { "text": "Terms and Conditions", "href": "/termos" } ] },
            { "heading": "Contacts", "isContact": true, "phone": "+351 912 766 171", "email": "info@bluelogistics.pt", "addressLine1": "Avenida da Liberdade, Nº 224, 2º", "addressLine2": "1250-148 Lisboa" }
        ],
        "newsletter": { "heading": "Receive Our News", "description": "Subscribe to receive information about industry regulations and trends.", "placeholder": "your@email.com", "button": "Subscribe" },
        "complaintsBookUrl": "https://www.livroreclamacoes.pt/inicio/",
        "complaintsBookImage": "/livro_reclamacoes.png",
        "complaintsBookAlt": "Electronic Complaints Book",
        "copyright": "2026 Blue Logistics, Ltd. All rights reserved."
    }
}');
