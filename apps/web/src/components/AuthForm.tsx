import { Button } from '@heroui/button';
import React, { useState } from 'react';

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}

interface AuthFormProps {
  title: string;
  buttonText: string;
  fields: Field[];
  onSubmit: (formData: Record<string, string>) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {};
    fields.forEach(field => {
      initialData[field.name] = '';
    });
    return initialData;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">{title}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-gray-300 text-sm font-bold mb-2">
                {field.label}:
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
                required={field.required}
              />
            </div>
          ))}
          <Button
            type="submit"
            color="secondary"
          >
            {buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
};
