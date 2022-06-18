const tableNames = () => [
  {
    id: 1,
    name: "Tipo de manzana",
    table: "GeographicBlock",
  },
  {
    id: 2,
    name: "Superficie del lote",
    table: "GeographicArea",
  },
  {
    id: 3,
    name: "Superficie cubierta",
    table: "GeographicCoveredArea",
  },
  {
    id: 4,
    name: "Actividad",
    table: "ActivityMain",
  },
  {
    id: 5,
    name: "Tamaño de la empresa",
    table: "ActivityStaffSize",
  },
  {
    id: 6,
    name: "Carga horaria",
    table: "ActivityWorkLoad",
  },
  {
    id: 7,
    name: "Cantidad de desechos sólidos",
    table: "EnvironmentalWaste",
  },
  {
    id: 8,
    name: "Emisión de gases",
    table: "EnvironmentalGases",
  },
  {
    id: 9,
    name: "Consumo de agua",
    table: "EnvironmentalWaterConsumption",
  },
];

const baseUrl = "https://localhost:7210/api";

module.exports = {
  tableNames,
  baseUrl,
};
