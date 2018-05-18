const url = "https://kanban-cf053.firebaseio.com/list.json"
let data, Item;
let cardIdx = 0,
	boardIdx = 0,
	originBdIdx,
	originCdIdx,
	originDom;

function Card(idx, val) {
	this.listIndex = idx;
	this.name = val;
}
function getData(url) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url); 
	xhr.send(); 
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let res = xhr.responseText;
				data = JSON.parse(res);
				draw()
				return res
			} else {
		      console.log("Error!");
		    }
		}
	};
}
function putData(name) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', url) // 접속하려는 대상을 지정 
	xhr.setRequestHeader('Content-Type', 'application/json'); // 클라이언트가 서버로 전송할 데이터의 MIME-type 지정
	xhr.send(name)
	xhr.onreadystatechange = function() { 
		if (xhr.readyState == 4) {
			// 이상 없음, 응답 받았음
		}
	};
}
function setData() {
	let json = JSON.stringify(data);
	putData(json)
	setListIndex()
}

getData(url)

function draw() {
	headDraw()

	if (data) {
		for (let board of data) {
			createBoard(board.listIndex, board.name)
			if (board.item) {
				for (let card of board.item) {
					createCard(card.listIndex, card.name)
				}
			} else {
				board.item = []
			}
		}
	} else {
		data =[];
	}
}

function headDraw() {
	let input = document.createElement('input');
	input.setAttribute('type', 'text');
	let button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'add');
	let header = document.querySelector('#header');
	header.appendChild(input)
	header.appendChild(button)

	button.addEventListener('click', function(e) {
		let name = input.value;
		let idx = data.length;
		//put html
		createBoard(idx, name);
		//put Data
		let newItem = new Card(idx, name);
		console.log('put', newItem)
		data.push( newItem );
		setData()
	})
}

// 데이터 변화 시 listIndex 재설정 
function setListIndex() {
	for(let i in data) {
		data[i].listIndex = i;
		if (data[i]['item']) {
			for(let j in data[i]['item']) {
				data[i].item[j].listIndex = i;
			}
		} else {
			data[i].item = []
		}
	}
}

// 엘리먼트 순서 체크
function getElementIndex(element) {
    let parent = element.parentNode,
    	thiswrap = element,
        children = parent.children,
		idx = children.length - 1;
    for (idx; idx >= 0; idx--) {
        if ( thiswrap == children[idx] ) {
            break;
        }
    }
	return idx;
}

// 삭제 공통
function deleteItem(idx, data, dom) {
	data.splice(idx,1);
	console.log('del', idx)
	setData()
	dom.remove();
}

function createBoard(idx, name) {
	let item = document.createElement('div');
	item.classList.add('board');
	item.setAttribute('id', 'board'+boardIdx);
	boardIdx += 1;
	let title = document.createElement('h3');
	title.textContent = name;

	// 수정 모드
	let newTextbox = document.createElement('input');
	newTextbox.setAttribute('type', 'text');
	newTextbox.setAttribute('value', name);

	let buttonWrap = document.createElement('div');
	buttonWrap.classList.add('board_btn');
	let editbutton = document.createElement('button');
	editbutton.textContent = 'edit';
	let delbutton = document.createElement('button');
	delbutton.textContent = 'del';

	// 보드 수정
	editbutton.addEventListener('click', function(e) {
		title.classList.toggle('edit');
		let editVal = newTextbox.value;
		let thisIdx = getElementIndex(e.target.parentNode.parentNode);
		if (!(title.classList.contains( 'edit' ))) { 
			title.textContent = editVal;
			//putData
			data[thisIdx].name = editVal;
			setData()
		} else { // 수정모드
			title.textContent = ''
			title.appendChild(newTextbox);
		}
	})
		
	// 보드 삭제
	delbutton.addEventListener('click', function(e) {
		let thisIdx = getElementIndex(e.target.parentNode.parentNode)
		deleteItem(thisIdx, data, item)
	})

	let cardWrap = document.createElement('div');
	cardWrap.classList.add('list');
	// cardWrap.setAttribute('ondrop', 'drop(event)');
	// cardWrap.setAttribute('ondragover', 'allowDrop(event)');

	let cardInput = document.createElement('div');
	cardInput.classList.add('card_input');
	let input = document.createElement('input');
	input.setAttribute('type', 'text');
	let button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'add');
	button.classList.add('cardAdd');
	
	item.appendChild(title);
	item.appendChild(buttonWrap);
	buttonWrap.appendChild(editbutton)
	buttonWrap.appendChild(delbutton)

	item.appendChild(cardInput);
	cardInput.appendChild(input);
	cardInput.appendChild(button); 
	item.appendChild(cardWrap); 
	document.querySelector('#contents').appendChild(item);


	cardWrap.addEventListener('drop', function(e) {
		 e.preventDefault();
	    let text = e.dataTransfer.getData("text");
	    let dom = document.getElementById(text);
	    if(e.target.className === 'list') {
			let val = dom.querySelector('span').textContent;

			let thisIdx = getElementIndex(e.target.parentNode)

			if (originBdIdx === thisIdx) {
				// ?
			} else {
				let newItem = new Card(thisIdx, val);
				console.log(thisIdx, newItem)
				data[thisIdx].item.push( newItem );
				setData()
				deleteItem(originCdIdx, data[originBdIdx].item, originDom)
			}
			e.target.appendChild(dom);
	    } 
	});

	cardWrap.addEventListener("dragover", function(e) {
	    e.preventDefault();
	    console.log('allowDrop')
	});

	// 카드 추가
	button.addEventListener('click', function(e) {
		let cardVal = input.value;
		let thisIdx = getElementIndex(e.target.parentNode.parentNode);
		let boardIdx = e.target.closest('.board').id.substr(5); // 얘는 데이터 index가 아닌 id값으로 ......
		//putData
		let newItem = new Card(thisIdx, cardVal);
		console.log('put', newItem)
		if(data[thisIdx].item === undefined) {
			data[thisIdx].item = []
		}
		data[thisIdx].item.push( newItem );
		setData()

		//put html
		cardWrap.appendChild(createCard(boardIdx, cardVal));
	})
	return item;
}

// 내부 카드 생성
function createCard(boardIdx, val) {
	let card = document.createElement('p');
	card.classList.add('drag');
	card.setAttribute('id', 'card'+ cardIdx);
	cardIdx += 1;
	card.setAttribute('draggable', 'true');
	//card.setAttribute('ondragstart', 'drag(event)');  
	card.addEventListener("dragstart", function(e) {
		e.dataTransfer.setData("text", e.target.id);
	    originBdIdx = getElementIndex(e.target.parentNode.parentNode)
	    originCdIdx = getElementIndex(e.target)
	    originDom = e.target
	});

	let span = document.createElement('span');
	span.textContent = val;

	let buttonWrap = document.createElement('div');
	buttonWrap.classList.add('card_btn');
	let editbutton = document.createElement('button');
	editbutton.textContent = 'edit';

	let newTextbox = document.createElement('input');
	newTextbox.setAttribute('type', 'text');
	newTextbox.setAttribute('value', val);

	document.querySelector('#board'+ boardIdx + ' .list').appendChild(card);

	// 카드 수정
	editbutton.addEventListener('click', function(e) {
		card.classList.toggle('edit');
		let editVal = newTextbox.value;
		let thisIdx = getElementIndex(e.target.parentNode.parentNode);
		let boardIdx = getElementIndex(e.target.parentNode.parentNode.parentNode.parentNode);

		if (!(card.classList.contains( 'edit' ))) { 
			span.textContent = editVal;
			//putData
			let newItem = new Card(boardIdx, editVal);
			console.log('put', newItem)
			data[boardIdx].item.splice(thisIdx,1,newItem );
			setData()
		} else { // 수정모드
			span.textContent = ''
			span.appendChild(newTextbox);
		}
	})
	
	// 카드 삭제
	let delbutton = document.createElement('button');
	delbutton.textContent = 'del';
	delbutton.addEventListener('click', function(e) {
		let thisIdx = getElementIndex(e.target.parentNode.parentNode)
		deleteItem(thisIdx, data[boardIdx].item, card)
	})

	card.appendChild(span)
	card.appendChild(buttonWrap)
	buttonWrap.appendChild(editbutton)
	buttonWrap.appendChild(delbutton)
	return card;
}