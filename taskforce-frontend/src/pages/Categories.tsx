import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Food & Dining',
      subcategories: ['Groceries', 'Restaurants', 'Fast Food', 'Coffee Shops'],
      color: 'blue',
    },
    {
      id: 2,
      name: 'Transportation',
      subcategories: ['Fuel', 'Public Transport', 'Car Maintenance', 'Parking'],
      color: 'green',
    },
    {
      id: 3,
      name: 'Entertainment',
      subcategories: ['Movies', 'Games', 'Sports', 'Events'],
      color: 'purple',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    subcategories: '',
  });

  const [editingSubcategory, setEditingSubcategory] = useState<{
    categoryId: number;
    subcategoryIndex: number;
    value: string;
  } | null>(null);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategoryData = {
      id: categories.length + 1,
      name: newCategory.name,
      subcategories: newCategory.subcategories.split(',').map((s) => s.trim()),
      color: 'blue', // Default color, you can customize this
    };
    setCategories([...categories, newCategoryData]);
    setShowAddForm(false);
    setNewCategory({ name: '', subcategories: '' });
  };

  const handleEditSubcategory = (categoryId: number, subcategoryIndex: number, value: string) => {
    setEditingSubcategory({ categoryId, subcategoryIndex, value });
  };

  const handleUpdateSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubcategory) {
      const updatedCategories = categories.map((category) => {
        if (category.id === editingSubcategory.categoryId) {
          const updatedSubcategories = [...category.subcategories];
          updatedSubcategories[editingSubcategory.subcategoryIndex] = editingSubcategory.value;
          return { ...category, subcategories: updatedSubcategories };
        }
        return category;
      });
      setCategories(updatedCategories);
      setEditingSubcategory(null);
    }
  };

  const handleDeleteSubcategory = (categoryId: number, subcategoryIndex: number) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        const updatedSubcategories = category.subcategories.filter((_, index) => index !== subcategoryIndex);
        return { ...category, subcategories: updatedSubcategories };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const handleDeleteCategory = (categoryId: number) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Category
        </button>
      </div>

      {/* Add Category Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div>
                <label htmlFor="subcategories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subcategories (comma-separated)
                </label>
                <input
                  type="text"
                  id="subcategories"
                  value={newCategory.subcategories}
                  onChange={(e) => setNewCategory({ ...newCategory, subcategories: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Groceries, Restaurants, Fast Food"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subcategory Modal */}
      {editingSubcategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Subcategory</h2>
            <form onSubmit={handleUpdateSubcategory} className="space-y-4">
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  id="subcategory"
                  value={editingSubcategory.value}
                  onChange={(e) =>
                    setEditingSubcategory({ ...editingSubcategory, value: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingSubcategory(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                    title="Delete"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Subcategories</h4>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((subcategory, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {subcategory}
                      </span>
                      <button
                        className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        onClick={() =>
                          handleEditSubcategory(category.id, index, subcategory)
                        }
                        title="Edit Subcategory"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                        onClick={() => handleDeleteSubcategory(category.id, index)}
                        title="Delete Subcategory"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}