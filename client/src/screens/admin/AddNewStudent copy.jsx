import React, { useState } from 'react';

const MyForm = () => {
  // State to store name and checkbox data
  const [formData, setForm] = useState({
    name: '',
    subjects: [],
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      subjects: prevData.subjects.includes(value)
        ? prevData.subjects.filter((checkbox) => checkbox !== value)
        : [...prevData.subjects, value],
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the formData (e.g., send it to a server)
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>

      <div>
        <label>
          Checkbox 1
          <input
            type="checkbox"
            name="subjects"
            value="checkbox1"
            checked={formData.subjects.includes('checkbox1')}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>

      <div>
        <label>
          Checkbox 2
          <input
            type="checkbox"
            name="subjects"
            value="checkbox2"
            checked={formData.subjects.includes('checkbox2')}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>

      {/* Add more subjects as needed */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
