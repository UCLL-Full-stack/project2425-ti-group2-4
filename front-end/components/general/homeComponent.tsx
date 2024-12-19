import { useRouter } from "next/router";
import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";

const HomeComponent: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
               {t('homeScreen.welcomeTitle')} <span className="text-blue-600">ClinicaLink</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('homeScreen.welcomeText')}
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
                    onClick={() => {router.push("/login/signup")}}>
             {t('homeScreen.getStarted')}
            </button>
          </div>
              <div className="container mx-auto px-6 py-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {t('homeScreen.features.schedulingTitle')}
              </h2>
              <p className="text-gray-600">
              {t('homeScreen.features.schedulingText')}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {t('homeScreen.features.patientManagementTitle')}
              </h2>
              <p className="text-gray-600">
              {t('homeScreen.features.patientManagementText')}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {t('homeScreen.features.medicalDataTrackingTitle')}
              </h2>
              <p className="text-gray-600">
              {t('homeScreen.features.medicalDataTrackingText')}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {t('homeScreen.features.collaborationToolsTitle')}
              </h2>
              <p className="text-gray-600">
              {t('homeScreen.features.collaborationToolsText')}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {t('homeScreen.features.securePlatformTitle')}
              </h2>
              <p className="text-gray-600">
              {t('homeScreen.features.securePlatformText')}
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
              {t('homeScreen.features.forAllSpecialistsTitle')}
              </h2>
              <p className="text-gray-600">
              {t('homeScreen.features.forAllSpecialistsText')}
              </p>
            </div>
          </div>
              <div className="container mx-auto px-6 py-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {t('homeScreen.readyToSimplify')}
            </h3>
          </div>
          <div>
          </div>
        </section>

      );
}

export default HomeComponent;