window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //增加子节点
  append(parent, node) {
    parent.appendChild(node);
  },
  //增加父节点
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //移处节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //   empty(node) {
  //     const { childNodes } = node;
  //     const array = [];
  //     console.log(1);
  //     let length = childNodes.length;

  //     for (let i = 0; i < length; i++) {
  //       console.log(1);
  //       dom.remove(childNodes[i]);
  //       array.push(childNodes[i]);
  //     }
  //     return array;
  //   },

  //清空节点的子元素
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },

  //改节点的属性，读节点的属性
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  //节点添加文本内容,获取文本内容
  text(node, string) {
    //适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    }
    if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  //改写、获取HTML，
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innterHTML;
    }
  },

  //
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },

  //添加、移除class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },

  //添加移除事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  //用于获取标签或标签们
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },

  //用于获取父元素
  parent(node) {
    return node.parentNode;
  },
  //用于获取子元素
  children(node) {
    return node.children;
  },
  //用于获取兄弟姐妹元素
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  //用于获取弟弟
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //用于获取哥哥
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  //用于遍历所有节点，并添加函数
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  //用于获取索引
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
