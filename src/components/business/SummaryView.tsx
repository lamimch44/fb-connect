import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBusiness } from '../../context/BusinessContext';
import Card, { CardBody, CardHeader } from '../common/Card';
import { Building2, Globe, Briefcase, Target, CheckCircle2, Key } from 'lucide-react';

const SummaryView: React.FC = () => {
  const { selectedPage } = useAuth();
  const { businessInfo } = useBusiness();
  
  if (!selectedPage || !businessInfo) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Complete!</h2>
        <p className="text-gray-600">
          Your Facebook page is now connected and your business information is ready.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Connected Facebook Page</h3>
          </CardHeader>
          
          <CardBody>
            <div className="flex items-start">
              <img
                src={selectedPage.picture}
                alt={selectedPage.name}
                className="w-20 h-20 rounded-md object-cover mr-4"
              />
              
              <div>
                <h4 className="font-medium text-gray-900">{selectedPage.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{selectedPage.category}</p>
                
                <div className="bg-green-100 text-green-800 text-xs inline-flex items-center px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 size={12} className="mr-1" />
                  Connected
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Business Information</h3>
          </CardHeader>
          
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-start">
                <Building2 size={18} className="text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Company Name</p>
                  <p className="font-medium text-gray-900">{businessInfo.companyName}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Briefcase size={18} className="text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Business Type</p>
                  <p className="font-medium text-gray-900">{businessInfo.businessType}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-gray-400 mr-2 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium text-gray-900">{businessInfo.industry}</p>
                </div>
              </div>
              
              {businessInfo.website && (
                <div className="flex items-start">
                  <Globe size={18} className="text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a href={businessInfo.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-800">
                      {businessInfo.website}
                    </a>
                  </div>
                </div>
              )}
              
              {businessInfo.targetAudience && (
                <div className="flex items-start">
                  <Target size={18} className="text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Target Audience</p>
                    <p className="font-medium text-gray-900">{businessInfo.targetAudience}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <Key size={18} className="text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">ChatGPT API Key</p>
                  <p className="font-medium text-gray-900">••••••••{businessInfo.chatGptApiKey.slice(-4)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-700">{businessInfo.description}</p>
              </div>
              
              {businessInfo.products.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Products</p>
                  <div className="flex flex-wrap gap-2">
                    {businessInfo.products.map((product, index) => (
                      <span 
                        key={`product-${index}`} 
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {businessInfo.services.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {businessInfo.services.map((service, index) => (
                      <span 
                        key={`service-${index}`} 
                        className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SummaryView;