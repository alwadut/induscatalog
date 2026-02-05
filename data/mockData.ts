import { Product } from '../types';

export const products: Product[] = [
  {
    id: "P001",
    sku: "HYD-PUMP-X200",
    name: "Hydraulic Pump X200 Series",
    category: "Hydraulics",
    manufacturer: "FluidoMech",
    price: 1250.00,
    availability: { inStock: true, quantity: 15 },
    description: "High-performance hydraulic pump designed for heavy-duty industrial machinery. Features variable displacement and robust cast iron construction.",
    specifications: [
      { key: "Max Pressure", value: "350", unit: "bar" },
      { key: "Flow Rate", value: "200", unit: "L/min" },
      { key: "Weight", value: "45", unit: "kg" },
      { key: "Power", value: "15", unit: "kW" }
    ],
    images: {
      thumbnail: "https://picsum.photos/id/1/400/400",
      gallery: ["https://picsum.photos/id/1/800/800", "https://picsum.photos/id/2/800/800"]
    },
    certifications: ["ISO 9001", "CE"],
    ratings: { average: 4.8, count: 32 }
  },
  {
    id: "P002",
    sku: "MOT-IND-3PH",
    name: "3-Phase Induction Motor 50HP",
    category: "Motors",
    manufacturer: "PowerDrive",
    price: 3400.00,
    availability: { inStock: true, quantity: 8 },
    description: "Premium efficiency IE3 3-phase induction motor suitable for continuous duty applications.",
    specifications: [
      { key: "Power", value: "50", unit: "HP" },
      { key: "Speed", value: "1750", unit: "RPM" },
      { key: "Voltage", value: "460", unit: "V" },
      { key: "Frame Size", value: "326T", unit: "" }
    ],
    images: {
      thumbnail: "https://picsum.photos/id/3/400/400",
      gallery: ["https://picsum.photos/id/3/800/800"]
    },
    certifications: ["UL Listed", "CSA"],
    ratings: { average: 4.5, count: 18 }
  },
  {
    id: "P003",
    sku: "SENS-PROX-L5",
    name: "Inductive Proximity Sensor L5",
    category: "Sensors",
    manufacturer: "SenseTech",
    price: 85.50,
    availability: { inStock: true, quantity: 200 },
    description: "Reliable proximity sensor with LED indicator and short-circuit protection. M12 standard thread.",
    specifications: [
      { key: "Range", value: "5", unit: "mm" },
      { key: "Output", value: "PNP NO", unit: "" },
      { key: "IP Rating", value: "IP67", unit: "" },
      { key: "Voltage", value: "10-30", unit: "VDC" }
    ],
    images: {
      thumbnail: "https://picsum.photos/id/4/400/400",
      gallery: ["https://picsum.photos/id/4/800/800"]
    },
    certifications: ["CE", "RoHS"],
    ratings: { average: 4.2, count: 124 }
  },
  {
    id: "P004",
    sku: "VLV-BALL-SS-2",
    name: "Stainless Steel Ball Valve 2\"",
    category: "Valves",
    manufacturer: "FlowMaster",
    price: 210.00,
    availability: { inStock: false, quantity: 0 },
    description: "Full port stainless steel ball valve with PTFE seats. Locking handle included.",
    specifications: [
      { key: "Size", value: "2", unit: "inch" },
      { key: "Material", value: "316 SS", unit: "" },
      { key: "Pressure Rating", value: "1000", unit: "WOG" },
      { key: "Temp Range", value: "-20 to 450", unit: "F" }
    ],
    images: {
      thumbnail: "https://picsum.photos/id/5/400/400",
      gallery: ["https://picsum.photos/id/5/800/800"]
    },
    certifications: ["API 607"],
    ratings: { average: 4.9, count: 45 }
  },
  {
    id: "P005",
    sku: "PLC-CTRL-MICRO",
    name: "MicroLogic PLC Controller",
    category: "Automation",
    manufacturer: "AutoSys",
    price: 450.00,
    availability: { inStock: true, quantity: 42 },
    description: "Compact programmable logic controller with embedded I/O and Ethernet connectivity.",
    specifications: [
      { key: "Digital Inputs", value: "12", unit: "" },
      { key: "Digital Outputs", value: "8", unit: "Relay" },
      { key: "Analog Inputs", value: "2", unit: "0-10V" },
      { key: "Memory", value: "20", unit: "KB" }
    ],
    images: {
      thumbnail: "https://picsum.photos/id/6/400/400",
      gallery: ["https://picsum.photos/id/6/800/800"]
    },
    certifications: ["UL", "CE"],
    ratings: { average: 4.6, count: 89 }
  },
  {
    id: "P006",
    sku: "PNU-CYL-ISO",
    name: "ISO Pneumatic Cylinder 50mm",
    category: "Pneumatics",
    manufacturer: "AirForce",
    price: 180.00,
    availability: { inStock: true, quantity: 30 },
    description: "Standard ISO 15552 pneumatic cylinder with magnetic piston and adjustable cushioning.",
    specifications: [
      { key: "Bore", value: "50", unit: "mm" },
      { key: "Stroke", value: "100", unit: "mm" },
      { key: "Max Pressure", value: "10", unit: "bar" },
      { key: "Rod Thread", value: "M16x1.5", unit: "" }
    ],
    images: {
      thumbnail: "https://picsum.photos/id/7/400/400",
      gallery: ["https://picsum.photos/id/7/800/800"]
    },
    certifications: ["ISO 15552"],
    ratings: { average: 4.4, count: 22 }
  }
];