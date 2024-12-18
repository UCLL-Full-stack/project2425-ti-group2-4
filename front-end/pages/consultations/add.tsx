import AddConsultationForm from '@components/consultations/addConsultationForm';
import Header from '@components/general/header';
import React from 'react';

const AddConsultationPage: React.FC = () => {
  return (
    <>
    <Header /><div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl text-center font-semibold mb-6">Add New Consultation</h1>
          <AddConsultationForm />
      </div>
    </>
  );
};

export default AddConsultationPage;
