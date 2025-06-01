import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardBody } from '../common/Card';
import Button from '../common/Button';
import { Link, Check } from 'lucide-react';

const PageSelector: React.FC = () => {
  const { pages, connectPage, selectedPage, isLoading } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pages.map((page) => (
        <Card 
          key={page.id}
          hoverable
          selected={selectedPage?.id === page.id}
          onClick={() => !page.isConnected && !isLoading && connectPage(page)}
          className={page.isConnected ? 'opacity-75' : ''}
        >
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={page.picture} 
              alt={page.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <CardBody>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{page.name}</h3>
                <p className="text-sm text-gray-500">{page.category}</p>
              </div>
              
              {page.isConnected && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <Check size={12} className="mr-1" />
                  Connected
                </span>
              )}
            </div>
            
            {!page.isConnected ? (
              <Button 
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => connectPage(page)}
                isLoading={isLoading && selectedPage?.id === page.id}
                icon={<Link size={16} />}
              >
                Connect Page
              </Button>
            ) : (
              <p className="text-sm text-gray-600 mt-2">
                This page is connected and ready to be managed
              </p>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default PageSelector;