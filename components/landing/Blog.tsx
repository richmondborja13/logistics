/*
============================================================
Blog Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Blog section for the landing page.
- Uses Tailwind CSS for layout and styling.
- Displays a list of blog posts from the 'blogPosts' array.
- To add or update blog posts, edit the 'blogPosts' array.
- To change layout or content, edit the JSX in the Blog component.

Back-end Follow Through:
- If dynamic blog posts are needed, replace the array with API calls or props.
- For blog navigation, ensure the links match the blog routing structure.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The Blog section can be reused or extended for a full blog page.
- For additional integration, see README or API documentation.
*/
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import AnimatedSection from '@/components/landing/AnimatedSection';

const blogPosts = [
  {
    title: 'The Future of Supply Chain: AI and Automation',
    excerpt: 'Discover how artificial intelligence and automation are revolutionizing the logistics industry.',
    image: '/images/blog/ai-logistics.png',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Technology',
  },
  {
    title: 'Sustainable Logistics: Going Green in 2024',
    excerpt: 'Learn about eco-friendly practices and sustainable solutions in modern logistics.',
    image: '/images/blog/sustainable-logistics.png',
    date: '2024-03-10',
    readTime: '4 min read',
    category: 'Sustainability',
  },
  {
    title: 'Optimizing Last-Mile Delivery',
    excerpt: 'Strategies and technologies for improving the final leg of the delivery process.',
    image: '/images/blog/last-mile.png',
    date: '2024-03-05',
    readTime: '6 min read',
    category: 'Operations',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, trends, and best practices in logistics and supply chain
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.title} delay={index * 140}>
              <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
} 