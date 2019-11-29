class Note {
	constructor(id = null, content = '') {
		const instance = this
		const element = this.element = document.createElement('div')
		element.classList.add('note')
		element.setAttribute('draggable', 'true')
		element.textContent = content
		if (id) {
			element.setAttribute('data-note-id', id)
		} else {
			element.setAttribute('data-note-id', Note.idCounter)
			Note.idCounter++
		}
		
		element.addEventListener('dblclick', function(event){
			element.setAttribute('contenteditable','true')
			element.removeAttribute('draggable')
			//element.parentElement.removeAttribute('draggable')
			instance.column.removeAttribute('draggable')
			//Note.setCaret(element)
			element.focus()
		})
		element.addEventListener('blur', function(event){
			element.removeAttribute('contenteditable')
			element.setAttribute('draggable','true')
			instance.column.setAttribute('draggable','true')
			element.textContent = element.textContent.trim()
			if (!element.textContent.length) {
				element.remove()
			}
			Application.save()
		})
		element.addEventListener('dragstart', this.dragstart.bind(this))	//привязали контекст
		element.addEventListener('dragend', this.dragend.bind(this))
		//element.addEventListener('dragenter', this.dragenter.bind(this))
		element.addEventListener('dragover', this.dragover.bind(this))
		//element.addEventListener('dragleave', this.dragleave.bind(this))
		element.addEventListener('drop', this.drop.bind(this))
	}
	
	get column() {
		return this.element.closest('.column')
	}	
	dragstart(event) {
		event.stopPropagation()
		Note.dragged = this.element		//тут this.element ссылается на экземпляр класса Note из-за сделанной привязки bind
		this.element.classList.add('dragged')
	}
	dragend(event) {
		Note.dragged = null
		this.element.classList.remove('dragged')
		document
			.querySelectorAll('.note')
			.forEach(x => x.classList.remove('under'))
			
		Application.save()	
	}
	dragenter(event) {
		if (!Note.dragged || this.element === Note.dragged) {
			return
		}
		this.element.classList.add('under')
		//console.log('dragenter',event,this.element)
	}
	dragover(event) {
		event.preventDefault()
		if (!Note.dragged || this.element === Note.dragged) {
			return
		}
	}
	dragleave(event) {
		if (!Note.dragged || this.element === Note.dragged) {
			return
		}
		this.element.classList.remove('under')
	}
	drop(event) {
		if (!Note.dragged || this.element === Note.dragged) {
			return
		}
		if (!this.element.parentElement) {
			return
		}
		event.stopPropagation()
		if (this.element.parentElement && this.element.parentElement === Note.dragged.parentElement) {
			const notes = Array.from(this.element.parentElement.querySelectorAll('.note'))
			const indexA = notes.indexOf(this.element)
			const indexB = notes.indexOf(Note.dragged)
			if (indexA < indexB) {
				this.element.parentElement.insertBefore(Note.dragged, this.element)
			} else {
				this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling)
			}
		} else {
			this.element.parentElement.insertBefore(Note.dragged,this.element)
		}
	}	
}
Note.idCounter = null
Note.dragged = null

