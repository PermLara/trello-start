class Column {
	constructor(id = null, columnTitle = '') {
		this.notes = []	
		const instance = this
		const element = this.element = document.createElement('div')
		element.classList.add('column')
		element.setAttribute('draggable', 'true')
		if (id) {
			element.setAttribute('data-column-id', id)
			
		} else {
			element.setAttribute('data-column-id', Column.idCounter)
			Column.idCounter++
			
		}
		
		element.innerHTML = 
`<p class="column-header" draggable="true">В плане</p>
<div data-notes></div>
<p class="column-footer">
	<span data-action-addNote class="action">+ Добавить карточку</span>
</p>`	
		//document.querySelector('.columns').append(element)
		if (columnTitle) {
			const columnHeader = element.querySelector('.column-header')
			columnHeader.textContent = columnTitle
		}
		const spanAction_addNote = element.querySelector('[data-action-addNote]')
		spanAction_addNote.addEventListener('click', function(event){
			const note = new Note
			instance.add(note)
			element.querySelector('[data-notes]').append(note.element)
			note.element.setAttribute('contenteditable', 'true')
			note.element.focus()
		})
		const headerElement = element.querySelector('.column-header')
		
		headerElement.addEventListener('dblclick',function(event){
			headerElement.setAttribute('contenteditable','true')
			headerElement.focus()
		})
		headerElement.addEventListener('blur',function(event){
			headerElement.removeAttribute('contenteditable')
			Application.save()
		})
		element.addEventListener('dragover', function(event) {
			event.preventDefault()
		})
		element.addEventListener('drop', function(event) {
			if (Note.dragged) {
				return element.querySelector('[data-notes]').append(Note.dragged)
			}
		})
		element.addEventListener('dragstart', this.dragstart.bind(this))
		element.addEventListener('dragend', this.dragend.bind(this))
		//element.addEventListener('dragenter', this.dragenter.bind(this))
		element.addEventListener('dragover', this.dragover.bind(this))
		//element.addEventListener('dragleave', this.dragleave.bind(this))
		element.addEventListener('drop', this.drop.bind(this))
	}
	
	add(...notes) {
		for (const note of notes) {
			if (!this.notes.includes(note)) {
				this.notes.push(note)
				
				this.element.querySelector('[data-notes]').append(note.element)
			}
		}
	}
	
	dragstart(event) {
		event.stopPropagation()
		Column.dragged = this.element
		this.element.classList.add('dragged')
		document
			.querySelectorAll('.note')
			.forEach(x => x.removeAttribute('draggable'))
	}
	dragend(event) {
		Column.dragged = null
		Column.dropped = null
		this.element.classList.remove('dragged')
		document
			.querySelectorAll('.column')
			.forEach(x => x.classList.remove('under'))
			
		document
			.querySelectorAll('.note')
			.forEach(x => x.setAttribute('draggable','true'))
			
		document
			.querySelectorAll('.column')
			.forEach(columnElement => columnElement.classList.remove('under'))
		Application.save()
	}
	dragenter(event) {
		if (!Column.dragged || this.element === Column.dragged) {
			return
		}
		this.element.classList.add('under')
		//event.stopPropagation()
		//console.log('dragenter',event,this.element)  //тут не доделано
	}
	
	dragover(event) {
		event.preventDefault()
		event.stopPropagation()
		if (!Column.dragged) {
			return
		}
	
		if (this.element === Column.dragged) {
			if (Column.dropped) {
				Column.dropped.classList.remove('under')
			}
			Column.dropped = null
			return
		}
		
		Column.dropped = this.element
		document
			.querySelectorAll('.column')
			.forEach(x => x.classList.remove('under'))
		this.element.classList.add('under')
		//console.log('dragover',event,this.element) //тут не доделано
	}
	
	dragleave(event) {
		if (!Column.dragged || this.element === Column.dragged) {
			return
		}
		//event.stopPropagation()
		this.element.classList.remove('under')
		//console.log('dragleave',event,this.element) //тут не доделано
	}
	drop(event) {
		if (!Column.dropped || !Column.dragged || this.element === Column.dragged) {
			return
		}
		const children = Array.from(document.querySelector('.columns').children)
		const indexA = children.indexOf(this.element)
		const indexB = children.indexOf(Column.dragged)
		if (indexA < indexB) {
			document.querySelector('.columns').insertBefore(Column.dragged, this.element)
		} else {
			document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling)
		}
		document
			.querySelectorAll('.column')
			.forEach(x => x.classList.remove('under'))
	}
}
Column.idCounter = null
Column.dragged = null
Column.dropped = null

