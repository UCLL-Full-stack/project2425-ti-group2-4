import { useRouter } from "next/router";
import React from "react";

const HomeComponent: React.FC = () => {
    const router = useRouter();

    return (
        <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
          <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Welcome to <span className="text-blue-600">ClinicaLink</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              ClinicaLink is an all-in-one digital platform designed to streamline
              appointment scheduling, patient management, and medical data tracking
              for healthcare professionals such as doctors, chiropractors,
              physiotherapists, and other medical specialists.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
                    onClick={() => {router.push("/login/signup")}}>
              Get Started
            </button>
          </div>
              <div className="container mx-auto px-6 py-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Streamlined Scheduling
              </h2>
              <p className="text-gray-600">
                Simplify appointment booking and scheduling to save time and improve
                efficiency for your practice.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Patient Management
              </h2>
              <p className="text-gray-600">
                Easily manage patient records, visit histories, and communication in
                one unified system.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Medical Data Tracking
              </h2>
              <p className="text-gray-600">
                Track and access vital medical data securely to ensure seamless care
                for your patients.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Collaboration Tools
              </h2>
              <p className="text-gray-600">
                Collaborate effortlessly between providers and patients with our
                integrated tools.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Secure Platform
              </h2>
              <p className="text-gray-600">
                Your data security is our top priority with robust encryption and
                secure access.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                For All Medical Specialists
              </h2>
              <p className="text-gray-600">
                Designed to cater to doctors, chiropractors, physiotherapists, and
                various healthcare specialists.
              </p>
            </div>
          </div>
              <div className="container mx-auto px-6 py-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Ready to Simplify Your Practice?
            </h3>
          </div>
        </section>
      );
}

export default HomeComponent;