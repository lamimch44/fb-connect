import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { useOnboarding } from '../../context/OnboardingContext';
import Button from '../common/Button';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Card, { CardBody, CardFooter } from '../common/Card';
import { Bot, Key, Brain, Sparkles, MessageSquare, Sliders, BookOpen } from 'lucide-react';
import { BusinessInfo } from '../../types';
import axios from 'axios';

const BusinessInfoForm: React.FC = () => {
  const { saveBusinessInfo, isSubmitting } = useBusiness();
  const { setStep } = useOnboarding();
  
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    agentName: '',
    agentRole: '',
    industry: '',
    description: '',
    personality: '',
    knowledgeBase: [],
    responseStyle: '',
    chatGptApiKey: '',
    temperature: 0.7,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessInfo, string>>>({});
  const [knowledgeInput, setKnowledgeInput] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo((prev) => ({
      ...prev,
      [name]: name === 'temperature' || name === 'maxTokens' ? parseFloat(value) : value,
    }));
    
    if (errors[name as keyof BusinessInfo]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const handleKnowledgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKnowledgeInput(e.target.value);
  };
  
  const addKnowledge = () => {
    if (knowledgeInput.trim()) {
      setBusinessInfo((prev) => ({
        ...prev,
        knowledgeBase: [...prev.knowledgeBase, knowledgeInput.trim()],
      }));
      setKnowledgeInput('');
    }
  };
  
  const removeKnowledge = (index: number) => {
    setBusinessInfo((prev) => ({
      ...prev,
      knowledgeBase: prev.knowledgeBase.filter((_, i) => i !== index),
    }));
  };
  
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BusinessInfo, string>> = {};
    
    if (!businessInfo.agentName) {
      newErrors.agentName = 'Agent name is required';
    }


    if (!businessInfo.description) {
      newErrors.description = 'Description is required';
    } else if (businessInfo.description.length < 50) {
      newErrors.description = 'Description should be at least 50 characters';
    }
    

    if (!businessInfo.chatGptApiKey) {
      newErrors.chatGptApiKey = 'ChatGPT API key is required';
    } else if (!businessInfo.chatGptApiKey.startsWith('sk-')) {
      newErrors.chatGptApiKey = 'Invalid ChatGPT API key format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Token not found! Please log in.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:4000/api/ai/create/assistant",
      businessInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Assistant created:", response.data);

    saveBusinessInfo(businessInfo); // optional if needed for local context
    setStep("summary");
  } catch (err: any) {
    console.error("Request failed:", err.response?.data || err.message);
    alert("Failed to create assistant. Please try again.");
  }
};
  
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardBody>
            <div>
              <Input
                label="AI Assistant Name"
                name="assistantName"
                value={businessInfo.assistantName}
                onChange={handleChange}
                placeholder="e.g., SalesBot, CustomerService AI"
                fullWidth
                error={errors.assistantName}
                leftIcon={<Bot size={18} className="text-gray-400" />}
              />
            </div>
            
          

          
          <TextArea
            label="Assistant Description"
            name="description"
            value={businessInfo.description}
            onChange={handleChange}
            placeholder="Describe your AI assistant's purpose, capabilities, and how it should interact with users..."
            rows={4}
            fullWidth
            error={errors.description}
            helperText="Minimum 50 characters"
          />
          
  
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Input
                label="Temperature"
                name="temperature"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={businessInfo.temperature}
                onChange={handleChange}
                fullWidth
                leftIcon={<Sliders size={18} className="text-gray-400" />}
                helperText={`Current: ${businessInfo.temperature} (Higher = more creative, Lower = more focused)`}
              />
            </div>
            
  
          </div>

          <div className="mt-4">
            <Input
              label="ChatGPT API Key"
              name="chatGptApiKey"
              type="password"
              value={businessInfo.chatGptApiKey}
              onChange={handleChange}
              placeholder="sk-..."
              fullWidth
              error={errors.chatGptApiKey}
              leftIcon={<Key size={18} className="text-gray-400" />}
              helperText="Your OpenAI API key for AI-powered features"
            />
          </div>
        </CardBody>
        
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
          >
            Create AI Assistant
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default BusinessInfoForm;