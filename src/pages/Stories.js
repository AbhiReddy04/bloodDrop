import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Heart, 
  Clock, 
  BookOpen, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  User,
  Calendar
} from 'lucide-react';
import { mockStories } from '../data/mockData';

function Stories() {
  const { t } = useLanguage();
  const [selectedStory, setSelectedStory] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Donor Story', 'Recipient Story', 'Community Story'];

  const filteredStories = selectedCategory === 'All' 
    ? mockStories 
    : mockStories.filter(story => story.category === selectedCategory);

  const handleReadStory = (story) => {
    setSelectedStory(story);
    setShowStoryModal(true);
  };

  const handleShare = (story, platform) => {
    const url = window.location.href;
    const text = `Check out this inspiring blood donation story: "${story.title}"`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="content-section py-8 page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Blood Donation Stories</h1>
        <p className="text-gray-600 max-w-3xl">
          Real stories from donors and recipients that showcase the incredible impact of blood donation. 
          These personal accounts highlight how a simple act of giving can transform lives and create lasting connections in our community.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredStories.map(story => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative">
              <img
                src={story.thumbnail}
                alt={story.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white/90 text-gray-800">
                  {story.category}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg group-hover:text-red-600 transition-colors">
                {story.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {story.excerpt}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{story.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{story.readTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {story.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {story.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{story.tags.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center">
                <Button
                  size="sm"
                  onClick={() => handleReadStory(story)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Story
                </Button>
                
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleShare(story, 'facebook')}
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleShare(story, 'twitter')}
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleShare(story, 'linkedin')}
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Section */}
      <section className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-8 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Share Your Story</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have you been touched by blood donation? Whether you're a donor, recipient, or someone whose life was impacted, 
            we'd love to share your story to inspire others.
          </p>
          <Button className="bg-red-600 hover:bg-red-700">
            <Heart className="w-4 h-4 mr-2" />
            Submit Your Story
          </Button>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">150+</div>
            <div className="text-sm text-gray-600">Stories Shared</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
            <div className="text-sm text-gray-600">Lives Impacted</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
            <div className="text-sm text-gray-600">Communities Reached</div>
          </CardContent>
        </Card>
      </section>

      {/* Story Reading Modal */}
      <Dialog open={showStoryModal} onOpenChange={setShowStoryModal}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedStory && (
            <>
              <DialogHeader>
                <div className="space-y-4">
                  <img
                    src={selectedStory.thumbnail}
                    alt={selectedStory.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {selectedStory.category}
                    </Badge>
                    <DialogTitle className="text-2xl font-bold">
                      {selectedStory.title}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500 border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{selectedStory.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedStory.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedStory.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare(selectedStory, 'facebook')}
                    >
                      <Facebook className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare(selectedStory, 'twitter')}
                    >
                      <Twitter className="w-4 h-4 mr-1" />
                      Tweet
                    </Button>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {selectedStory.content.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    )
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedStory.tags.map(tag => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Stories;