import { parseFragment } from 'parse5';

const isHeading = (node) => /^h[1-6]$/.test(node.tagName);
const faqHeading = /(?:\bfaq\b|часто задаваемые вопросы|частые вопросы|вопросы и ответы)/i;

function plainText(node) {
  if (node.nodeName === '#text') return node.value;
  if (['script', 'style', 'template'].includes(node.tagName)) return '';
  return (node.childNodes || []).map(plainText).join(' ');
}

function compactText(node) {
  return plainText(node).replace(/\s+/g, ' ').trim();
}

function faqQuestions(nodes) {
  const questions = [];
  const add = (question, answer) => {
    if (question && answer && !questions.some((entry) => entry.name === question)) {
      questions.push({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } });
    }
  };

  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    const children = (node.childNodes || []).filter((child) => child.tagName);
    if (node.tagName === 'details') {
      const summary = children.find((child) => child.tagName === 'summary');
      if (summary) add(compactText(summary),
        node.childNodes.filter((child) => child !== summary).map(compactText).filter(Boolean).join(' '));
      continue;
    }
    if (['p', 'li', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
      const text = compactText(node);
      const questionEnd = text.indexOf('?');
      if (questionEnd >= 0) {
        const question = text.slice(0, questionEnd + 1);
        const inlineAnswer = text.slice(questionEnd + 1).trim();
        const next = nodes[index + 1];
        if (inlineAnswer) add(question, inlineAnswer);
        else if (next?.tagName === 'p' && !compactText(next).endsWith('?')) {
          add(question, compactText(next));
          index++;
        }
        continue;
      }
    }
    if (!isHeading(node)) questions.push(...faqQuestions(children));
  }
  return questions;
}

export function prepareSeoContent(html = '') {
  const document = parseFragment(html, { sourceCodeLocationInfo: true });
  const edits = [];
  const questions = [];
  function visit(parent) {
    const children = (parent.childNodes || []).filter((node) => node.tagName);
    for (let index = 0; index < children.length; index++) {
      const node = children[index];
      if (node.tagName === 'h1' && node.sourceCodeLocation) {
        const { startTag, endTag } = node.sourceCodeLocation;
        edits.push([startTag.startOffset + 1, startTag.startOffset + 3, 'h2']);
        if (endTag) edits.push([endTag.startOffset + 2, endTag.startOffset + 4, 'h2']);
      }
      if (isHeading(node) && faqHeading.test(compactText(node))) {
        const section = [];
        for (let next = index + 1; next < children.length; next++) {
          const sibling = children[next];
          if (isHeading(sibling) && sibling.tagName <= node.tagName) break;
          section.push(sibling);
        }
        questions.push(...faqQuestions(section));
      }
      visit(node);
    }
  }
  visit(document);
  for (const [start, end, replacement] of edits.sort((a, b) => b[0] - a[0])) {
    html = html.slice(0, start) + replacement + html.slice(end);
  }
  const unique = [...new Map(questions.map((question) => [question.name, question])).values()];
  return { html, faq: unique.length ? { '@type': 'FAQPage', mainEntity: unique } : null };
}

export function htmlText(html) {
  return typeof html === 'string' ? compactText(parseFragment(html)) : '';
}
