import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Heart, 
  Users, 
  Clock, 
  Shield, 
  ChevronLeft, 
  ChevronRight,
  Award,
  Activity,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Github
} from 'lucide-react';

function Home() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: 'Save Lives Through Blood Donation',
      description: 'Every 2 seconds, someone needs blood. Your donation can save up to 3 lives.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop'
    },
    {
      title: 'Join Our Life-Saving Mission',
      description: 'Be a hero in someone\'s story. Donate blood and give the gift of life.',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop'
    },
    {
      title: 'Community of Heroes',
      description: 'Join thousands of donors making a difference in our community.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop'
    },
    {
      title: 'Safe and Professional',
      description: 'State-of-the-art facilities ensuring safe and comfortable donation experience.',
      image: 'https://images.unsplash.com/photo-1559757151-4511ca796c22?w=800&h=400&fit=crop'
    },
    {
      title: 'Emergency Blood Supply',
      description: 'Maintain critical blood reserves for emergencies and medical procedures.',
      image: 'https://images.unsplash.com/photo-1559757173-9d7e159801c5?w=800&h=400&fit=crop'
    }
  ];

  const whyDonateReasons = [
    {
      icon: Heart,
      title: 'Save Lives',
      description: 'One donation can save up to 3 lives in emergency situations.'
    },
    {
      icon: Users,
      title: 'Help Community',
      description: 'Support your local community and help those in urgent need.'
    },
    {
      icon: Shield,
      title: 'Health Benefits',
      description: 'Regular donation can help reduce risk of heart disease and cancer.'
    },
    {
      icon: Award,
      title: 'Feel Good',
      description: 'Experience the satisfaction of making a real difference in someone\'s life.'
    }
  ];

  const bloodFacts = [
    { label: 'Donors Registered', value: '10,000+', icon: Users },
    { label: 'Lives Saved', value: '25,000+', icon: Heart },
    { label: 'Donation Centers', value: '150+', icon: Globe },
    { label: 'Years of Service', value: '15+', icon: Clock }
  ];

  const bloodGroups = [
    { group: 'A+', canGiveTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
    { group: 'A-', canGiveTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
    { group: 'B+', canGiveTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
    { group: 'B-', canGiveTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
    { group: 'AB+', canGiveTo: ['AB+'], canReceiveFrom: ['All'] },
    { group: 'AB-', canGiveTo: ['AB+', 'AB-'], canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'] },
    { group: 'O+', canGiveTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'] },
    { group: 'O-', canGiveTo: ['All'], canReceiveFrom: ['O-'] }
  ];

  const teamMembers = [
    {
      name: 'Vineeth Kumar Reddy',
      role: 'Team Lead',
      image: 'https://res.cloudinary.com/de2zkebhu/image/upload/v1760244442/tonyprofile-removebg-preview_ks9xiz.png',
      phone: '7207854386',
      email: 'vineethreddy017@gmail.com',
      github: 'https://github.com/vinni8871',
      linkedin: 'https://www.linkedin.com/in/vineeth-kumar-reddy-pasala/',
      description: 'Vineeth managed both the frontend and backend development of the project, ensuring seamless integration between the user interface and server-side operations. His leadership, technical expertise, and coordination played a vital role in driving the project to completion.'
    },
    {
      name: 'ABHISEKHAR REDDY',
      role: 'Developer',
      image: 'https://res.cloudinary.com/da94yj8b8/image/upload/f_auto,q_auto/abhi_pic_rdgei3',
      phone: '9494412903',
      email: 'kothapalliabhisekharreddy32@gmail.com',
      linkedin: 'www.linkedin.com/in/abhisekhar-reddykothapalli-283b062a6',
      description: 'ABHISEKHAR REDDY contributed significantly to the database layer of the project by designing tables, structuring relationships, and writing efficient SQL queries. His work ensured the project\'s data was well-organized, reliable, and optimized for performance.'
    },
  
  ];

  const [hoveredTeamIndex, setHoveredTeamIndex] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(217, 4, 41, 0.7), rgba(217, 4, 41, 0.7)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="hero-content h-full flex items-center">
                <div className="text-white max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/become-donor">
                      <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                        {t('hero.cta')}
                      </Button>
                    </Link>
                    <Link to="/awareness">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                        {t('hero.learnMore')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Blood Facts Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="content-section">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {bloodFacts.map((fact, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <fact.icon className="w-12 h-12 mx-auto mb-4 text-red-600" />
                  <div className="text-3xl font-bold text-red-600 mb-2">{fact.value}</div>
                  <div className="text-sm text-gray-600">{fact.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16">
        <div className="content-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Donate Blood?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Blood donation is a simple act of kindness that can save multiple lives. Here's why your donation matters.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyDonateReasons.map((reason, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <reason.icon className="w-16 h-16 mx-auto mb-4 text-red-600" />
                  <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Compatibility Table */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="content-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Blood Compatibility Chart</h2>
            <p className="text-gray-600">Understanding blood group compatibility for safe donation and transfusion</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodGroups.map((group, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-center">
                    <Badge variant="outline" className="text-2xl font-bold px-4 py-2 bg-red-600 text-white">
                      {group.group}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Can Give To:</h4>
                      <div className="flex flex-wrap gap-1">
                        {group.canGiveTo.map((bg, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {bg}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">Can Receive From:</h4>
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(group.canReceiveFrom) ? (
                          group.canReceiveFrom.map((bg, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {bg}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            {group.canReceiveFrom}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="content-section">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600">Meet the dedicated individuals behind this life-saving initiative</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto justify-items-center">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredTeamIndex(index)}
                onMouseLeave={() => setHoveredTeamIndex(null)}
              >
                <CardContent className="p-6 text-center" style={{ position: 'relative', minHeight: 320 }}>
                  {/* Special badge for Akhil */}
                  {member.name === 'Akhil Duddi' && (
                    <div style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', width: 0, height: 0 }}>
                      {/* triangle using borders with increased size and border radius */}
                      <div style={{ 
                        width: 0, 
                        height: 0, 
                        borderTop: '80px solid #dc2626', 
                        borderRight: '80px solid transparent',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px'
                      }} />
                      {/* rotated label over the triangle */}
                      <div style={{ 
                        position: 'absolute', 
                        left: '25px', 
                        top: '25px', 
                        transform: 'translate(-50%, -50%) rotate(-45deg)', 
                        transformOrigin: 'center center', 
                        color: '#fff', 
                        fontSize: 9, 
                        fontWeight: 700, 
                        letterSpacing: '0px', 
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        lineHeight: '0.9',
                        width: '30px',
                        textAlign: 'center',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <div>Special</div>
                        <div>Thanks</div>
                      </div>
                    </div>
                  )}
                  <div style={{ perspective: '1000px', height: '100%' }}>
                    <div
                      style={{
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                        transform: hoveredTeamIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      {/* Front */}
                      <div style={{ backfaceVisibility: 'hidden' }}>
                        <div className="relative mb-6">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-red-600"
                          />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                        <p className="text-red-600 font-medium mb-4">{member.role}</p>
                      </div>

                      {/* Back */}
                      <div
                        style={{
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden',
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '1rem'
                        }}
                      >
                        <div className="text-center">
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{member.description || 'Team member'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Always-visible social icons */}
                  <div className="flex justify-center space-x-3 mt-4">
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Phone className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Mail className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Linkedin className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Github className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="content-section text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of heroes and make a difference today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/become-donor">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Become a Donor
              </Button>
            </Link>
            <Link to="/donors">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                Find Donors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;