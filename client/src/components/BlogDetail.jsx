import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import axios from "axios";
import { useState, useEffect } from "react";

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherBlogs, setOtherBlogs] = useState([]);

  useEffect(() => {
    const fetchPostAndRelated = async () => {
      try {
        // Fetch single post
        const res = await axios.get(`https://api.99partners.in/api/blogs/${id}`);
        setPost(res.data);

        // Fetch all blogs to suggest others
        const all = await axios.get(`https://api.99partners.in/api/blogs`);
        const filtered = all.data.filter((b) => b._id !== id);
        setOtherBlogs(filtered.slice(0, 3)); // limit to 3
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Unable to fetch blog");
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndRelated();
  }, [id]);

  const getCategoryColor = (cat) => {
    const map = {
      "Digital Commerce": "bg-green-100 text-green-700 border-green-200",
      "AI & IT Services": "bg-blue-100 text-blue-700 border-blue-200",
      "Financial Services": "bg-purple-100 text-purple-700 border-purple-200",
      "Spiritual Ecosystem": "bg-orange-100 text-orange-700 border-orange-200",
    };
    return map[cat] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  if (loading) return <p className="text-center pt-20">Loading blog...</p>;

  if (!post)
    return (
      <div className="text-center pt-20">
        <p>Blog not found</p>
        <Link to="/blogs" className="text-purple-600">
          ← Back to Blogs
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 text-gray-900 dark:text-white">
      <Header />

      <main className="pt-32 container mx-auto px-4 py-8 max-w-3xl">
        <img
          src={post.photo}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-block px-2 py-1 rounded border text-xs ${getCategoryColor(post.category)}`}
          >
            {post.category}
          </span>

          {post.tag && (
            <span className="inline-block px-2 py-1 rounded border text-xs bg-yellow-100 text-yellow-700 border-yellow-200">
              {post.tag}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          By {post.author} on {post.date}
        </p>

        <div
          className="prose max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </main>

      {/* Related Blogs */}
      <div className="container mx-auto px-4 py-8">
        {otherBlogs.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-6 text-center">
              More from our blog
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherBlogs.map((item) => (
                               <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="p-6">
                    <BlogCard post={item} />
                  </div>
                </div>

              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
