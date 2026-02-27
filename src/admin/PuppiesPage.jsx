import { useCart } from '../context/cartContext';
import { formatCurrency } from '../utils/money';
import { useState } from 'react';
import puppiesApi from '../api/puppiesApi';
import LoadingSpinner from '../components/LoadingSpinner';

const PuppiesPage = () => {
  const { puppies, setPuppies, loading } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPuppyId, setEditingPuppyId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    breed: '',
    ageInWeeks: '',
    gender: '',
    price: '',
    vaccinated: false,
    dewormed: false,
    trained: false,
    bestSeller: false   
  });

  const [imageFiles, setImageFiles] = useState([]);

 const handleAddPuppy = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Text fields
  formData.append('name', form.name);
  formData.append('description', form.description);
  formData.append('breed', form.breed);
  formData.append('gender', form.gender);

  // Number fields
  formData.append('ageInWeeks', form.ageInWeeks ? Number(form.ageInWeeks) : 0);
  formData.append('price', form.price ? form.price : 0);

  // Boolean fields
  formData.append('isAvailable', form.isAvailable ? "true" : "true"); // default true for new puppy
  formData.append('vaccinated', form.vaccinated ? "true" : "false");
  formData.append('dewormed', form.dewormed ? "true" : "false");
  formData.append('trained', form.trained ? "true" : "false");
  formData.append('bestSeller', form.bestSeller ? "true" : "false");

  // Images (optional)
  imageFiles.forEach(file => formData.append('images', file));

  try {
    await puppiesApi.createPuppy(formData);

    // Refresh puppy list
    const response = await puppiesApi.getPuppies();
    setPuppies(response.data);

    // Reset form
    setForm({
      name: '',
      description: '',
      breed: '',
      ageInWeeks: '',
      gender: '',
      price: '',
      isAvailable: true,
      vaccinated: false,
      dewormed: false,
      trained: false,
      bestSeller: false
    });
    setImageFiles([]);
    setShowModal(false);

    setSuccessMessage('Puppy added successfully!');
    setTimeout(() => setSuccessMessage(''), 6000);

  } catch (error) {
    console.error('Error adding puppy:', error);
    setErrorMessage('Failed to add puppy. Please try again.');
    alert('Failed to add puppy. Please try again.');
  }
};

 const handleEditPuppy = async (e) => {
  e.preventDefault();    
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('description', form.description);
  formData.append('breed', form.breed);
  formData.append('ageInWeeks', Number(form.ageInWeeks));
  formData.append('gender', form.gender);
  formData.append('price', form.price);
  formData.append('vaccinated', form.vaccinated ? "true" : "false");
  formData.append('dewormed', form.dewormed ? "true" : "false");
  formData.append('trained', form.trained ? "true" : "false");
  formData.append('bestSeller', form.bestSeller ? "true" : "false");
  formData.append('isAvailable', form.isAvailable ? "true" : "false");

  imageFiles.forEach((file) => {
    formData.append('images', file);
  });

  try {
    await puppiesApi.updatePuppy(editingPuppyId, formData);
    const response = await puppiesApi.getPuppies();
    setPuppies(response.data);
    setForm({
      name: '',
      description: '',
      breed: '',
      ageInWeeks: '',
      gender: '',
      price: '',
      vaccinated: false,
      dewormed: false,
      trained: false,
      bestSeller: false,
      isAvailable: true
    });
    setSuccessMessage('Puppy updated successfully!');
    setTimeout(() => setSuccessMessage(''), 6000); 
    setImageFiles([]);
    setShowModal(false);
    setIsEditMode(false);
    setEditingPuppyId(null);
  } catch (error) {
    console.error('Error updating puppy:', error);
    setErrorMessage('Failed to update puppy. Please try again.');
    alert('Failed to update puppy. Please try again.');
  }
};

  const handleEditClick = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      breed: product.breed,
      ageInWeeks: product.ageInWeeks,
      gender: product.gender,
      price: product.price ,
      vaccinated: product.vaccinated,
      dewormed: product.dewormed,
      trained: product.trained,
      bestSeller: product.bestSeller
    });
    setImageFiles([]);
    setEditingPuppyId(product._id);
    setIsEditMode(true);
    setShowModal(true);
  }

  const handleDelete = async(puppyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this puppy?");
    if (!confirmDelete) return;

    try {
      await puppiesApi.deletePuppy(puppyId);
      // Remove the deleted puppy from local state
      const updatedList = puppies.filter(puppy => puppy._id !== puppyId);
      setPuppies(updatedList);
      setSuccessMessage("Puppy deleted successfully!");
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      console.error('Error deleting puppy:', error);
      setErrorMessage("Failed to delete puppy. Please try again.");
    }
  }

  if (loading) return <LoadingSpinner />;
  return(
     <div className="product-listing">
        <h1>Puppies</h1> 
        <button onClick={() => setShowModal(true)} className="add-product-button">Add Puppy</button>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{isEditMode ? "Edit Puppy" : "Add New Puppy"}</h2>
              <form onSubmit={isEditMode ? handleEditPuppy : handleAddPuppy} encType="multipart/form-data" className="add-product-form">
                <input
                  type="text"
                  placeholder="Puppy Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <textarea
                  placeholder="Breed"
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                />

                <input
                  type="number"
                  placeholder="Age in Weeks"
                  value={form.ageInWeeks}
                  onChange={(e) => setForm({ ...form, ageInWeeks: e.target.value })}
                />

                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select> 

                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={form.isAvailable}
                      onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                    />
                    Available
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={form.vaccinated}
                      onChange={(e) => setForm({ ...form, vaccinated: e.target.checked })}
                    />
                    Vaccinated
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={form.dewormed}
                      onChange={(e) => setForm({ ...form, dewormed: e.target.checked })}
                    />
                    Dewormed
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={form.trained}
                      onChange={(e) => setForm({ ...form, trained: e.target.checked })}
                    />
                    Trained
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={form.bestSeller}
                      onChange={(e) => setForm({ ...form, bestSeller: e.target.checked })}
                    />
                    Best Seller
                  </label>
                </div>

                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImageFiles(Array.from(e.target.files))}
                />

                <div className="modal-actions">
                  <button type="submit" className="add-btn">{isEditMode ? "Save Changes" : "Add Puppy"}</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="product-listing-product-grid">
          {puppies.map((puppy) => (
            <div key={puppy._id} className="product-listing-product-card">
              <img src={`${puppy.images[0]}`} alt={puppy.name} />
              <h2>{puppy.name}</h2>
              <p>{puppy.description}</p>
              <p>Age: {puppy.ageInWeeks} weeks</p>
              <p>Breed: {puppy.breed}</p>
              <p>{formatCurrency(puppy.price)}</p>             
              <button className='edit-btn' onClick={() => handleEditClick(puppy)}>
                Edit
              </button>
              <button className='delete-btn' onClick={() => handleDelete(puppy._id)}>
                Delete
              </button>
            </div>
          ))} 
        </div>
      </div>
  )
}

export default PuppiesPage;