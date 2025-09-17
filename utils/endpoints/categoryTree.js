export async function getCategoryTree() {
  const res = await fetch(process.env.API_HOST + '/store/category/tree');
  let data = await res.json() || [];
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

export async function getCategories() {
  const res = await fetch(process.env.API_HOST + '/store/category');
  return await res.json() || [];
}
