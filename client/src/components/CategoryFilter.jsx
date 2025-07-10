const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const gradientMap = {
    All: "from-purple-600 to-indigo-600",
    "Digital Commerce": "from-green-500 to-emerald-600",
    "IT & Marketing": "from-blue-500 to-indigo-600",
    "Financial Services": "from-purple-500 to-fuchsia-600",
    "Spiritual Ecosystem": "from-orange-500 to-amber-600",
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const gradient = gradientMap[category] || "from-purple-600 to-indigo-600";

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              isActive
                ? `bg-gradient-to-r ${gradient} text-white`
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
