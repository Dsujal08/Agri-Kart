import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Use React Router

const slides = [
  {
    id: 1,
    src: "https://www.sscadda.com/wp-content/uploads/multisite/sites/2/2022/03/08184516/Pradhan-Mantri-Krishi-Sinchai-Yojana-1.png",
    title: "PM-KISAN",
    description: "Provides ₹6,000 per year to eligible farmer families in three installments.",
    details: "PM-KISAN is a Central Sector scheme with 100% funding from the Government of India. It provides direct income support of ₹6,000 per year in three equal installments to all landholding farmer families in the country."
  },
  {
    id: 2,
    src: "https://www.india.gov.in/sites/upload_files/npi/files/spotlights/fasal-bima-yojna-inner.jpg",
    title: "PMFBY",
    description: "A crop insurance scheme to protect farmers from financial losses.",
    details: "The Pradhan Mantri Fasal Bima Yojana (PMFBY) provides insurance coverage and financial support to farmers in case of crop loss due to natural calamities, pests, and diseases."
  },
  {
    id: 3,
    src: "https://cmdashboard.mn.gov.in/wp-content/uploads/2022/01/Cabinet_extends_RKVY_scheme.jpg",
    title: "RKVY",
    description: "Developing agriculture and allied sectors in India.",
    details: "The Rashtriya Krishi Vikas Yojana (RKVY) is a scheme aimed at holistic agricultural development. It provides financial assistance for improving productivity, introducing modern techniques, and infrastructure development."
  },
  {
    id: 4,
    src: "https://agriguru.in/wp-content/uploads/2021/07/Krishi-Vigyan-Kendra-Notes-For-IBPS-AFO-NABARD.jpg",
    title: "KVKs",
    description: "Agricultural extension centers helping farmers with research.",
    details: "Krishi Vigyan Kendras (KVKs) are agricultural science centers focused on disseminating technology and research-based farming solutions to local farmers, supported by the Indian Council of Agricultural Research (ICAR)."
  },
];

export default function ContinuousSlider() {
  const navigate = useNavigate(); // For navigation

  return (
    <div className="overflow-hidden  w-full py-10">
      <h2 className="text-center text-4xl font-bold text-green-800 dark:text-green-200 mb-8">
        Government Agriculture Schemes
      </h2>

      <motion.div
        className="flex w-max gap-10"
        animate={{ x: [0, -2500] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {[...slides, ...slides].map((item, index) => (
          <div
            key={index}
            className="flex w-[450px] flex-col flex-shrink-0 items-center 
              bg-white/90 dark:bg-green-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl 
              transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-[450px] h-48 rounded-xl mb-4 object-cover transition duration-300 ease-in-out transform hover:scale-110"
            />
            <div className="flex flex-col justify-between h-full w-full text-center">
              <h3 className="text-2xl font-semibold text-green-900 dark:text-green-100 mb-2">
                {item.title}
              </h3>
              <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
                {item.description}
              </p>
              <button
                onClick={() => navigate(`/scheme/${item.id}`)}
                className="mt-auto px-5 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
