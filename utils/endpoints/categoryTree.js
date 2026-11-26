import { fetchJson } from './fetch-json';

export async function getCategoryTree() {
  let data = (await fetchJson(process.env.API_HOST + '/store/category/tree?storefront=1')) || {
    children: [],
  };
  if (data) {
    removeContent(data);
  }
  return data;
}

function removeContent(node) {
  if (node.content) {
    delete node.content;
  }
  if (node.children) {
    node.children = (node.children || []).filter(item => !item.isHidden)
  }
  if (node?.children?.length) {
    node.children.forEach((child) => removeContent(child));
  }
}
