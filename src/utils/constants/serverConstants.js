const tableNames = () => [
  {
    id: 1,
    name: "Tipo de manzana",
    table: "GeographicBlock",
    prop: "geographicBlock",
  },
  {
    id: 2,
    name: "Superficie del lote",
    table: "GeographicArea",
    prop: "geographicArea",
  },
  {
    id: 3,
    name: "Superficie cubierta",
    table: "GeographicCoveredArea",
    prop: "geographicCoveredArea",
  },
  {
    id: 4,
    name: "Actividad",
    table: "ActivityMain",
    prop: "activityMain",
  },
  {
    id: 5,
    name: "Tamaño de la empresa",
    table: "ActivityStaffSize",
    prop: "activityStaffSize",
  },
  {
    id: 6,
    name: "Carga horaria",
    table: "ActivityWorkLoad",
    prop: "activityWorkLoad",
  },
  {
    id: 7,
    name: "Cantidad de desechos sólidos",
    table: "EnvironmentalWaste",
    prop: "environmentalWaste",
  },
  {
    id: 8,
    name: "Emisión de gases",
    table: "EnvironmentalGases",
    prop: "environmentalGases",
  },
  {
    id: 9,
    name: "Consumo de agua",
    table: "EnvironmentalWaterConsumption",
    prop: "environmentalWaterConsumption",
  },
];

const baseUrl = "https://localhost:7210/api";

module.exports = {
  tableNames,
  baseUrl,
};
