import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Heart, 
  Activity, 
  Shield, 
  Smile, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Award
} from 'lucide-react';
import { mockAwarenessData } from '../data/mockData';

function Awareness() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('benefits');

  const iconMap = {
    Activity,
    Heart,
    Shield,
    Smile,
    Users,
    Clock,
    Award
  };

  const sections = [
    { id: 'benefits', title: 'Benefits of Donating', icon: Heart },
    { id: 'myths', title: 'Myths vs Facts', icon: Info },
    { id: 'statistics', title: 'Statistics', icon: TrendingUp },
    { id: 'faqs', title: 'Frequently Asked Questions', icon: AlertTriangle }
  ];

  return (
    <div className="content-section py-8 page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Blood Donation Awareness</h1>
        <p className="text-gray-600 max-w-3xl">
          Learn about the importance of blood donation, understand the facts, and discover how your contribution 
          can make a significant impact on saving lives in your community and beyond.
        </p>
      </div>

      {/* Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {sections.map(section => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'outline'}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center ${
                activeSection === section.id ? 'bg-red-600 hover:bg-red-700' : ''
              }`}
            >
              <section.icon className="w-4 h-4 mr-2" />
              {section.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      {activeSection === 'benefits' && (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Benefits of Blood Donation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Blood donation doesn't just help recipients - it also provides numerous health benefits to donors. 
              Here's how giving blood can benefit your own health and well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockAwarenessData.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon];
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-red-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
            <CardContent className="p-8">
              <div className="text-center">
                <Heart className="w-16 h-16 mx-auto text-red-600 mb-4" />
                <h3 className="text-xl font-bold mb-4">Ready to Experience These Benefits?</h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of regular donors who have made blood donation a part of their healthy lifestyle.
                </p>
                <Button className="bg-red-600 hover:bg-red-700">
                  Find a Donation Center
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Myths vs Facts Section */}
      {activeSection === 'myths' && (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Myths vs Facts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              There are many misconceptions about blood donation. Let's separate fact from fiction 
              and address some of the most common myths that prevent people from becoming donors.
            </p>
          </div>

          <div className="space-y-6">
            {mockAwarenessData.myths.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="bg-red-50 dark:bg-red-900/20 p-6 flex items-start space-x-3">
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">MYTH</h3>
                        <p className="text-red-700 dark:text-red-300">{item.myth}</p>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">FACT</h3>
                        <p className="text-green-700 dark:text-green-300">{item.fact}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Have More Questions?
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 mb-4">
                    Don't let myths and misconceptions prevent you from saving lives. 
                    Speak with healthcare professionals at donation centers who can provide accurate information.
                  </p>
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
                    Contact Us for More Info
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Statistics Section */}
      {activeSection === 'statistics' && (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Blood Donation Statistics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding the numbers behind blood donation helps illustrate the critical need 
              for regular donors and the impact each donation makes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockAwarenessData.statistics.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                  <div className="font-semibold text-lg mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-red-600" />
                  Global Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Blood Collection Rate</span>
                      <span className="text-sm font-medium">3%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '3%' }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Only 3% of eligible population donates blood annually</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Target Collection Rate</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">WHO recommends 5% for adequate blood supply</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-red-600" />
                  Time & Frequency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">10 min</div>
                    <div className="text-sm text-gray-600">Donation time</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">56 days</div>
                    <div className="text-sm text-gray-600">Between donations</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">6 times</div>
                    <div className="text-sm text-gray-600">Max per year</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">450 ml</div>
                    <div className="text-sm text-gray-600">Blood per donation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {activeSection === 'faqs' && (
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to the most common questions about blood donation. 
              If you don't find what you're looking for, feel free to contact us.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {mockAwarenessData.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Still Have Questions?
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 mb-4">
                    Our team of healthcare professionals is available to answer any specific questions 
                    you may have about blood donation eligibility, process, or health concerns.
                  </p>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
                      Contact Support
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700">
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Awareness;