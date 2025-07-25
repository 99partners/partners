import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import CategoryFilter from "../components/CategoryFilter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from 'react-helmet-async';

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from MongoDB
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.99partners.in/api/blogs");
      setBlogPosts(res.data);

      // Extract categories from blog data
      const cats = [...new Set(res.data.map((b) => b.category))];
      setCategories(["All", ...cats]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Refresh blogs when component comes into focus (e.g., when navigating back)
  useEffect(() => {
    const handleFocus = () => {
      fetchBlogs();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>99Partners Blogs – Insights & Innovations in Digital Commerce, IT, Finance, Wellness</title>
        <meta name="description" content="Read the latest insights, trends, and innovations from 99Partners across digital commerce, IT, finance, and spiritual wellness. Stay ahead with expert articles and updates." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="99Partners Blogs – Insights & Innovations" />
        <meta property="og:description" content="Expert insights and updates from 99Partners: digital commerce, IT, finance, and wellness." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.99partners.in/blogs" />
        <meta property="og:image" content="https://www.99partners.com/images/og-image.jpg" />
        <meta property="og:site_name" content="99Partners" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@99Partners" />
        <meta name="twitter:title" content="99Partners Blogs – Insights & Innovations" />
        <meta name="twitter:description" content="Expert insights and updates from 99Partners: digital commerce, IT, finance, and wellness." />
        <meta name="twitter:image" content="https://www.99partners.com/images/twitter-card-image.jpg" />
        <meta name="keywords" content="99Partners, blogs, insights, digital commerce, ecommerce, IT services, financial advisory, spiritual wellness, AI, business consulting, SME loans, yoga, business partnerships" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
        <Header />

        <main className="pt-20">
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white fade-in-up">
                  Insights Across Our{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Domains
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground dark:text-neutral-300 fade-in-up stagger-1">
                  Dive into the latest ideas, insights, and innovations from each
                  of our core business sectors. Stay informed, stay ahead.
                </p>
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              {/* Blog Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-card border rounded-xl p-6 animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                  {filteredPosts.map((post, index) => (
                    <div
                      key={post._id}
                      className="bg-card border rounded-xl p-6 glass fade-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground dark:text-neutral-300 text-lg">
                    No posts found in this category.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blogs;
