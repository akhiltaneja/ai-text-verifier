
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, FileText, Images, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const ContentEditor: React.FC = () => {
  const [articles, setArticles] = useState([
    { id: 1, title: 'How does AI generated content effect the SEO of your website?', status: 'Published', date: '2023-04-15' },
    { id: 2, title: 'AI Generated Content is pure robbery.', status: 'Published', date: '2023-04-10' },
    { id: 3, title: 'How do content writers generate AI Content, which tools are used.', status: 'Published', date: '2023-04-05' },
    { id: 4, title: 'How to detect AI Content, which tools to use?', status: 'Published', date: '2023-03-28' },
    { id: 5, title: 'How does aitextverifier detect AI Content.', status: 'Published', date: '2023-03-22' },
    { id: 6, title: 'How to generate AI content. Which tools to use.', status: 'Published', date: '2023-03-15' },
    { id: 7, title: 'The future of content creation with AI', status: 'Draft', date: '2023-04-18' },
  ]);

  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentArticleId, setCurrentArticleId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('articles');

  const handleCreateArticle = () => {
    if (!newArticleTitle.trim()) {
      toast.error('Please provide a title for the article');
      return;
    }

    if (editMode && currentArticleId) {
      // Update existing article
      setArticles(articles.map(article => 
        article.id === currentArticleId 
          ? { ...article, title: newArticleTitle, date: new Date().toISOString().split('T')[0] }
          : article
      ));
      toast.success('Article updated successfully');
      setEditMode(false);
      setCurrentArticleId(null);
    } else {
      // Create new article
      setArticles([
        ...articles,
        {
          id: Date.now(), // Use timestamp for unique ID
          title: newArticleTitle,
          status: 'Draft',
          date: new Date().toISOString().split('T')[0]
        }
      ]);
      toast.success('New article created successfully');
    }
    
    setNewArticleTitle('');
    setNewArticleContent('');
    setActiveTab('articles');
  };

  const handleEditArticle = (id: number) => {
    const articleToEdit = articles.find(article => article.id === id);
    if (articleToEdit) {
      setNewArticleTitle(articleToEdit.title);
      setNewArticleContent(''); // In a real app, you'd load the content from your backend
      setEditMode(true);
      setCurrentArticleId(id);
      setActiveTab('create');
    }
  };

  const handleDeleteArticle = (id: number) => {
    // Confirm before deleting
    const confirmed = window.confirm('Are you sure you want to delete this article?');
    
    if (confirmed) {
      setArticles(articles.filter(article => article.id !== id));
      toast.success('Article deleted successfully');
      
      // If the deleted article was being edited, reset the form
      if (currentArticleId === id) {
        setEditMode(false);
        setCurrentArticleId(null);
        setNewArticleTitle('');
        setNewArticleContent('');
      }
    }
  };

  const handlePreviewArticle = (id: number) => {
    const article = articles.find(article => article.id === id);
    if (article) {
      toast.info(`Viewing preview of: ${article.title}`);
      // In a real app, you'd navigate to a preview page or show a modal
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Content Management</h2>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle>Blog Articles</CardTitle>
              <CardDescription>Manage your blog content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>{article.status}</TableCell>
                        <TableCell>{article.date}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditArticle(article.id)}
                            title="Edit article"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handlePreviewArticle(article.id)}
                            title="Preview article"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteArticle(article.id)}
                            title="Delete article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>{editMode ? 'Edit Article' : 'Create New Article'}</CardTitle>
              <CardDescription>
                {editMode 
                  ? 'Update your existing article' 
                  : 'Write and publish a new blog article'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    placeholder="Enter article title" 
                    value={newArticleTitle}
                    onChange={(e) => setNewArticleTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea 
                    id="content"
                    placeholder="Write your article content here..." 
                    className="min-h-[200px]"
                    value={newArticleContent}
                    onChange={(e) => setNewArticleContent(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button onClick={handleCreateArticle}>
                    {editMode ? 'Update Article' : 'Create Article'}
                  </Button>
                  {editMode && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditMode(false);
                        setCurrentArticleId(null);
                        setNewArticleTitle('');
                        setNewArticleContent('');
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
