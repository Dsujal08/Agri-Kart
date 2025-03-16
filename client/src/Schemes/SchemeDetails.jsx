import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const slides = [
  {
    id: 1,
    src: "https://www.india.gov.in/sites/upload_files/npi/files/spotlights/fasal-bima-yojna-inner.jpg",
    title: "PMFBY",
    details: `
      <strong>Pradhan Mantri Fasal Bima Yojana (PMFBY)</strong> provides crop insurance to farmers against natural disasters.<br><br>
      ✅ <strong>Key Features:</strong><br>
      - Covers <strong>50+ crops</strong>, including food and horticultural crops.<br>
      - Protects against <strong>cyclones, droughts, pests, and diseases</strong>.<br>
      - Farmers pay a premium of <strong>2% (Kharif), 1.5% (Rabi), 5% (commercial crops)</strong>.<br>
      - <strong>Compulsory</strong> for loanee farmers, <strong>voluntary</strong> for others.<br><br>
      🔗 <a href='https://pmfby.gov.in/' target='_blank' class='text-green-600 underline'>Apply Here</a>
    `,
  },
  {
    id: 2,
    src: "https://www.sscadda.com/wp-content/uploads/multisite/sites/2/2022/03/08184516/Pradhan-Mantri-Krishi-Sinchai-Yojana-1.png",
    title: "PM-KISAN",
    details: `
      <strong>PM-KISAN Scheme</strong> provides <strong>₹6,000 per year</strong> to farmers in three equal installments.<br><br>
      💰 <strong>Payment Details:</strong><br>
      - ₹2,000 every 4 months directly to bank accounts.<br>
      - Aadhaar-linked payments ensure transparency.<br><br>
      🔍 <strong>Eligibility:</strong><br>
      - All farmer families with cultivable land.<br>
      - Includes joint and individual owners.<br><br>
      🔗 <a href='https://pmkisan.gov.in/' target='_blank' class='text-green-600 underline'>Apply Here</a>
    `,
  },
  {
    id: 3,
    src: "https://cmdashboard.mn.gov.in/wp-content/uploads/2022/01/Cabinet_extends_RKVY_scheme.jpg",
    title: "RKVY",
    details: `
      <strong>Rashtriya Krishi Vikas Yojana (RKVY)</strong> aims to promote holistic agricultural growth.<br><br>
      🌱 <strong>Key Features:</strong><br>
      - Provides financial aid for new agri-business ventures.<br>
      - Encourages modern technology adoption in farming.<br>
      - Focuses on enhancing productivity and infrastructure.<br><br>
      🔗 <a href='https://rkvy.nic.in/' target='_blank' class='text-green-600 underline'>Apply Here</a>
    `,
  },
  {
    id: 4,
    src: "https://agriguru.in/wp-content/uploads/2021/07/Krishi-Vigyan-Kendra-Notes-For-IBPS-AFO-NABARD.jpg",
    title: "KVKs",
    details: `
      <strong>Krishi Vigyan Kendras (KVKs)</strong> serve as agricultural extension centers for farmers.<br><br>
      🌾 <strong>Benefits:</strong><br>
      - Provides hands-on training for farmers.<br>
      - Offers expert advice on soil testing and crop management.<br>
      - Helps farmers adopt new and sustainable techniques.<br><br>
      🔗 <a href='https://kvk.icar.gov.in/' target='_blank' class='text-green-600 underline'>Find KVK Near You</a>
    `,
  }
];

export default function SchemeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const scheme = slides.find((item) => item.id === parseInt(id));
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  if (!scheme) return <div className="text-center text-red-500 font-bold">Scheme Not Found</div>;

  return (
    <div className={`${isDarkMode ? "dark" : ""} flex min-h-screen bg-gray-50 dark:bg-gray-900`}> 
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 h-full bg-green-800 dark:bg-gray-800 text-white w-64 p-6 shadow-lg z-50"
      >
        <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white text-2xl">✖</button>
        <h2 className="text-2xl font-bold mb-4">Government Schemes</h2>
        <ul>
          {slides.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer p-3 mb-2 rounded-lg ${item.id === parseInt(id) ? "bg-green-600" : "hover:bg-green-700"} transition`}
              onClick={() => {
                navigate(`/scheme/${item.id}`);
                setSidebarOpen(false);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </motion.div>
      
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-5 left-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
      >
        ☰ Menu
      </button>
      
      <button
        onClick={() => setDarkMode(!isDarkMode)}
        className="absolute top-5 right-5 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-lg hover:scale-110 transition"
      >
        {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
      </button>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full p-10"
      >
        <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-6">{scheme.title}</h1>
        <img src={scheme.src} alt={scheme.title} className="w-[500px] rounded-lg shadow-lg mb-6" />
        
        <div className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl whitespace-pre-line">
          <div dangerouslySetInnerHTML={{ __html: scheme.details }} />
        </div>

        <button
          onClick={() => navigate('/')} 
          className="mt-6 px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          ← Back
        </button>
      </motion.div>
    </div>
  );
}