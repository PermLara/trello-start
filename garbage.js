let toGarbage = null

const garbageAll = document.querySelectorAll('.garbage')
	
garbageAll.forEach( garbageElement => {
	garbageElement.addEventListener('blur',function(event){
		Application.save()
	})
	garbageElement.addEventListener('dragover', function(event) {
		toGarbage = 1
		event.preventDefault()
		event.stopPropagation()
	})
	garbageElement.addEventListener('drop', function(event) {
		if (Column.dragged && toGarbage) {
			Column.dragged.remove()
			Column.dragged = null
			toGarbage = null
		}
	})
})	
	