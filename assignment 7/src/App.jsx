import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    skills: [],
    profilePic: null,
    previewUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skillsList = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python'];

  useEffect(() => {
    const savedData = localStorage.getItem('candidateData');
    if (savedData) {
      setSubmittedData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            profilePic: file,
            previewUrl: reader.result
          }));
        };
        reader.readAsDataURL(file);
      }
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (formData.email.split('@').length !== 2 || formData.email.split('.').length < 2) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    if (formData.skills.length < 2) {
      newErrors.skills = 'Select at least 2 skills';
    }
    
    if (!formData.profilePic) {
      newErrors.profilePic = 'Profile picture is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        ...formData,
        profilePic: formData.previewUrl
      };
      
      const updatedData = [...submittedData, newEntry];
      setSubmittedData(updatedData);
      localStorage.setItem('candidateData', JSON.stringify(updatedData));
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        skills: [],
        profilePic: null,
        previewUrl: ''
      });
      
      setIsSubmitting(false);
    }, 500);
  };

  const handleDelete = (id) => {
    const updatedData = submittedData.filter(entry => entry.id !== id);
    setSubmittedData(updatedData);
    localStorage.setItem('candidateData', JSON.stringify(updatedData));
  };

  return (
    <div className="app">
      <h1>Candidate Registration</h1>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
        
        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Phone*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? 'error' : ''}
            maxLength="10"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
        
        <div className="form-group">
          <label>Gender*</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleInputChange}
              />
              Other
            </label>
          </div>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>
        
        <div className="form-group">
          <label>Skills* (Select at least 2)</label>
          <div className="skills-container">
            {skillsList.map(skill => (
              <label key={skill} className="skill-checkbox">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleCheckboxChange(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
          {errors.skills && <span className="error-message">{errors.skills}</span>}
        </div>
        
        <div className="form-group">
          <label>Profile Picture*</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className={errors.profilePic ? 'error' : ''}
          />
          {errors.profilePic && <span className="error-message">{errors.profilePic}</span>}
          
          {formData.previewUrl && (
            <div className="image-preview">
              <img src={formData.previewUrl} alt="Preview" />
            </div>
          )}
        </div>
        
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      
      {submittedData.length > 0 && (
        <div className="submitted-data">
          <h2>Submitted Entries</h2>
          <div className="entries-container">
            {submittedData.map(entry => (
              <div key={entry.id} className="entry-card">
                <div className="entry-header">
                  <h3>{entry.fullName}</h3>
                  <button 
                    onClick={() => handleDelete(entry.id)}
                    className="delete-btn"
                    aria-label="Delete entry"
                  >
                    ×
                  </button>
                </div>
                <p><strong>Email:</strong> {entry.email}</p>
                <p><strong>Phone:</strong> {entry.phone}</p>
                <p><strong>Gender:</strong> {entry.gender}</p>
                <p><strong>Skills:</strong> {entry.skills.join(', ')}</p>
                {entry.previewUrl && (
                  <div className="entry-image">
                    <img src={entry.previewUrl} alt={`${entry.fullName}'s profile`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;