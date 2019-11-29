let toGabbage = null

const gabbageAll = document.querySelectorAll('.gabbage')
	
gabbageAll.forEach( gabbageElement => {
	gabbageElement.addEventListener('blur',function(event){
		Application.save()
	})
	gabbageElement.addEventListener('dragover', function(event) {
		toGabbage = 1
		event.preventDefault()
		event.stopPropagation()
	})
	gabbageElement.addEventListener('drop', function(event) {
		if (Column.dragged && toGabbage) {
			Column.dragged.remove()
			Column.dragged = null
			toGabbage = null
		}
	})
})	
	