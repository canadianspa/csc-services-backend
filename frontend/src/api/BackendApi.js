import { handleResponse } from "./ApiUtils";
import { API_BASE_URL } from "../config";

export function convertFile(params) {
  const { vendor, file } = params;

  let url = `${API_BASE_URL}/import/convert/${vendor}`;

  let options = {
    method: "POST",
  };

  if (file) {
    let formData = new FormData();
    formData.append("file", file);
    options.body = formData;
  }

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function importOrders(params) {
  const { orders } = params;

  let url = `${API_BASE_URL}/import/orders`;

  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(orders),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getPostcodeAddresses(params) {
  const { postcode } = params;

  let url = `${API_BASE_URL}/postcoder?postcode=${postcode}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function updateSpreadsheet(params) {
  const { vendor } = params;

  let url = `${API_BASE_URL}/update/${vendor}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getTurnover(params) {
  const { date } = params;

  let url = `${API_BASE_URL}/turnover?date=${date}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getOrderWell() {
  let url = `${API_BASE_URL}/orderwell`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getItems() {
  let url = `${API_BASE_URL}/shipping/items`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function createItem(params) {
  const { item } = params;

  let url = `${API_BASE_URL}/shipping/items`;

  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function updateItem(params) {
  const { id, item } = params;

  let url = `${API_BASE_URL}/shipping/items?id=${id}`;

  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function deleteItem(params) {
  const { id } = params;

  let url = `${API_BASE_URL}/shipping/items?id=${id}`;

  let options = {
    method: "DELETE",
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getCarriers() {
  let url = `${API_BASE_URL}/shipping/carriers`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function createShipment(params) {
  const { shipment } = params;

  let url = `${API_BASE_URL}/shipping/create/`;

  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(shipment),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}
