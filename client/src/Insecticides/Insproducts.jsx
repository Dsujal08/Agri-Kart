import FosterInsecticide from './Img/FosterInsecticide.png'; 
import ImiconSuper from './Img/ImiconSuper.png'; 
import MeothrinInsecticide from './Img/MeothrinInsecticide.png'; 
import Imidacloprid from './Img/Imidacloprid.png'; 
import NeemBased from './Img/NeemBased.png'; 
import PowderPymetrozine from './Img/PowderPymetrozine.png'; 
import Pyriproxyfen from './Img/Pyriproxyfen.png'; 
import TapuzInsecticide from './Img/TapuzInsecticide.png'; 



export const products = [
    {
        id: 1,
        name: 'Foster Insecticide (100ML)',
        price: 400,
        discount: 10,  
        stock: 15,  // ✅ Added stock availability
        image: FosterInsecticide,
        category: 'Insecticides',
        featured: true,
        description: 
            'Foster Insecticide is a powerful, broad-spectrum insecticide designed to control a wide range of pests in crops, gardens, and landscapes. It works by targeting the nervous system of insects, effectively eliminating pests while being gentle on plants. ',
        slug: 'Foster Insecticide',
    },
    {
        id: 2,
        name: 'Imicon Super Imidacloprid 30.5 % SC Insecticide(Litre)',
        price: 3000,
        discount: 16,  
        stock: 8,  
        image: ImiconSuper,
        category: 'Insecticides',
        description: 
            'Imicon Super Imidacloprid 30.5% SC Insecticide is a systemic insecticide that effectively controls a variety of pests, including termites, aphids, and whiteflies. With its 30.5% imidacloprid concentration, it works by disrupting the insect’s nervous system, providing long-lasting protection for crops and plants.',
        slug: 'Imicon Super Imidacloprid 30.5 % SC Insecticide'
    },
    {
        id: 3,
        name: 'Imidacloprid 30.5% SC Super Ambamidon Insecticide, For Agriculture, Packaging Type Bottle(Litre)',
        price: 1800,
        discount: 10,
        stock: 5,  
        image: Imidacloprid,
        category: 'Insecticides',
        // featured: true,  
        description: 
            'Imicon Super Imidacloprid 30.5% SC Insecticide is a systemic insecticide that effectively controls a variety of pests, including termites, aphids, and whiteflies. With its 30.5% imidacloprid concentration, it works by disrupting the insect’s nervous system, providing long-lasting protection for crops and plants.',
        slug: 'Imidacloprid 30.5% SC Super Ambamidon Insecticide, For Agriculture, Packaging Type Bottle'
    },
    {
        id: 3,
        name: 'Meothrin Insecticide(100ML)',
        price: 294,
        stock: 10,  
        image: MeothrinInsecticide,
        category: 'Insecticides',
        // featured: true,  
        description: 
            'Meothrin Insecticide is a broad-spectrum insecticide that effectively controls a variety of pests, including mosquitoes, flies, and other crawling and flying insects. It works by disrupting the insect’s nervous system, leading to rapid elimination. ',
        slug: 'Meothrin Insecticide'
    },
    {
        id: 4,
        name: ' Neem Based Insecticides(Litre)',
        price: 5000,
        discount: 2,  
        stock: 13,  
        image: NeemBased, 
        category: 'Insecticides',
        description: 
            'Neem-based insecticides are natural, eco-friendly pest control solutions derived from the neem tree. They contain azadirachtin, a compound that disrupts the growth and reproduction of insects, effectively controlling pests like aphids, mites, and caterpillars.',
        slug: 'Neem Based Insecticides'
    },
    {
        id: 5,
        name: 'Powder Pymetrozine 50 Wg, Packaging Size 100 gm, Packaging Type Bottle(KG)',
        price: 2000,
        discount: 25,  
        stock: 2,  
        image: PowderPymetrozine,
        category: 'Insecticides',
        description: 
            'Powder Pymetrozine 50 WG is a systemic insecticide formulated to control sap-sucking pests like whiteflies, aphids, and leafhoppers. With a concentration of 50% Pymetrozine, it effectively disrupts the feeding and reproduction of pests without harming beneficial insects.',
        slug: 'Powder Pymetrozine 50 Wg, Packaging Size 100 gm, Packaging Type Bottle'
    },
    {
        id: 6,
        name: 'Pyriproxyfen 10 % + Bifenthrin 10 % ww EC(Litre)',
        price: 1200,
        discount: 10,
        stock: 3,  
        image: Pyriproxyfen,
        category: 'Insecticides',
        description: 
            'Pyriproxyfen 10% + Bifenthrin 10% WW EC is a powerful combination insecticide designed to control a wide range of pests. Pyriproxyfen is a growth regulator that targets the development of insects, while Bifenthrin is a potent contact insecticide that affects the nervous system of pests.',
        slug: 'Pyriproxyfen 10 % + Bifenthrin 10 % ww EC'
    },
    {
        id: 7,
        name: 'Tapuz Insecticide(100GM)',
        price: 200,
        discount: 10,  
        stock: 6,  
        image: TapuzInsecticide,
        category: 'Insecticides',
        // featured: true,
        description: 
            'Tapuz Insecticide is a potent, broad-spectrum insecticide designed to control a variety of pests, including aphids, whiteflies, and mealybugs. It works by disrupting the nervous system of insects, leading to their rapid elimination.',
        slug: 'Tapuz Insecticide'  // ✅ Fixed missing slug
    },
];
