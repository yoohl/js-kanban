/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar url = \"https://kanban-cf053.firebaseio.com/list.json\";\nvar data = void 0,\n    Item = void 0;\nvar cardIdx = 0,\n    boardIdx = 0,\n    originBdIdx = void 0,\n    originCdIdx = void 0,\n    originDom = void 0;\n\nfunction Card(idx, val) {\n\tthis.listIndex = idx;\n\tthis.name = val;\n}\nfunction getData(url) {\n\tvar xhr = new XMLHttpRequest();\n\txhr.open('GET', url);\n\txhr.send();\n\txhr.onreadystatechange = function () {\n\t\tif (xhr.readyState === 4) {\n\t\t\tif (xhr.status === 200) {\n\t\t\t\tvar res = xhr.responseText;\n\t\t\t\tdata = JSON.parse(res);\n\t\t\t\tdraw();\n\t\t\t\treturn res;\n\t\t\t} else {\n\t\t\t\tconsole.log(\"Error!\");\n\t\t\t}\n\t\t}\n\t};\n}\nfunction putData(name) {\n\tvar xhr = new XMLHttpRequest();\n\txhr.open('PUT', url); // 접속하려는 대상을 지정 \n\txhr.setRequestHeader('Content-Type', 'application/json'); // 클라이언트가 서버로 전송할 데이터의 MIME-type 지정\n\txhr.send(name);\n\txhr.onreadystatechange = function () {\n\t\tif (xhr.readyState == 4) {\n\t\t\t// 이상 없음, 응답 받았음\n\t\t}\n\t};\n}\nfunction setData() {\n\tvar json = JSON.stringify(data);\n\tputData(json);\n\tsetListIndex();\n}\n\ngetData(url);\n\nfunction draw() {\n\theadDraw();\n\n\tif (data) {\n\t\tvar _iteratorNormalCompletion = true;\n\t\tvar _didIteratorError = false;\n\t\tvar _iteratorError = undefined;\n\n\t\ttry {\n\t\t\tfor (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n\t\t\t\tvar board = _step.value;\n\n\t\t\t\tcreateBoard(board.listIndex, board.name);\n\t\t\t\tif (board.item) {\n\t\t\t\t\tvar _iteratorNormalCompletion2 = true;\n\t\t\t\t\tvar _didIteratorError2 = false;\n\t\t\t\t\tvar _iteratorError2 = undefined;\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tfor (var _iterator2 = board.item[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n\t\t\t\t\t\t\tvar card = _step2.value;\n\n\t\t\t\t\t\t\tcreateCard(card.listIndex, card.name);\n\t\t\t\t\t\t}\n\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t_didIteratorError2 = true;\n\t\t\t\t\t\t_iteratorError2 = err;\n\t\t\t\t\t} finally {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tif (!_iteratorNormalCompletion2 && _iterator2.return) {\n\t\t\t\t\t\t\t\t_iterator2.return();\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} finally {\n\t\t\t\t\t\t\tif (_didIteratorError2) {\n\t\t\t\t\t\t\t\tthrow _iteratorError2;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tboard.item = [];\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (err) {\n\t\t\t_didIteratorError = true;\n\t\t\t_iteratorError = err;\n\t\t} finally {\n\t\t\ttry {\n\t\t\t\tif (!_iteratorNormalCompletion && _iterator.return) {\n\t\t\t\t\t_iterator.return();\n\t\t\t\t}\n\t\t\t} finally {\n\t\t\t\tif (_didIteratorError) {\n\t\t\t\t\tthrow _iteratorError;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t} else {\n\t\tdata = [];\n\t}\n}\n\nfunction headDraw() {\n\tvar input = document.createElement('input');\n\tinput.setAttribute('type', 'text');\n\tvar button = document.createElement('input');\n\tbutton.setAttribute('type', 'button');\n\tbutton.setAttribute('value', 'add');\n\tvar header = document.querySelector('#header');\n\theader.appendChild(input);\n\theader.appendChild(button);\n\n\tbutton.addEventListener('click', function (e) {\n\t\tvar name = input.value;\n\t\tvar idx = data.length;\n\t\t//put html\n\t\tcreateBoard(idx, name);\n\t\t//put Data\n\t\tvar newItem = new Card(idx, name);\n\t\tconsole.log('put', newItem);\n\t\tdata.push(newItem);\n\t\tsetData();\n\t});\n}\n\n// 데이터 변화 시 listIndex 재설정 \nfunction setListIndex() {\n\tfor (var i in data) {\n\t\tdata[i].listIndex = i;\n\t\tif (data[i]['item']) {\n\t\t\tfor (var j in data[i]['item']) {\n\t\t\t\tdata[i].item[j].listIndex = i;\n\t\t\t}\n\t\t} else {\n\t\t\tdata[i].item = [];\n\t\t}\n\t}\n}\n\n// 엘리먼트 순서 체크\nfunction getElementIndex(element) {\n\tvar parent = element.parentNode,\n\t    thiswrap = element,\n\t    children = parent.children,\n\t    idx = children.length - 1;\n\tfor (idx; idx >= 0; idx--) {\n\t\tif (thiswrap == children[idx]) {\n\t\t\tbreak;\n\t\t}\n\t}\n\treturn idx;\n}\n\n// 삭제 공통\nfunction deleteItem(idx, data, dom) {\n\tdata.splice(idx, 1);\n\tconsole.log('del', idx);\n\tsetData();\n\tdom.remove();\n}\n\nfunction createBoard(idx, name) {\n\tvar item = document.createElement('div');\n\titem.classList.add('board');\n\titem.setAttribute('id', 'board' + boardIdx);\n\tboardIdx += 1;\n\tvar title = document.createElement('h3');\n\ttitle.textContent = name;\n\n\t// 수정 모드\n\tvar newTextbox = document.createElement('input');\n\tnewTextbox.setAttribute('type', 'text');\n\tnewTextbox.setAttribute('value', name);\n\n\tvar buttonWrap = document.createElement('div');\n\tbuttonWrap.classList.add('board_btn');\n\tvar editbutton = document.createElement('button');\n\teditbutton.textContent = 'edit';\n\tvar delbutton = document.createElement('button');\n\tdelbutton.textContent = 'del';\n\n\t// 보드 수정\n\teditbutton.addEventListener('click', function (e) {\n\t\ttitle.classList.toggle('edit');\n\t\tvar editVal = newTextbox.value;\n\t\tvar thisIdx = getElementIndex(e.target.parentNode.parentNode);\n\t\tif (!title.classList.contains('edit')) {\n\t\t\ttitle.textContent = editVal;\n\t\t\t//putData\n\t\t\tdata[thisIdx].name = editVal;\n\t\t\tsetData();\n\t\t} else {\n\t\t\t// 수정모드\n\t\t\ttitle.textContent = '';\n\t\t\ttitle.appendChild(newTextbox);\n\t\t}\n\t});\n\n\t// 보드 삭제\n\tdelbutton.addEventListener('click', function (e) {\n\t\tvar thisIdx = getElementIndex(e.target.parentNode.parentNode);\n\t\tdeleteItem(thisIdx, data, item);\n\t});\n\n\tvar cardWrap = document.createElement('div');\n\tcardWrap.classList.add('list');\n\t// cardWrap.setAttribute('ondrop', 'drop(event)');\n\t// cardWrap.setAttribute('ondragover', 'allowDrop(event)');\n\n\tvar cardInput = document.createElement('div');\n\tcardInput.classList.add('card_input');\n\tvar input = document.createElement('input');\n\tinput.setAttribute('type', 'text');\n\tvar button = document.createElement('input');\n\tbutton.setAttribute('type', 'button');\n\tbutton.setAttribute('value', 'add');\n\tbutton.classList.add('cardAdd');\n\n\titem.appendChild(title);\n\titem.appendChild(buttonWrap);\n\tbuttonWrap.appendChild(editbutton);\n\tbuttonWrap.appendChild(delbutton);\n\n\titem.appendChild(cardInput);\n\tcardInput.appendChild(input);\n\tcardInput.appendChild(button);\n\titem.appendChild(cardWrap);\n\tdocument.querySelector('#contents').appendChild(item);\n\n\tcardWrap.addEventListener('drop', function (e) {\n\t\te.preventDefault();\n\t\tvar text = e.dataTransfer.getData(\"text\");\n\t\tvar dom = document.getElementById(text);\n\t\tif (e.target.className === 'list') {\n\t\t\tvar val = dom.querySelector('span').textContent;\n\n\t\t\tvar thisIdx = getElementIndex(e.target.parentNode);\n\n\t\t\tif (originBdIdx === thisIdx) {\n\t\t\t\t// ?\n\t\t\t} else {\n\t\t\t\tvar newItem = new Card(thisIdx, val);\n\t\t\t\tconsole.log(thisIdx, newItem);\n\t\t\t\tdata[thisIdx].item.push(newItem);\n\t\t\t\tsetData();\n\t\t\t\tdeleteItem(originCdIdx, data[originBdIdx].item, originDom);\n\t\t\t}\n\t\t\te.target.appendChild(dom);\n\t\t}\n\t});\n\n\tcardWrap.addEventListener(\"dragover\", function (e) {\n\t\te.preventDefault();\n\t\tconsole.log('allowDrop');\n\t});\n\n\t// 카드 추가\n\tbutton.addEventListener('click', function (e) {\n\t\tvar cardVal = input.value;\n\t\tvar thisIdx = getElementIndex(e.target.parentNode.parentNode);\n\t\tvar boardIdx = e.target.closest('.board').id.substr(5); // 얘는 데이터 index가 아닌 id값으로 ......\n\t\t//putData\n\t\tvar newItem = new Card(thisIdx, cardVal);\n\t\tconsole.log('put', newItem);\n\t\tif (data[thisIdx].item === undefined) {\n\t\t\tdata[thisIdx].item = [];\n\t\t}\n\t\tdata[thisIdx].item.push(newItem);\n\t\tsetData();\n\n\t\t//put html\n\t\tcardWrap.appendChild(createCard(boardIdx, cardVal));\n\t});\n\treturn item;\n}\n\n// 내부 카드 생성\nfunction createCard(boardIdx, val) {\n\tvar card = document.createElement('p');\n\tcard.classList.add('drag');\n\tcard.setAttribute('id', 'card' + cardIdx);\n\tcardIdx += 1;\n\tcard.setAttribute('draggable', 'true');\n\t//card.setAttribute('ondragstart', 'drag(event)');  \n\tcard.addEventListener(\"dragstart\", function (e) {\n\t\te.dataTransfer.setData(\"text\", e.target.id);\n\t\toriginBdIdx = getElementIndex(e.target.parentNode.parentNode);\n\t\toriginCdIdx = getElementIndex(e.target);\n\t\toriginDom = e.target;\n\t});\n\n\tvar span = document.createElement('span');\n\tspan.textContent = val;\n\n\tvar buttonWrap = document.createElement('div');\n\tbuttonWrap.classList.add('card_btn');\n\tvar editbutton = document.createElement('button');\n\teditbutton.textContent = 'edit';\n\n\tvar newTextbox = document.createElement('input');\n\tnewTextbox.setAttribute('type', 'text');\n\tnewTextbox.setAttribute('value', val);\n\n\tdocument.querySelector('#board' + boardIdx + ' .list').appendChild(card);\n\n\t// 카드 수정\n\teditbutton.addEventListener('click', function (e) {\n\t\tcard.classList.toggle('edit');\n\t\tvar editVal = newTextbox.value;\n\t\tvar thisIdx = getElementIndex(e.target.parentNode.parentNode);\n\t\tvar boardIdx = getElementIndex(e.target.parentNode.parentNode.parentNode.parentNode);\n\n\t\tif (!card.classList.contains('edit')) {\n\t\t\tspan.textContent = editVal;\n\t\t\t//putData\n\t\t\tvar newItem = new Card(boardIdx, editVal);\n\t\t\tconsole.log('put', newItem);\n\t\t\tdata[boardIdx].item.splice(thisIdx, 1, newItem);\n\t\t\tsetData();\n\t\t} else {\n\t\t\t// 수정모드\n\t\t\tspan.textContent = '';\n\t\t\tspan.appendChild(newTextbox);\n\t\t}\n\t});\n\n\t// 카드 삭제\n\tvar delbutton = document.createElement('button');\n\tdelbutton.textContent = 'del';\n\tdelbutton.addEventListener('click', function (e) {\n\t\tvar thisIdx = getElementIndex(e.target.parentNode.parentNode);\n\t\tdeleteItem(thisIdx, data[boardIdx].item, card);\n\t});\n\n\tcard.appendChild(span);\n\tcard.appendChild(buttonWrap);\n\tbuttonWrap.appendChild(editbutton);\n\tbuttonWrap.appendChild(delbutton);\n\treturn card;\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });