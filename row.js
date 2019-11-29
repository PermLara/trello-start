const Row = {
	process(rowElement) {
		rowElement.addEventListener('dragover', function(event) {
			event.preventDefault()
		})
		//rowElement.addEventListener('drop', function(event) {
			//if (Column.dragged) {
				//return rowElement.querySelector('.columns').append(Column.dragged)
			//}
		//})
	}
}