import VermicompostFertilizer from './Img/VermicompostFertilizer.png'; 
import PlantBoostLiquidBiofertilizer from './Img/PlantBoostLiquidBiofertilizer.png'; 
import HumicAcidFertilizer from './Img/HumicAcidFertilizer.png'; 
import FeromonesOrganicSeaweed from './Img/FeromonesOrganicSeaweed.png'; 
import GREENBLISSplantboost from './Img/GREENBLISSplantboost.png'; 
// import FarmCraftHUMICAcid from './Img/FarmCraftHUMICAcid.png';  // ✅ Ensure correct image file
// import AlkartyOrganicRooty from './Img/AlkartyOrganicRooty.png'; 
// import TheGreenWealthSeaweed from './Img/TheGreenWealthSeaweed.png'; 

export const products = [
    {
        id: 1,
        name: 'Organic Vermicompost Fertilizer',
        price: 999,
        discount: 35,  
        stock: 15,
        image: VermicompostFertilizer,
        category: 'Fertilizers',
        featured: true,
        description: 
            'Organic Vermicompost Fertilizer for Plants & Home Gardening is made from high-quality, composted organic matter processed by earthworms...',
        slug: 'organic-vermicompost-fertilizer-10kg',
    },
    {
        id: 2,
        name: 'Lofiyan Plant Boost Liquid Biofertilizer',
        price: 299,
        discount: 51,  
        stock: 8,
        image: PlantBoostLiquidBiofertilizer,
        category: 'Fertilizers',
        description: 
            'Lofiyan Plant Boost Liquid Biofertilizer is packed with essential nutrients, beneficial microbes, and natural growth stimulants...',
        slug: 'lofiyan-plant-boost-liquid-biofertilizer-50ml',
    },
    {
        id: 3,
        name: 'Gardenica Humic Acid Fertilizer',
        price: 595,
        discount: 75,
        stock: 5,  
        image: HumicAcidFertilizer,
        category: 'Fertilizers',
        description: 
            'Gardenica Humic Acid Fertilizer helps stimulate root development, improve soil structure, and boost nutrient absorption...',
        slug: 'gardenica-humic-acid-fertilizer-400g',
    },
    {
        id: 4,
        name: 'Feromones Organic Seaweed Extract',
        price: 499,
        discount: 63,
        stock: 10,  
        image: FeromonesOrganicSeaweed,
        category: 'Fertilizers',
        description: 
            'Feromones Organic Seaweed Extract Potting Mixture provides essential trace minerals, vitamins, and amino acids...',
        slug: 'feromones-organic-seaweed-extract-0.5l',
    },
    {
        id: 5,
        name: 'GREEN BLISS Plant Boost Liquid Biofertilizer',
        price: 299,
        discount: 53,  
        stock: 13,  
        image: GREENBLISSplantboost, 
        category: 'Fertilizers',
        description: 
            'GREEN BLISS Plant Boost Liquid Biofertilizer contains beneficial microbes and plant growth promoters...',
        slug: 'green-bliss-plant-boost-liquid-biofertilizer-50ml',
    },
    // {
    //     id: 6,
    //     name: 'FarmCraft HUMIC Acid + Fulvic Acid',
    //     price: 799,
    //     discount: 76,  
    //     stock: 2,  
    //     image: FarmCraftHUMICAcid, // ✅ Fixed image reference
    //     category: 'Fertilizers',
    //     description: 
    //         'FarmCraft HUMIC Acid + Fulvic Acid is formulated to improve nutrient absorption, enhance soil structure...',
    //     slug: 'farmcraft-humic-acid-fulvic-acid-1kg',
    // },
    // {
    //     id: 7,
    //     name: 'Alkarty Organic Rooty Rooting Hormone Fertilizer',
    //     price: 299,
    //     discount: 49,
    //     stock: 10,  
    //     image: AlkartyOrganicRooty,
    //     category: 'Fertilizers',
    //     description: 
    //         'Alkarty Organic Rooty Rooting Hormone Fertilizer contains organic ingredients that stimulate root growth...',
    //     slug: 'alkarty-organic-rooty-rooting-hormone-0.03kg',
    // },
    // {
    //     id: 8, // ✅ Fixed duplicate ID issue
    //     name: 'TheGreenWealth Seaweed Extract Granules',
    //     price: 349,
    //     discount: 58,  
    //     stock: 6,  
    //     image: TheGreenWealthSeaweed,
    //     category: 'Fertilizers',
    //     description: 
    //         'TheGreenWealth Seaweed Extract Granules Fertilizer is designed to promote healthy plant growth and enhance soil vitality...',
    //     slug: 'thegreenwealth-seaweed-extract-granules-500g',
    // },
];
