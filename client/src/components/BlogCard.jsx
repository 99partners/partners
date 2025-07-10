const BlogCard = ({ post }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case "Digital Commerce":
        return "bg-green-100 text-green-700 border-green-200";
      case "AI & IT Services":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Financial Services":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Spiritual Ecosystem":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-md overflow-hidden rounded-lg">
      <div className="relative overflow-hidden">
        <img
          src={post.photo || "/placeholder.jpg"} // fallback if no photo
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${getCategoryColor(post.category)}`}
          >
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.shortDescription}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>
        

        <div className="flex items-center justify-between">
          {post.tag && (
            <span className="inline-block px-2 py-1 rounded border text-xs bg-yellow-100 text-yellow-700 border-yellow-200">
              {post.tag}
            </span>
          )}
          <a
            href={`/blog/${post._id}`}
            className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200 hover:underline"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
