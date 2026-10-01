import React, { useEffect, useState } from 'react';

const EntityModal = ({ title, fields, initial, onClose, onSave }) => {
  const [form, setForm] = useState(initial || {});

  useEffect(() => {
    setForm(initial || {});
  }, [initial]);

  const update = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="ku-admin-modal-backdrop" onClick={onClose} role="presentation">
      <form className="ku-admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{title}</h2>
        {fields.map((field) => (
          <div key={field.name} className="ku-admin-field">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                value={form[field.name] ?? ''}
                onChange={(e) => update(field.name, e.target.value)}
                required={field.required}
              >
                <option value="">{field.selectPlaceholder || 'Select…'}</option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                value={form[field.name] ?? ''}
                onChange={(e) => update(field.name, e.target.value)}
                required={field.required}
              />
            ) : (
              <input
                id={field.name}
                type={field.type || 'text'}
                value={form[field.name] ?? ''}
                onChange={(e) =>
                  update(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)
                }
                required={field.required}
                readOnly={field.readOnly}
              />
            )}
            {field.name.toLowerCase().includes('url') && form[field.name] && (
              <img src={form[field.name]} alt="" className="ku-admin-thumb" style={{ marginTop: 8 }} />
            )}
          </div>
        ))}
        <div className="ku-admin-modal-actions">
          <button type="button" className="ku-btn ku-btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="ku-btn ku-btn--primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntityModal;
