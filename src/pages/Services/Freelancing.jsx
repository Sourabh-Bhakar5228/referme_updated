import { useState } from 'react';

const Freelancing = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'design':
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "UI/UX Design",
                desc: "We create intuitive and visually appealing user interfaces that enhance user experience and engagement.",
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              },
              {
                title: "Website Design",
                desc: "Modern, responsive website designs that work across all devices and screen sizes.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "Mobile App Design",
                desc: "Native mobile app designs following platform-specific guidelines for iOS and Android.",
                icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              },
              {
                title: "Logo & Branding",
                desc: "Complete branding solutions including logo design, color schemes, and visual identity.",
                icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              }
            ].map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        );
      case 'development':
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Website Development",
                desc: "Custom website development using modern technologies like React, Next.js, and Tailwind CSS.",
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              },
              {
                title: "Mobile App Development",
                desc: "Cross-platform mobile app development with React Native or native iOS/Android development.",
                icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              },
              {
                title: "E-commerce Solutions",
                desc: "Complete e-commerce solutions with payment integration, inventory management, and more.",
                icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              },
              {
                title: "CMS Implementation",
                desc: "Content Management System setup and customization for easy content updates.",
                icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              }
            ].map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        );
      case 'training':
        return (
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[
              {
                title: "Project Documentation",
                desc: "Detailed documentation explaining design and development decisions for your learning.",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              },
              {
                title: "Code Walkthroughs",
                desc: "Step-by-step explanations of the codebase to help you understand implementation details.",
                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              },
              {
                title: "Design Process Explanation",
                desc: "Insight into our design thinking process and rationale behind design choices.",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              },
              {
                title: "Best Practices Guide",
                desc: "Comprehensive guide covering industry best practices relevant to your project.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              }
            ].map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const ServiceCard = ({ title, desc, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-purple-100 group">
      <div className="flex items-start">
        <div className="bg-purple-50 p-3 rounded-lg mr-4 group-hover:bg-purple-100 transition-colors duration-300">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}></path>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-purple-700 transition-colors duration-300">{title}</h3>
          <p className="text-gray-600">{desc}</p>
        </div>
      </div>
    </div>
  );

  const ProcessStep = ({ number, title, description }) => (
    <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const PricingCard = ({ title, price, features, popular = false }) => (
    <div className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 ${popular ? 'border-purple-600 transform scale-[1.02] relative' : 'border-gray-200'} h-full flex flex-col`}>
      {popular && (
        <div className="absolute top-0 right-4 -mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="text-4xl font-bold mb-6 text-purple-600">
        ${price}<span className="text-lg text-gray-500">/project</span>
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-medium transition duration-300 ${popular ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}>
        Get Started
      </button>
    </div>
  );

  const PortfolioItem = ({ title, desc, imgSrc }) => (
    <div className="relative group overflow-hidden rounded-xl">
      <img 
        src={imgSrc} 
        alt={title} 
        className="w-full h-64 object-cover transition duration-500 group-hover:scale-105" 
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition duration-300">
          <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>
          <p className="text-gray-300">{desc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-gray-800 antialiased">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Professional Freelancing Services</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Complementing your training with real-world design and development solutions</p>
          <button className="bg-white text-purple-700 font-semibold px-8 py-4 rounded-full hover:bg-purple-100 transition duration-300 shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div>
      </header>

      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Expand Your Skills with Practical Projects</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At REFER ME GROUP, we not only provide top-quality online training courses but also offer professional freelancing services to help bring your ideas to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                title: "Learn by Example",
                desc: "Get professionally executed projects that serve as learning references."
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Industry Standards",
                desc: "All work delivered meets current industry best practices."
              },
              {
                icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
                title: "Training Support",
                desc: "Get explanations of our solutions to enhance your learning."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-bl from-purple-50 to-purple-200 p-8 rounded-xl shadow-lg hover:shadow-md transition-all duration-300 h-full">
                <div className="bg-purple-300 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Freelancing Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions tailored to complement your learning journey
            </p>
          </div>
          
          <div className="flex flex-wrap border-b border-gray-300 mb-8 justify-center">
            {[
              { id: 'design', label: 'Design Services', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
              { id: 'development', label: 'Development Services', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
              { id: 'training', label: 'Training Integration', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium flex items-center ${activeTab === tab.id ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-purple-500'}`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon}></path>
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
          
          {renderTabContent()}
        </div>
      </section>

      {/* Process Workflow */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Simple 5-Step Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparent workflow that ensures quality and learning opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4">
            <ProcessStep 
              number="1" 
              title="Requirement Analysis" 
              description="We carefully analyze your project requirements and learning objectives." 
            />
            <ProcessStep 
              number="2" 
              title="Project Planning" 
              description="We create a detailed plan with milestones and deliverables." 
            />
            <ProcessStep 
              number="3" 
              title="Execution" 
              description="Our experts work on your project following best practices." 
            />
            <ProcessStep 
              number="4" 
              title="Quality Assurance" 
              description="Rigorous testing and review process ensures top quality." 
            />
            <ProcessStep 
              number="5" 
              title="Delivery & Learning" 
              description="We deliver the project along with educational materials." 
            />
          </div>
        </div>
      </section>

    
    

      {/* Portfolio */}
      <section className="py-14 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Freelance Work Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Examples of projects we've completed for our training students
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <PortfolioItem 
              title="E-commerce Website" 
              desc="Complete design and development for online store" 
              imgSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
            />
            
            <PortfolioItem 
              title="Fitness Tracking App" 
              desc="UI/UX design and iOS/Android development" 
              imgSrc="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
            />
            
            <PortfolioItem 
              title="Corporate Branding" 
              desc="Complete visual identity and brand guidelines" 
              imgSrc="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
            />
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Freelancing;