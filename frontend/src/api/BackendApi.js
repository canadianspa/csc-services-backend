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
  const { start, end } = params;

  let url = `${API_BASE_URL}/bandq/turnover?start=${start}&end=${end}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getOrderWell() {
  let url = `${API_BASE_URL}/bandq/orderwell`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getVeeqoOrder(params) {
  const { orderUrl } = params;

  let url = `${API_BASE_URL}/veeqo?url=${orderUrl}`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function getCalendars() {
  let url = `${API_BASE_URL}/calendar`;

  return fetch(url)
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export function createEvent(params) {
  const { event } = params;

  let url = `${API_BASE_URL}/calendar`;

  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(event),
  };

  return fetch(url, options)
    .then(handleResponse)
    .catch((error) => console.error(error));
}
