import { useState } from 'react';

const PartnershipPrograms = () => {
  const [activeTab, setActiveTab] = useState('educators');

  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Grow Together with Our Partnership Programs</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Collaborate with us to create mutual value, expand reach, and deliver exceptional learning experiences
          </p>
          <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-full hover:bg-blue-100 transition duration-300 shadow-lg hover:shadow-xl">
            Become a Partner
          </button>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Partnership Models</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the collaboration model that aligns with your goals
            </p>
          </div>

          <div className="flex flex-wrap border-b border-gray-200 mb-8 justify-center">
            {[
              { id: 'educators', label: 'Educators & Trainers' },
              { id: 'institutions', label: 'Institutions' },
              { id: 'corporate', label: 'Corporate Partners' },
              { id: 'affiliates', label: 'Affiliates' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {activeTab === 'educators' && (
              <>
                <PartnerBenefitCard 
                  icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  title="Educator Partnership"
                  description="Monetize your expertise by creating and selling courses on our platform"
                  benefits={[
                    "Earn 70% revenue share on your courses",
                    "Access to our learning management system",
                    "Marketing and promotional support",
                    "Student community engagement"
                  ]}
                />
                <PartnerTestimonial 
                  quote="Partnering expanded my reach 5x while letting me focus on teaching."
                  author="Dr. Sarah Johnson, Data Science Educator"
                  role="Partner since 2020"
                />
              </>
            )}

            {activeTab === 'institutions' && (
              <>
                <PartnerBenefitCard 
                  icon="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"
                  title="Institutional Collaboration"
                  description="Integrate our programs into your curriculum or offer joint certifications"
                  benefits={[
                    "White-label learning solutions",
                    "Customized training programs",
                    "Credit transfer agreements",
                    "Co-branded certifications"
                  ]}
                />
                <PartnerTestimonial 
                  quote="Our students gained industry-relevant skills through this partnership."
                  author="University of Tech, Continuing Education Dept."
                  role="Partner since 2019"
                />
              </>
            )}

            {/* Add other tab content similarly */}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Partner With Us?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                title: "Expanded Reach",
                description: "Access our global community of 500,000+ learners"
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Revenue Sharing",
                description: "Competitive revenue models with timely payouts"
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Trusted Brand",
                description: "Associate with an award-winning education platform"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-16">Partnership Impact</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "250+", label: "Active Partners" },
              { value: "$5M+", label: "Paid to Partners" },
              { value: "85%", label: "Renewal Rate" },
              { value: "4.8/5", label: "Partner Satisfaction" }
            ].map((metric, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold mb-2">{metric.value}</div>
                <div className="text-lg opacity-90">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple Partnership Process</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <ProcessStep 
              number="1" 
              title="Apply" 
              description="Submit your partnership application" 
              icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <ProcessStep 
              number="2" 
              title="Review" 
              description="We evaluate alignment within 5 business days" 
              icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
            <ProcessStep 
              number="3" 
              title="Onboard" 
              description="Complete training and setup" 
              icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
            <ProcessStep 
              number="4" 
              title="Launch" 
              description="Start collaborating and growing together" 
              icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

// Reusable Components
const PartnerBenefitCard = ({ icon, title, description, benefits }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full">
    <div className="flex items-center mb-6">
      <div className="bg-blue-100 p-3 rounded-lg mr-4">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}></path>
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 mb-6">{description}</p>
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {benefit}
        </li>
      ))}
    </ul>
  </div>
);

const PartnerTestimonial = ({ quote, author, role }) => (
  <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 h-full flex flex-col justify-center">
    <blockquote className="text-lg italic text-gray-700 mb-6">"{quote}"</blockquote>
    <div className="font-semibold text-blue-800">{author}</div>
    <div className="text-sm text-blue-600">{role}</div>
  </div>
);

const ProcessStep = ({ number, title, description, icon }) => (
  <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
      {number}
    </div>
    {icon && (
      <svg className="w-8 h-8 text-blue-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}></path>
      </svg>
    )}
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default PartnershipPrograms;