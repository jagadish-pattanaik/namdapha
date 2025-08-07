import React from "react";
import Navbar from "../components/Navbar";
import ContactModal from "../components/ContactModal";
import { profileConfig } from "../config/profile";

const WhatsappVerify: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black">
      <Navbar />
      <div className="max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">WhatsApp Verification Form </h1>
        <div className="bg-black/30 rounded-2xl p-6 shadow-xl flex flex-col items-center">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSe8v01Zd3jp7M_wlZDA0P0kGv_uG_x31JErPxAFJC-vM1H5wQ/viewform?usp=header"
            width="100%"
            height="1600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="WhatsApp Verification Form"
            className="rounded-xl w-full max-w-2xl bg-white"
            allowFullScreen
          >
            Loading…
          </iframe>
        </div>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactEmail={profileConfig.contactEmail}
      />
    </div>
  );
};

export default WhatsappVerify;