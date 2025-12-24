import { ServiceData } from "../types";
import servicesData from "../../data/services.json";

export const getServicesData = (): ServiceData => {
  return servicesData as ServiceData;
};

export const getServiceById = (serviceId: string) => {
  const services = getServicesData();
  return services[serviceId] || null;
};

export const getServicesForDisplay = () => {
  const services = getServicesData();
  return Object.entries(services).map(([id, service]) => ({
    id,
    title: service.title,
    description: service.description,
    icon: service.icon,
  }));
};
